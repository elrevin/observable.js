Observable = {
	getFrom: function (obj) {
		var i;
		for (i in Observable) {
			obj[i] = Observable[i];
		}
		
		return obj.init();
	},
	
    _capitalizeFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
	
    _events: {},
    _setters: {},
    _properties: {},

    onSet: function (prop, handler) {
        if (!this._events[prop]) {
            this._events[prop] = [];
        }
        this._events[prop][this._events[prop].length] = handler;
    },

    setVal: function (p, v) {
        this._properties[p] = v;
        if (this._events[p] && Array.isArray(this._events[p])) {
            for (var i = 0; i < this._events[p].length; i++) {
                if (typeof this._events[p][i] == 'function') {
                    this._events[p][i](p, v);
                }
            }
        }
    },

    _doSet: function (p, v) {
        if (this._setters[p] && typeof this._setters[p] == 'function') {
            this._setters[p].call(this, v);
        } else {
            this.setVal(p, v);
        }
    },

    _addSetter: function (p, setter) {
        if (typeof this._setters[p] == 'undefined' || !this._setters[p]) {
            Object.defineProperty(this, p, {
                set: function (v) {
                    this._doSet(p, v);
                },
                get: function () {
                    return this._properties[p];
                }
            });
        }
        if (setter) {
            this._setters[p] = setter;
        }
    },

    init: function () {
        var p;
        for (var n in this) {
            if (n[0] != '_') {
                if (typeof this[n] != "function") {
                    this._properties[n] = this[n];
                    delete(this[n]);
                    p = 'set' + this._capitalizeFirstLetter(n);
                    if (this[p] && typeof this[p] == "function") {
                        this._addSetter(n, this[p]);
                    } else {
                        this._addSetter(n);
                    }
                }
            }
        }
        return this;
    },

    apply: function (source, silence) {
        for (var n in source) {
            if (n[0] != '_') {
                if (typeof source[n] != "function") {
                    if (typeof silence == 'undefined' || !silence) {
                        this[n] = source[n];
                    } else {
                        this._properties[n] = this[n];
                    }
                }
            }
        }
    }
};