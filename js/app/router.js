// Router to provide different "bookmarkable" links for LCD
App.Router = Backbone.Router.extend({

    routes : {
        ""        : "default",
        "home"    : "main",
        "about"   : "about"
    },

    initialize : function() {
        App.shellView = new App.ShellView();
        $('body').html(App.shellView.render().el);
        this.$content = $("#mainContent");
    },

    default : function(param) {
        // Since the home view never changes, we instantiate it and render it only once
        if (!App.defaultView) {
            App.defaultView = new App.DefaultView();
            App.defaultView.render();
        } else {
            App.defaultView.delegateEvents();
            // delegate events when the view is recycled
        }
        App.defaultView.render();
        this.$content.html(App.defaultView.el);

        App.defaultView.postRender();

    },

    main : function() {
        //if (!App.mainView) {
            App.mainView = new App.MainView();
            App.mainView.render();
        //}
        this.$content.html(App.mainView.el);

        App.mainView.postRender();

    },
    
     about : function() {
        if (!App.aboutView) {
            App.aboutView = new App.AboutView();
            App.aboutView.render();
        }
        this.$content.html(App.aboutView.el);
    }
});
