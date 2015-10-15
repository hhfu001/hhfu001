var express = require('express');

var superagent = require('superagent');

var cheerio = require('cheerio');

var async = require('async');

var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

var app = express();

app.get('/', function(req, res) {

    superagent.get(cnodeUrl)
        .end(function(err, sres) {
            if (err) {
                return next(err);
            }

            var topicUrls = [];
            var $ = cheerio.load(sres.text);


            $('#topic_list .topic_title').each(function(i, item) {
                var $me = $(item);

                var href = url.resolve(cnodeUrl, $me.attr('href'));

                topicUrls.push(href);


            });

            var topics = [];

            async.mapLimit(topicUrls, 5, function(url, callback) {

                superagent.get(url).end(function(err, res) {

                    var $ = cheerio.load(res.text);

                    topics.push({
                        title: $('.topic_full_title').text(),
                        href: url,
                        comment1: $('.reply_content').eq(0).text()
                    });


                    callback(null, topics);

                });

            }, function(err, result) {
                console.log(result);
                res.send(topics)
            });

        });
});



app.listen('3000', function() {
    console.log('app is listening at port 3000');
});