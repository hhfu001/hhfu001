var express = require('express');

var superagent = require('superagent');

var cheerio = require('cheerio');

var eventproxy = require('eventproxy');

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

			// console.log(topicUrls);

			topicUrls.forEach(function(topicUrl) {
				superagent.get(topicUrl)
					.end(function(err, res) {
						console.log('fetch ' + topicUrl + ' successful');
						ep.emit('topic_html', [topicUrl, res.text]);
					});
			});

			var ep = new eventproxy();

			ep.after('topic_html', topicUrls.length, function(topics) {

				topics = topics.map(function(topicPair) {
					var topicUrl = topicPair[0];
					var topicHtml = topicPair[1];

					var $ = cheerio.load(topicHtml);

					return {
						title: $('.topic_full_title').text().trim(),
						href: topicUrl,
						comment1: $('.reply_content').eq(0).text().trim()
					};

				});


				console.log('final:');
				console.log(topics);

				res.send(topics);
			});


			
		});
});



app.listen('3000', function() {
	console.log('app is listening at port 3000');
});