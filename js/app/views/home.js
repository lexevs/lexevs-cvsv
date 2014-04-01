App.DefaultView = Backbone.View.extend({

    template : _.template(App.get("tpl/DefaultView.html")),

    events : {
    },

    render : function() {
        this.$el.html(this.template());

        return this;
    },

    postRender : function() {

    }

}); 