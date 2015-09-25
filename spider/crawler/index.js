var superagent = require('superagent');

var cheerio = require('cheerio');

var eventproxy = require('eventproxy');

var cnodeUrl = 'http://www.douban.com/group/haixiuzu/discussion?start=0';

var express = require('express');

var app = express();

app.get('/', function(req, res) {

	superagent.get(cnodeUrl)
		.end(function(err, sres) {
			if (err) {
				return next(err);
			}

			var topicUrls = [];
			var $ = cheerio.load(sres.text);


			$('.olt tr .title a').each(function(i, item) {
				var $me = $(item);

				var href = $me.attr('href');

				topicUrls.push(href);


			});

			// console.log(topicUrls);

			topicUrls.forEach(function(topicUrl) {

				setTimeout(function() {

					superagent.get(topicUrl)
						.end(function(err, res) {
							console.log('fetch ' + topicUrl + ' successful');
							ep.emit('topic_html', [topicUrl, res.text]);
						});
				}, 1000);

			});

			var ep = new eventproxy();

			ep.after('topic_html', topicUrls.length, function(topics) {

				topics = topics.map(function(topicPair) {
					var topicUrl = topicPair[0];
					var topicHtml = topicPair[1];

					var $ = cheerio.load(topicHtml);

					var imgs = [];

					$('.topic-figure img').each(function(){
						imgs.push($(this).attr('src'));
					});

					return {
						title: $('#content h1').html(),
						tipicUrl: topicUrl,
						pic: imgs
					};

				});


				console.log('final:');
				console.log(topics);

				res.send(topics)

			});



		});

});



app.listen('3000', function() {
	console.log('app is listening at port 3000');
});