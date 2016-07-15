// var express = require('express');

var superagent = require('superagent');

var cheerio = require('cheerio');

var async = require('async');

var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

// var app = express();

// app.get('/', function(req, res) {

superagent.get(cnodeUrl)
    .end(function (err, sres) {
        if (err) {
            return next(err);
        }

        var topicUrls = [];
        var $ = cheerio.load(sres.text);


        $('#topic_list .topic_title').each(function (i, item) {
            var $me = $(item);

            var href = url.resolve(cnodeUrl, $me.attr('href'));

            topicUrls.push(href);


        });

        var topics = [];

        var concurrencyCount = 0;
        //并发三条
        async.mapLimit(topicUrls, 3, function (url, callback) {

            var dt = +new Date()
            superagent.get(url).end(function (err, res) {

                concurrencyCount++; //????


                console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + (Date.now() - dt) + '毫秒');

                var $ = cheerio.load(res.text);

                topics.push({
                    title: $('.topic_full_title').text(),
                    href: url,
                    comment1: $('.reply_content').eq(0).text()
                });
                concurrencyCount--; //??
                callback(null, topics);



                // callback(null, topics);
                // console.log('mapLimit', url)

            });

        }, function (err, result) {
            console.log('final:-----------------------------------------------------');
            // console.log(result);
            // res.send(topics)
        });

    });
// });



// app.listen('3000', function() {
//     console.log('app is listening at port 3000');
// });