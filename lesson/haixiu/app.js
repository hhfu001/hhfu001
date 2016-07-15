const express = require('express');
const mongoose = require('mongoose');
const crawler = require('./crawler');
const model = require('./models/haixiu');
const config = require('./config');


const app = express();

mongoose.connect(config.mongodb_url);

app.set('views', './views/pages');
app.set('view engine', 'jade');

app.locals.moment = require('moment');

const cities = config.cities;

function getDocsAuthorId(docs) {
    docs = docs || [];
    const reg = /http:\/\/www.douban.com\/group\/people\/(\w+)(\/)?/;
    for (let i = 0; i < docs.length; i++) {
        docs[i].authorId = reg.exec(docs[i].author_url) ? reg.exec(docs[i].author_url)[1] : '';
        let imgs = docs[i].imgs;

        if (!imgs.length) {
            docs.splice(i, 1);
        }

        docs[i].imgs = imgs.map(function (item) {
            return item.replace(/https:/, 'http:')
        });
    }
    return docs;
}





app.get('/', function (req, res) {
    res.render('index', {
        cities: cities
    });
});

// 针对各个地域的 route 配置
app.get('/all', function (req, res) {

    model.findAll(function (err, docs) {
        if (err) console.log(err);
        // console.log(docs);

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




let server = app.listen(config.port, function () {
    console.log('app is listening ' + server.address().port);
});