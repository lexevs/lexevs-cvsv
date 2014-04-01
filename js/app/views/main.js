App.MainView = Backbone.View.extend({

    template : _.template(App.get("tpl/MainView.html")),

    render : function() {
        this.$el.html(this.template());
        return this;
    },

    postRender : function() {
        // get the CTS2 services to use from a file and populate the dropdown.
        $.getJSON("services.json", function( services ) {
            var servicesSelect = $("#cts2Services");
            servicesSelect.append('<option data-value="" value="'+""+'">'+"Select a Service" +'</option>');

            $.each(services, function( key, entry ) {
                servicesSelect.append('<option data-value="'+entry.cts2Version+'" value="'+entry.serviceUrl+'">'+entry.serviceName +'</option>');
                console.log( "Name : " + entry.serviceName + "URL : " + entry.serviceUrl + " version: " + entry.cts2Version );
            });

        });

        // initialize the button setting it disabled
        $('#cts2ServiceInfo').prop('disabled', true);

        $('#cts2ServiceInfo').click(function () {
            getServiceInformation();
        });

        // User selected a different CTS2 Service
        $("#cts2Services").change(function() {

            App.selectedServiceName =  $("#cts2Services :selected").text();
            App.selectedServiceUrl =  $("#cts2Services").val();
            App.selectedServiceVersion =  $("#cts2Services :selected").data('value');

            // Update the service info button, enable if a service is selected.
            $('#cts2ServiceInfo').prop('disabled', App.selectedServiceUrl.length <= 0);

            getValueSets();
            populateValueSetEntriesTable(null, null);
        });

        renderEmptyValueSetTable();
        renderEmptyValueSetEntriesTable();
    }
}); 