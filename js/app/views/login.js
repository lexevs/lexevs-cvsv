App.LoginView = Backbone.View.extend({

    template : _.template(App.get("tpl/LoginView.html")),

    events : {
    },

    render : function() {
        this.$el.html(this.template());

        return this;
    },

    postRender : function() {

    }

});