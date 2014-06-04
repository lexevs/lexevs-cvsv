// Router to provide different "bookmarkable" links for LCD
App.Router = Backbone.Router.extend({

    routes : {
        ""        : "main",
        "about"   : "about"
    },

    initialize : function() {
        App.shellView = new App.ShellView();
        $('body').html(App.shellView.render().el);
        this.$content = $("#mainContent");
        App.shellView.postRender();
    },

    main : function() {
        $("#serviceForm").show();

        //if (!App.mainView) {
            App.mainView = new App.MainView();
            App.mainView.render();
        //}
        this.$content.html(App.mainView.el);
        App.mainView.postRender();

    },
    
     about : function() {
        $("#serviceForm").hide();

        if (!App.aboutView) {
            App.aboutView = new App.AboutView();
            App.aboutView.render();
        }
        this.$content.html(App.aboutView.el);
    }
});
