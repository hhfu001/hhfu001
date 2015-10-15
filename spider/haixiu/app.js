var express = require('express');
var mongoose = require('mongoose');
var crawler = require('./crawler');
var model = require('./models/haixiu');
var config = require('./config');


var app = express();

mongoose.connect(config.mongodb_url);

app.set('views', './views/pages');
app.set('view engine', 'jade');

var cities = config.cities;

function getDocsAuthorId(docs) {
    docs = docs || [];
    var reg = /http:\/\/www.douban.com\/group\/people\/(\w+)(\/)?/;
    for (var i = 0; i < docs.length; i++) {
        docs[i].authorId = reg.exec(docs[i].author_url)[1];
    }
    return docs;
}





app.get('/', function(req, res) {
    res.render('index', {
        cities: cities
    });
});

// 针对各个地域的 route 配置
app.get('/all', function(req, res) {

    model.findAll(function(err, docs) {
        if (err) console.log(err);
        console.log(docs);

        docs = getDocsAuthorId(docs);

        res.render('posts', {
            docs: docs
        })
    })

});

// app.get('/city/:city', function(req, res) {

//     model.findByLocation(function(err, docs) {
//         if (err) return next(err);

//         docs = getDocsAuthorId(docs);

//         res.render('city', {
//             docs: docs
//         })
//     })

// });




var server = app.listen(config.port, function() {
    console.log('app is listening ' + server.address().port);
});