function getValueSets() {

    // Empty the value sets table
    renderEmptyValueSetTable();

    var data = null;
    var url =  App.selectedServiceUrl;

    if (App.selectedServiceVersion == "1.1") {
        // Show busy/loading indicator
        showLoadingIndicatorForValueSets(true);

        url = url + "/valuesets?matchvalue=" + $('#cts2SearchText').val() + App.valueSetParameters;
        console.log(url);

        // Use JSONP lib
        $.jsonp({
            url: url,
            success: function(json) {
                displayResults(json);
            },
            error: function() {
                displayResults(null);
            }
        });

    }
    else if (App.selectedServiceVersion == "1.0") {

        // Need to make a request to a CTS2 version 1.0 service.
        // This will return XML.  The XML needs to be transformed
        // into CTS2 1.1 XML and then transformed to CTS2 standard JSON.

        // Show busy/loading indicator
        showLoadingIndicatorForValueSets(true);

        url = url + "/valuesets?matchvalue=" + $('#cts2SearchText').val() + "&maxtoreturn=500";
        //url = "https://informatics.mayo.edu/vsmc/cts2/valuesets?matchvalue=" + $('#cts2SearchText').val() + "&maxtoreturn=100";

        var xmlResponse = null;
        var data = null;

        var endcodedCredentials = sessionStorage.getItem("endcodedCredentials_"+ App.selectedServiceUrl);
        console.log(url);

        $.ajax({
            cache: false,
            type: "GET",
            url: url,
            dataType: "xml",
            async: false,

            headers: {
                "Authorization" : 'Basic ' + endcodedCredentials
            }
        })
            .done(function (data) {
                console.log("get DONE");
                this.data = data;
            })
            .fail(function (jqXHR, textStatus) {
                console.log("get FAILED");
                this.data = null;
                var test = jqXHR.getAllResponseHeaders();
                var xml = jqXHR.responseXML;

                console.log(jqxhr.responseText);
                console.log(jqxhr.getResponseHeader('Content-Type'));
                console.log(jqxhr);

            })
            .always(function(data) {
                console.log("Going to process the XML");

                // call the transform and send a callback to "displayResults" to
                // display the results after transform is complete.
                transformCTS2XML_10ToJSON(displayResults, this.data, null);
            })
    }
}

function displayResults(data) {

    // hide busy/loading indicator
    showLoadingIndicatorForValueSets(false);

    $("#valueSetsDiv").html(_.template(App.get("tpl/ValueSetsTableView.html")) (
        {
            data : data
        }
    ));

    registerRowClickEvent();
    applyDatatablesToValueSets();
}

function applyDatatablesToValueSets() {
    // Applying jQuery plugin datatables to the value sets table
    $("#valueSetsTable").dataTable({
        "bBootstrap": true,
        "oTableTools": {"sRowSelect": "single"},
        "iDisplayLength": 25
    });

    // Hide the search/filter
    $("#valueSetsTable_filter").hide();
}

function registerRowClickEvent() {

    // get the href for the row that the user clicked on.
    $('#valueSetsTable tr').click(function (event) {
        var href = $(this).find('td.vsHref').data('value');
        var name = $(this).find('td.vsName').data('value');;
        getValueSetEntries(href, name);
    });
}

// Render the value sets table, passing in null data for an initial empty table
function renderEmptyValueSetTable() {

    $("#valueSetsDiv").html(_.template(App.get("tpl/ValueSetsTableView.html")) (
        {data : null}
    ));

    applyDatatablesToValueSets();
}

function showLoadingIndicatorForValueSets(show) {
    if (show) {
        $('#loading-indicator-value-sets').show();
        $('#valueSetsTableDiv').hide();
    }
    else {
        $('#loading-indicator-value-sets').hide();
        $('#valueSetsTableDiv').show();
    }
}


