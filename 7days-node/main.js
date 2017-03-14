const fs = require('fs');
const path = require('path');
const http = require('http');

const MINE = {
    '.css': 'type/css',
    '.js': 'type/javascript'
};
var querystring = require('querystring')
querystring.parse('foo=bar&baz=qux&baz=quux&corge')

// http://assets.example.com/foo/??bar.js,baz.js

function outputFiles(pathnames, writer) {
    (function next(i, len) {
        if (i < len) {
            var reader = fs.createReadStream(pathnames[i]);

            reader.pipe(writer, { end: false });
            reader.on('end', function () {
                next(i + 1, len);
            });
        } else {
            writer.end();
        }
    } (0, pathnames.length));
}

function validateFiles(pathnames, callback) {
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], function (err, stats) {
                if (err) {
                    callback(err);
                } else if (!stats.isFile()) {
                    callback(new Error());
                } else {
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, pathnames);
        }
    } (0, pathnames.length));
}

function main(agrv) {
    // console.log(agrv, '=======')
    const config = JSON.parse(fs.readFileSync(agrv[0], 'utf-8'));
    const root = config.root || '.';
    const port = config.port || '8080';

    http.createServer(function (req, res) {

        let urlInfo = parseUrl(root, req.url);

        validateFiles(urlInfo.pathnames, function (err, pathnames) {
            if (err) {
                res.writeHead(404);
                res.end(err.message);
            } else {
                res.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                outputFiles(pathnames, res);
            }
        });

    }).listen(port);

}

function parseUrl(root, url) {
    let base, pathnames, parts;

    if (url.indexOf('??') == -1) {
        url = url.replace('/', '/??');
    }

    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split(',').map(value => root + path.join( base, value));

    pathnames = ['http://js.tudouui.com/v3/dist/js/m_29.js', 'http://js.tudouui.com/v3/dist/js/m_20.js']

    return {
        mime: MINE[path.extname[pathnames[0]]] || 'text/plain',
        pathnames: pathnames
    }


}


main(process.argv.slice(2));