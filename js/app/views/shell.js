App.ShellView = Backbone.View.extend({

	template : _.template(App.get("tpl/ShellView.html")),

	render : function() {
		this.$el.html(this.template());
        return this;
	}
});
