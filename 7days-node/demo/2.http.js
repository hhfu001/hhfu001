
/* var http = require('http');

http.createServer(function (request, response) {
    var body = [];

    console.log('method==', request.method);
    console.log('headers==', request.headers);
    response.writeHead(200, { 'Content-Type': 'text-plain' });

    request.on('data', function (chunk) {
        body.push(chunk);
        response.write(chunk);
    });

    request.on('end', function () {
        body = Buffer.concat(body);
        console.log('body==', body.toString());
        response.end('Hello World\n');
    });

    

}).listen(80); */

/* 
const zlib = require('zlib');
var http = require('http');

http.createServer(function (request, response) {
    var i = 1024,
        data = '';

    while (i--) {
        data += 'test v';
    }

    if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
        zlib.gzip(data, function (err, data) {
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip'
            });
            response.end(data);
        });
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end(data);
    }
}).listen(80);

 */

const net = require('net');

net.createServer(function (conn) {
    conn.on('data', function (data) {
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
        ].join('\n'));
    });
}).listen(80);

var options = {
    port: 80,
    host: '127.0.0.1'
};

var client = net.connect(options, function () {
    client.write([
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'Host: www.baidu.com',
        'Accept: */*',
        '',
        ''
    ].join('\n'));
});

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});

