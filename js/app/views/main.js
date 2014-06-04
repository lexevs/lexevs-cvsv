App.MainView = Backbone.View.extend({

    template : _.template(App.get("tpl/MainView.html")),

    render : function() {
        this.$el.html(this.template());
        return this;
    },

    events: {
        'click button#logoutButton' : 'logout'
    },

    postRender : function() {

        var $self = this;

        // initially hide.
        $("#logoutButton").hide();

        // get the CTS2 services to use from a file and populate the dropdown.
        $.getJSON("services.json", function( services ) {
            var servicesSelect = $("#cts2Services");
            servicesSelect.empty();

            servicesSelect.append('<option data-value="" value="'+""+'">'+"Select a Service" +'</option>');

            $.each(services, function( key, entry ) {
                servicesSelect.append('<option data-auth="'+entry.serviceAuthentication+'" data-value="'+entry.cts2Version+'" value="'+entry.serviceUrl+'">'+entry.serviceName +'</option>');
                //console.log( "Name : " + entry.serviceName + "URL : " + entry.serviceUrl + " version: " + entry.cts2Version  + " authentication: " + entry.serviceAuthentication);
            });

        });

        // initialize the button setting and search to disabled
        $('#cts2SearchButton').prop('disabled', true);

        // listen for when the search button is clicked
        $('#cts2SearchButton').click(function () {
            $self.doSearch();
        });

        // listen for when the user clicks enter in the search box
        // enable search when there are at least 3 characters typed in and
        // there is a valid service.
        $('#cts2SearchText').keyup(function(e){
            if (setSearchEnablement(e)) {
                if(e != null && e.keyCode == 13)
                {
                    $self.doSearch();
                }
            }
        });

        renderEmptyValueSetTable();
        renderEmptyValueSetEntriesTable();
    },

    doSearch : function() {
        getValueSets();
        populateValueSetEntriesTable(null, null);
    }

});