// this code is from: https://gist.github.com/phosphore/dc44d05ed2d606e6cec2ce2d87486a83
var portsCheck = function(callback, target, port, timeout) {

    var timeout = (timeout == null) ? 100 : timeout;
    var img = new Image();

    img.onerror = function() {
        if (!img) return;
        img = undefined;
        callback(target, port, 'open');
    };

    img.onload = img.onerror;
    img.src = 'http://' + target + ':' + port;

    setTimeout(function() {
        if (!img) return;
        img = undefined;
        callback(target, port, 'closed');
    }, timeout);
};

//var ports = [1, 5, 7, 18, 20, 21, 22, 23, 25, 29, 37, 42, 43, 49, 53, 69, 70, 79, 80, 103, 108, 109, 110, 115, 118, 119, 137, 139, 143, 150, 156, 161, 179, 190, 194, 197, 389, 396, 443, 444, 445, 458, 465, 546, 547, 563, 569, 587, 993, 1080, 1433, 1521, 1527, 2483, 2525, 8080, 8080, 8181, 4848];
var ports = [80,443];
for (var a = 0; a < ports.length; a++)
    portsCheck(function(target, port, status) {

        /* put the status into the element */
        element.text(status);
    }, "127.0.0.1", ports[a], 1000 /*ms*/);
