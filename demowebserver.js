var http = require('http');
var count = 0;
var port = 80;


http.createServer(function (req, res) {
    var url = req.url;
    count++;
    var string = 'This is page ' +
        url +
        " and you are visitor #" + count;

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var httpbody = '<html><body><div>' + string + '<html><body><div>';
    res.end(httpbody);
}).listen(port);

console.log("IT LIVES");