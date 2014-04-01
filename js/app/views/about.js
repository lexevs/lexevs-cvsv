App.AboutView = Backbone.View.extend({

    template : _.template(App.get("tpl/AboutView.html")),

    render : function() {
        this.$el.html(this.template());
        return this;
    }
}); 