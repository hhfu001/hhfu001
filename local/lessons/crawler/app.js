var Debug = require('debug')('app');

var Async = require('async');

var Douban = require('./controller/douban');

Async.auto({
	douban: function(callback) {
		Douban.crawlerShyData(function(err, data) {
			if (err) {
				callback(err);
			} else {
				callback(null, data);
			}
		})

	}
}, function(err, results) {
	if (err) {
		console.log(err);
	} else {
		console.log('success!!!!!');
	}

	console.log('Bye ^_^ ');
	process.exit(0);
});