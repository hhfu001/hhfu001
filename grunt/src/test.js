/**
 * @overview 互动投票
 *
 * @author Chunjie
 * @version 2014-11-14
 */

define('page/play/interaction/goods', [
	'tui/art',
	'./base',
	'tui/util/url',
	'module/login/login'
], function(Art, Base, Url, Login){

	var E_ADDTOCART = 'addtoCart';
	var K = Base.extend({
		tpl: require.text('./goods.tpl'),
		initialize: function(config){
			var self = this;
			K.superClass.initialize.call(self, config);
			self.config = config;
			self._gid = null;
			self.tplFn = Art.compile(self.tpl);
			self.render(self.data);

		},
		events: {
			'click .btn_addtocart': '_addtoCart',
			'click .btn_purchase': '_clickPurchaseStat',
			'click .pic a': '_clickPicStat',
			'click .hongbao': '_clickHongbaoStat'
		},
		_addtoCart: function(e){
			e.preventDefault();
			var self = this;
			var gid = self.data && self.data.gid;
			self.stat.send({
				otype: 11,
				odata: self.stat.getOData(self.data)
			}, self.data);
			self.fire(E_ADDTOCART, [gid, self, $(e.currentTarget)]);
		},
		_clickPurchaseStat: function(e){
			var self = this;
			self.stat.send({
				otype: 5,
				odata: self.stat.getOData(self.data)
			}, self.data);
		},
		_clickPicStat: function(e){
			var self = this;
			self.stat.send({
				otype: 9,
				odata: self.stat.getOData(self.data)
			}, self.data);
		},
		_clickHongbaoStat: function(e){
			var self = this;
			self.stat.send({
				otype: 12,
				odata: self.stat.getOData(self.data)
			}, self.data);
		}
	});

	return K;
});
