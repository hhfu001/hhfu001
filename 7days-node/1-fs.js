const fs = require('fs')

const pathname = process.argv.slice(2)[0];

const rs = fs.createReadStream(pathname);

console.log(pathname)

rs.on('data', function (chunk) {

    rs.pause();
    dosomething(chunk);

})

rs.on('end', function () {
    // cleanUp();

})


function dosomething (chunk){
    console.log('==============')
    console.log(chunk)
    rs.resume();
}