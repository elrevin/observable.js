# observable.js
A little script, it makes possible to subscribe to changes of properties of any object.

Example:
```html
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>

<script src="observable.js"></script>
<script>
    // create an object
    var o = {
        p: "",
        k: "",

        // how about custom setter?
        setK: function (v) {
            this.setVal("k", "Hello " + v);
        }
    };

    // make it observable
    o = Observable.getFrom(o);

    // now we can define any handlers for the set properties events
    o.onSet("p", function (p, v) {
        document.writeln('first handler: ' + p + ' = "' + v + '"<br>');
    });

    o.onSet("p", function (p, v) {
        document.writeln('second handler: ' + p + ' => "' + v + '"<br>');
    });

    o.onSet("k", function (p, v) {
        document.writeln(v + "<br>");
    });

    // and now, let's change property "p" of our object
    o.p = "Hi anybody!";

    // or many properties
    o.apply({
        p: "good bye my friends",
        k: "world!"
    })
</script>
</body>
</html>
```
