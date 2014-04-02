App.MainView = Backbone.View.extend({

    template : _.template(App.get("tpl/MainView.html")),

    render : function() {
        this.$el.html(this.template());
        return this;
    },

    postRender : function() {

        var $self = this;

        // get the CTS2 services to use from a file and populate the dropdown.
        $.getJSON("services.json", function( services ) {
            var servicesSelect = $("#cts2Services");
            servicesSelect.append('<option data-value="" value="'+""+'">'+"Select a Service" +'</option>');

            $.each(services, function( key, entry ) {
                servicesSelect.append('<option data-value="'+entry.cts2Version+'" value="'+entry.serviceUrl+'">'+entry.serviceName +'</option>');
                console.log( "Name : " + entry.serviceName + "URL : " + entry.serviceUrl + " version: " + entry.cts2Version );
            });

        });

        // initialize the button setting and search to disabled
        $('#cts2ServiceInfo').prop('disabled', true);
        $('#cts2SearchButton').prop('disabled', true);

        // listen for when the search button is clicked
        $('#cts2SearchButton').click(function () {
            $self.doSearch();
        });

        // listen for when the user clicks enter in the search box
        $('#cts2SearchText').keyup(function(e){
            if(e.keyCode == 13)
            {
                $self.doSearch();
            }
        });

        $('#cts2ServiceInfo').click(function () {
            getServiceInformation();
        });

        // User selected a different CTS2 Service
        $("#cts2Services").change(function() {

            App.selectedServiceName =  $("#cts2Services :selected").text();
            App.selectedServiceUrl =  $("#cts2Services").val();
            App.selectedServiceVersion =  $("#cts2Services :selected").data('value');

            // Update the service info button and search, enable if a service is selected.
            $('#cts2ServiceInfo').prop('disabled', App.selectedServiceUrl.length <= 0);
            $('#cts2SearchButton').prop('disabled', App.selectedServiceUrl.length <= 0);

            // Empty the value sets table
            renderEmptyValueSetTable();
            // Empty the value set entries table
            populateValueSetEntriesTable(null, null);
        });

        renderEmptyValueSetTable();
        renderEmptyValueSetEntriesTable();
    },

    doSearch : function() {
        getValueSets();
        populateValueSetEntriesTable(null, null);
    }

}); 