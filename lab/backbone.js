(function($) {

	var Item = Backbone.Model.extend({
		defaults: {
			data1: 'hello',
			data2: 'Backbone'
		}
	});

	var List = Backbone.Collection.extend({model: Item});

	var ItemView = Backbone.View.extend({
		tagName: 'li',
		events: {
			'click .swap': 'swap',
			'click .delete': 'remove'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'swap', 'remove');


			this.model.bind('change', this.render);
			this.model.bind('remove', this.unrender);
		},
		render: function(){
			$(this.el).html('<span style="color:black;">'+this.model.get('data1')+' '+this.model.get('data2')+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');

			return this;
		},
		unrender: function(){
			$(this.el).remove();
		},

		swap: function(){
			var swapped = {
				data1 : this.model.get('data2'),
				data2: this.model.get('data1')
			};
			this.model.set(swapped);
		},

		remove: function(){
			this.model.destroy();
		}
	});




	var ListView = Backbone.View.extend({
		el: $('body'), // attaches `this.el` to an existing element.
		events: {
			'click #add': 'addItem'
		},
		initialize: function() {
			_.bindAll(this, 'render', 'addItem', 'appendItem'); // fixes loss of context for 'this' within methods


			this.collection = new List();
			this.collection.bind('add', this.appendItem);


			this.counter = 0;
			this.render(); // not all views are self-rendering. This one is.
		},

		render: function() {
			var me = this;

			$(this.el).append("<button id='add'>Add list item</button>");
			$(this.el).append("<ul></ul>")

			_(this.collection.models).each(function(item){
				me.append(item);
			}, this)

		},
		addItem: function() {

			this.counter++;
			var item = new Item();

			item.set({
				data2 : item.get('data2') + this.counter
			});

			this.collection.add(item);


			

		},
		appendItem: function(item){

			var itemView = new ItemView({model: item});

			$('ul', this.el).append(itemView.render().el);

			// $('ul', this.el).append('<li>' + item.get("data1")+ '' + item.get("data2") + '</li>');
		}
	});

	var listView = new ListView();

	// listView.render();
})(jQuery);