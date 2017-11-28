const fs = require('fs');
const path = require('path');
const http = require('http');

const MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};


function main(argv) {
    const config = JSON.parse(fs.readFileSync(argv[0]), 'utf-8');
    const root = config.root || '.';
    const port = config.port || '80';


    http.createServer((request, response) => {
        console.log('server start at port: ' + port);

        const urlInfo = paresURL(root + ':' + port, request.url);

        validateFiles(urlInfo.pathnames, (err, pathnames) => {
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {

                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                outputFiles( pathnames, response );
            }
        })

    }).listen(port);
}

function outputFiles(pathnames = [], writer) {
    let output = [];

    (function next(i, len) {
        if (i < len) {

            const reader = fs.createReadStream(pathnames[i]);
            reader.pipe(writer, { end: false });
            reader.on('end', () => { 
                next(i+1, len)
            })

        } else {
            writer.end();
        }
    })(0, pathnames.length)
}

function validateFiles(pathnames, callback) { 
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], (err, stats) => {
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
    })(0, pathnames.length);

}


function paresURL(root, url) {
    let base, pathnames, parts;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??')
    }

    parts = url.split('??');
    base = parts[0];

    pathnames = parts[1].split(',').map(name => {
        return path.join('./', base, name);
    });

    return {
        mime: pathnames[0] ? MIME[path.extname(pathnames[0])] : 'text/plain',
        pathnames: pathnames
    }

}


main(process.argv.slice(2));