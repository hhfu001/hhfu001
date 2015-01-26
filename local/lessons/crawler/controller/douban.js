var Debug = require('debug')('douban');

var Superagent = require('superagent');

var Cheerio = require('cheerio');

var Async = require('async');

var ImageInfo = require('imageinfo');

var _ = require('lodash');

// var topic

// 抓取的第一页地址
var fetch_first_page_url = 'http://www.douban.com/group/haixiuzu/discussion?start=0';
// 抓取的列表页最大数
var fetch_max_page = 2;

// 抓取时所使用的header
var header = {
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'Accept-Encoding': 'gzip, deflate, sdch',
	'cookie': 'viewed="5362856"; ct=y; ll="118172"; dbcl2="106283334:9dn78i9kCic"; ck="hQX6"; bid="qWK40sVDQR0"; __utma=30149280.639687436.1413723293.1416490957.1416496152.48; __utmc=30149280; __utmz=30149280.1416388002.43.10.utmcsr=localhost:3000|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmv=30149280.10628; push_noty_num=0; push_doumail_num=1; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1416501062%2C%22http%3A%2F%2Flocalhost%3A3000%2F%22%5D; _pk_id.100001.8cb4=b0abd870edd5af87.1413723289.45.1416501062.1416498619.; _pk_ses.100001.8cb4=*',
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.6 Safari/537.36',
	'Connection': 'keep-alive',
	'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh-TW;q=0.4'
};

function fetchPageSourceByUrl(url, callback) {
	Superagent.get(url).set(header).end(function(err, sres) {
		console.log('pageSource: '+ sres);
		if (err) {
			callback();
		} else {
			callback(null, sres.text);
		}
	});
}


exports.crawlerShyData = function(crawlerCallback) {

	Async.auto({

		getTopicUrlList: function(callback) {
			var pageMax = fetch_max_page;
			var pageCur = 0;

			function getUrlByTopicListPageUrl(pageUrl, cb) {

				pageCur++;
				
				console.log('current list page url is' + pageUrl);

				fetchPageSourceByUrl(pageUrl, function(err, data) {
					if (err) return cb(err);


					var list = [];
					var $ = Cheerio.load(data);

					$('.olt tr .title').each(function(i, elm) {
						list.push($(elm).children('a').attr('href'));
					});

					var nextPage = $('.next a').attr('href');

					if (pageCur < pageMax && nextPage) {

						setTimeout(function() {
							getUrlByTopicListPageUrl(nextPage, function(err, data) {
								if (err) return cb(err);

								cb(null, list.concat(data));
							});

						}, 1000)

					} else {
						cb(null, list)
					}

				});


			}

			getUrlByTopicListPageUrl(fetch_first_page_url, function(err, data) {
				if (err) return callback(err);

				callback(null, data)
			});


		},

		getTopicContent: ['getTopicUrlList',
			function(callback, results) {
				var urlList = results.getTopicUrlList;

				function getImageWithTopicPage(url, cb) {
					console.log('current topic page url is ' + url);

					fetchPageSourceByUrl(url, function(err, data) {

						if (err) return cb(err);

						var topicData = {};
						var imgs = []; //当前页的img
						var $ = Cheerio.load(data);
						var imgList = $('.topic-figure img').attr('src');

						console.log(urlList, imgList);


						// Async.each(imgList, function(elm, cb1) {
						// 	var imgUrl = $(elm).attr('src');

						// 	Superagent.get(imgUrl).set(header).end(function(err, sres) {
						// 		if (err) return cb1(err);

						// 		var body = sres.body;
						// 		var imgInfo = {};

						// 		imgInfo.height = ImageInfo(body).height;
						// 		imgInfo.width = ImageInfo(body).width;
						// 		imgInfo.url = imgUrl;

						// 		imgs.push(imgInfo);

						// 		cb1();

						// 		console.log(imgs);

						// 	});
						// });

					});

				}

				Async.mapLimit(urlList, 1, function(url, cb) { // 通过mapLimit控制最大并发
					getImageWithTopicPage(url, cb);
				}, function(err, result) {
					if (err) {
						callback(err);
					} else {
						callback(null, result);
					}
				}); // end async.mapLimit


			}
		],



	}, function(err, results) {
		if (err) {
			crawlerCallback(err);
		} else {
			console.log('topic total is' + results.getTopicContent.length);
		}
	});

};