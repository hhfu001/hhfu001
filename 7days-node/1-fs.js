const fs = require('fs')
var path = require('path')
// const pathname = process.argv.slice(2)[0];


// code snippet 1

var pathname = path.resolve(__dirname, 'child.js');
const rs = fs.readFileSync(pathname);

console.log(rs)

// rs.on('data', function (chunk) {

//     rs.pause();
//     dosomething(chunk);

// })

// rs.on('end', function () {
//     // cleanUp();

// })


function dosomething (chunk){
    console.log('==============')
    console.log(chunk)
    rs.resume();
}


////////////code snippet 2

/*
* @param dir 
* @function callback 
*/
/*
const path = require('path');

function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        const pathname = path.join(dir, file);

        if (/node_modules/.test(pathname)) {
            continue;
        }

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback)
        } else {
            callback && callback(pathname);
        }

    });

}

travel('/Users/hhfu/project/self/study/7days-node', function (pathname) {
    console.error('callback pathname========');
    console.log(pathname);
});*/


// function readText(pathname) {
//     var bin = fs.readFileSync(pathname);
// console.log('========',bin, bin[0], bin[1])
//     if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
//         bin = bin.slice(3);
//     }

//     return bin.toString('utf-8');
// }

// readText(pathname)

