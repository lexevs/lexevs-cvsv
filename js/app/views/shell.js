App.ShellView = Backbone.View.extend({

	template : _.template(App.get("tpl/ShellView.html")),

	render : function() {
		this.$el.html(this.template());
        return this;
	} ,

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
        $('#cts2ServiceInfo').prop('disabled', true);

        $('#cts2ServiceInfo').click(function () {
            getServiceInformation();
        });

        // User selected a different CTS2 Service
        $("#cts2Services").change(function() {

            App.selectedServiceName =  $("#cts2Services :selected").text();
            App.selectedServiceUrl =  $("#cts2Services").val();
            App.selectedServiceVersion =  $("#cts2Services :selected").data('value');
            App.selectedServiceAuthentication = $("#cts2Services :selected").data('auth');

            // Update the service info button and search, enable if a service is selected.
            $('#cts2ServiceInfo').prop('disabled', App.selectedServiceUrl.length <= 0);
            $('#cts2SearchButton').prop('disabled', App.selectedServiceUrl.length <= 0);

            // Empty the value sets table
            renderEmptyValueSetTable();
            // Empty the value set entries table
            populateValueSetEntriesTable(null, null);

            if (App.selectedServiceAuthentication === true) {

                var endcodedCredentials = sessionStorage.getItem("endcodedCredentials_"+ App.selectedServiceUrl);

                if (endcodedCredentials == null || endcodedCredentials == undefined) {
                    authenticateUser();
                }
                else {
                    $("#logoutButton").show();
                    console.log("found stored credentials");
                }
            }
            else {
                $("#logoutButton").hide();
            }

           setSearchEnablement(null);
        });

    },


    logout : function() {
        doLogout();
    }
});
