var fs = require('fs');
var path = require('path')
var http = require('http')
var child_process = require('child_process');
var util = require('util');

function copy(src, dst, cb){
	console.log(src, dst)
	child_process.exec(util.format('cp -r %s/* %s', src, dst), cb);

}

copy('util/', 'test/', function (err) {
    // ...
    console.log(err);
});


// function copy(src, dst){
// 	// fs.createReadStream(src).pipe(fs.createWriteStream(dst));

// 	fs.wirteFileSync(dst, fs.readFileSync(src));
// }

// function main(argv){
// 	console.log(argv);
// 	copy(argv[0], argv[1]);

// }


// main(process.argv.slice(2));

// var counter1 = require('./util/counter')
// var counter2 = require('./util/counter')

// console.log(counter1.count());
// console.log(counter2.count());
// console.log(counter2.count());
// console.log(counter1.count());
// console.log(module);

// function travel(dir, callback) {
// 	// console.log(dir, __dirname);
//     fs.readdirSync(dir).forEach(function (file) {
//         var pathname = path.join(dir, file);

//         if (fs.statSync(pathname).isDirectory()) {
//             travel(pathname, callback);
//         } else {
//             callback(pathname);
//         }
//     });
// }

// travel('../', function(pathname){
// 	console.log(pathname);

// })



// http.get('http://nqdeng.github.io/7-days-nodejs/', function (response) {
// 	var body = [];

//     console.log(response.statusCode);
//     console.log(response.headers);

//     response.on('data', function (chunk) {
//         body.push(chunk);
//     });

//     response.on('end', function () {
//         body = Buffer.concat(body);
//         console.log(body.toString());
//     });


// });

