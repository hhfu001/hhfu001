const fs = require('fs')
/* 
// code 1
function copy(src, dest) { 
    // fs.writeFileSync(dest, fs.readFileSync(src));

    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
}
function main(argv) {
    
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
// node 1-fs.js ./buck.mp4 ./dest/back.mp4
 */


// code 2
// var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);

/* 
// code 3
const rs = fs.createReadStream(src);
const ws = fs.createWriteStream(dest);


rs.on('data', (chunk) => { 
    if (ws.write(chunk) === false) {
        rs.pause();
    }
})
rs.on('end', () => { 
    ws.end();
})

ws.on('drain', () => { 
    rs.resume();
}) */


// code 4 同步遍历
const path = require('path');
function travel(dir, callback) {
    fs.readdir(dir, (err, files) => { 
        console.log(err, files);
    });
    return;
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}
travel('/Users/hhfu/project/study/7days-node', (pathname) => { 
    console.log('===> ', pathname);
})
