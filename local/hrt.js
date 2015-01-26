
var localRoot = __dirname;

exports.serverRoot = localRoot + '/.';

exports.map = [
	['http://js.tudouui.com/v3/dist/js', localRoot + '/dist/js'],
	['http://css.tudouui.com/v3/dist/js', localRoot + '/dist/js'],

	['http://js.tudouui.com/v3/dist/css', localRoot + '/dist/css'],
	['http://css.tudouui.com/v3/dist/css', localRoot + '/dist/css'],

	['http://js.tudouui.com/v3/dist/img', localRoot + '/src/img'],
	['http://css.tudouui.com/v3/dist/img', localRoot + '/src/img'],

	['http://js.tudouui.com/v3/dist/embed', localRoot + '/src/embed'],
	['http://css.tudouui.com/v3/dist/embed', localRoot + '/src/embed'],

	['http://ui.tudou.com/v3/dist', localRoot + '/dist'],


	['http://jstest.tudouui.com/v3/dist/js', localRoot + '/dist/js'],
	['http://csstest.tudouui.com/v3/dist/js', localRoot + '/dist/js'],

	['http://jstest.tudouui.com/v3/dist/css', localRoot + '/dist/css'],
	['http://csstest.tudouui.com/v3/dist/css', localRoot + '/dist/css'],

	['http://jstest.tudouui.com/v3/dist/img', localRoot + '/src/img'],
	['http://csstest.tudouui.com/v3/dist/img', localRoot + '/src/img'],

	['http://jstest.tudouui.com/v3/dist/embed', localRoot + '/src/embed'],
	['http://csstest.tudouui.com/v3/dist/embed', localRoot + '/src/embed'],

	['http://uitest.tudou.com/v3/dist', localRoot + '/dist'],

	['http://www.hhfu.com/', localRoot +'/']
];

exports.before = function(url) {
	

	return url;
};

exports.merge = function(path, callback) {
	var Tudou = this.util.loadPlugin('tudou');

	if (/\/v3\/(?:dist|build|src)\//i.test(this.req.url)) {
		Tudou.merge.call(this, path, callback);
		return;
	}

	Tudou.mergeTui2.call(this, path, callback);
};
