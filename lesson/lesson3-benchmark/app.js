var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;


var int1 = function (str) {
    return +str;
};

var int2 = function (str) {
    return parseInt(str, 10);
};

var int3 = function (str) {
    return Number(str);
};

var num = '1000';
// add tests
suite.add('#+', function () {
    int1(num);
}).add('#parseInt', function () {
    int2(num)
}).add('#Number', function () {
    int3(num)
})
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });
    