var fs = require('fs'),
    path = require('path'),
    http = require('http');
var Express = require('express');    

var App = Express();



var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

function combineFiles(pathnames, callback) {
    var output = [];

    (function next(i, len) {
        if (i < len) {
            // console.log('output', pathnames)
            fs.readFile(pathnames[i], function(err, data) {

                if (err) {
                    callback(err);
                } else {
                    output.push(data)
                    next(i + 1, len)
                }
                // console.log('err', err)

            })
        } else {
            callback(null, Buffer.concat(output));
        }

    })(0, pathnames.length)
}

function validateFiles(pathnames, callback) {
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], function(err, stats) {
                if (err) {
                    callback(err)
                } else if (!stats.isFile()) {

                    callback(new Error())

                } else {
                    next(i + 1, len)
                }
            })
        } else {
            callback(null, pathnames)
        }

    })(0, pathnames.length)

}

function outputFiles(pathnames, writer) {
    (function next(i, len) {
        if (i < len) {
            var reader = fs.createReadStream(pathnames[i]);

            reader.pipe(writer, { end: false})
            reader.on('end', function(){
                next(i + 1, len)
            })
            
        } else {
            writer.end()
        }

    })(0, pathnames.length)

}


function main(agrv) {
    var config = JSON.parse(fs.readFileSync(agrv[0], 'utf-8')),
        root = config.root || '',
        port = config.port || 80,
        server;

    console.log("server start:", config);
    
    App.get('/', function(request, response){
        var urlInfo = parseURL(root, request.url)

        validateFiles(urlInfo.pathnames, function(err, pathnames){
            if(err){
                // response.writeHead(404)
                response.end(err.message)
            }else{
                // response.writeHead(200, {
                //     'Content-Type': urlInfo.mime
                // });
                outputFiles(pathnames, response)
            }
        });

    }).listen(port)

    // server = http.createServer(function(request, response) {

    //     var urlInfo = parseURL(root, request.url)

    //     validateFiles(urlInfo.pathnames, function(err, pathnames){
    //         if(err){
    //             response.writeHead(404)
    //             response.end(err.message)
    //         }else{
    //             response.writeHead(200, {
    //                 'Content-Type': urlInfo.mime
    //             });
    //             outputFiles(pathnames, response)
    //         }
    //     });

    // }).listen(port)

    process.on('SIGTERM', function(){
        server.close(function(){
            process.exit(0)
        })
    })
}

function parseURL(root, url) {
    var base, pathnames, parts;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');

    }

    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split(',').map(function(value) {

        return path.join(root, base, value)

    });

    // console.log('root', pathnames);
    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
            // pathnames: ['http://hhfu.com/7days-node/foo/bar.js', 'http://hhfu.com/7days-node/foo/baz.js']

    }

}


main(process.argv.slice(2));