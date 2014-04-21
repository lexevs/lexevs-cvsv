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

        $.getJSON(url, function(data) {
        })
            // success
            .done(function(data) {
                this.data = data;
            })
            // fail
            .fail(function(jqXHR, textStatus, errorThrown) {
                this.data = null;
            })
            // always called after success/failure.
            .always(function() {
                displayResults(this.data);
            });
    }
    else if (App.selectedServiceVersion == "1.0") {

        // Need to make a request to a CTS2 version 1.0 service.
        // This will return XML.  The XML needs to be transformed
        // into CTS2 1.1 XML and then transformed to CTS2 standard JSON.

        // Show busy/loading indicator
        showLoadingIndicatorForValueSets(true);

        url = url + "/valuesets?matchvalue=" + $('#cts2SearchText').val() + "&maxtoreturn=10";
        var xmlResponse = null;

        $.get( url, function(data) {

        })
            .done(function(data) {
                this.data = data;

            })
            .fail(function(xhr, ajaxOptions, thrownError){
                this.data = null;

                console.log(xhr.status);
                console.log(thrownError);
            })
            .always(function(data) {

                // call the transform and send a callback to "displayResults" to
                // display the results after transform is complete.
                transformCTS2XML_10ToJSON(displayResults, this.data, null);
            });
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
        "oTableTools": {"sRowSelect": "single"}
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


