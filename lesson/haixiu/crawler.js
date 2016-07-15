var superagent = require('superagent');
var async = require('async');
var _ = require('lodash');
var cheerio = require('cheerio');
var Model = require('./models/haixiu');
var eventproxy = require('eventproxy');
var config = require('./config');

var group = "http://www.douban.com/group/cellphonepics/";


superagent.get(group)
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36')
    .set('Cookie', config.douban_cookie)
    .end(function(err, sres) {
        if (err) console.log(err);

        var topicUrls = [];
        var $ = cheerio.load(sres.text);

        $('#group-topics .title a').each(function(i, item) {
            var $me = $(item);

            topicUrls.push($me.attr('href'));
        });


        var _data;

        async.mapLimit(topicUrls, 10, function(url, callback) {

            superagent.get(url).end(function(err, res) {

                var $ = cheerio.load(res.text);

                var imgs = [];

                $('.topic-figure img').each(function(i, img) {
                    imgs.push($(img).attr('src'))
                })

                var $author = $('.topic-doc .from a');
                var data = {
                    title: $('#content h1').text(),
                    url: url,
                    imgs: imgs,
                    author: $author.text(),
                    author_url: $author.attr('href'),
                    author_location: ''
                }
                
		        _data = new Model(data);

		        _data.save(function(err, dt) {
		            if (err) console.log(err);
		            // res.redirect('/movie/' + movie._id);
		        });

                callback(null, data);

            });

        }, function(err, result) {
            // console.log(result);

        });

    });