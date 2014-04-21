function getValueSetEntries(href, name) {

    if (href == null) {
        // Empty the value set entries table
        renderEmptyValueSetEntriesTable();

        return;
    }

    var data = null;
    var url = null;

    if (App.selectedServiceVersion == "1.1") {

        url = href + "?format=json";
        console.log(url);

        // Show busy/loading indicator
        showLoadingIndicatorForEntries(true);

        $.getJSON(url, function(data) {

        })
            // success
            .done(function(data) {
                this.data = data;
            })
            // fail
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Value set entries request failed! ' + textStatus);
                this.data = null;
            })
            // always called after success/failure.
            .always(function() {

                // hide busy/loading indicator
                showLoadingIndicatorForEntries(false);

                if (this.data != null) {
                   getCurrentValueSetDefinition(this.data, name);
                }
            });
    }
    else if (App.selectedServiceVersion == "1.0") {

        // Need to make a request to a CTS2 version 1.0 service.
        // This will return XML.  The XML needs to be transformed
        // into CTS2 1.1 XML and then transformed to CTS2 standard JSON.

        // Show busy/loading indicator
        showLoadingIndicatorForEntries(true);

        url = href + "?maxtoreturn=500&format=xml";
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

                if (data != null && data.status !== 500) {
                    // call the transform and send a callback to "getCurrentValueSetDefinition" to
                    // the next call after transform is complete.
                    transformCTS2XML_10ToJSON(getCurrentValueSetDefinition, data, name);
                }
                else {
                    // hide busy/loading indicator
                    showLoadingIndicatorForEntries(false);
                    populateValueSetEntriesTable(null, name);
                }
            });
    }
}

function getCurrentValueSetDefinition(vsData, name) {

    var data = null;
    var currentDefinition = null;

    if (vsData === null || vsData === undefined || vsData.ValueSetCatalogEntryMsg === undefined ) {
        showLoadingIndicatorForEntries(false);
        return;
    }
    else if (vsData.ValueSetCatalogEntryMsg.valueSetCatalogEntry.currentDefinition != null) {
       currentDefinition = vsData.ValueSetCatalogEntryMsg.valueSetCatalogEntry.currentDefinition.valueSetDefinition.href;
    }

    if (currentDefinition == null){
        showLoadingIndicatorForEntries(false);
        populateValueSetEntriesTable(null, name);
        return;
    }

    var href = null;

    if (App.selectedServiceVersion == "1.1") {
    // Show busy/loading indicator
    showLoadingIndicatorForEntries(true);

    href = currentDefinition + "/resolution?format=json";
    console.log(href);

    $.getJSON(href, function(data) {

    })
        // success
        .done(function(data) {
            this.data = data;
        })
        // fail
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Resolution request failed! ' + textStatus);
            this.data = null;
        })
        // always called after success/failure.
        .always(function() {

            populateValueSetEntriesTable(this.data, name);
        });
    }
    else if (App.selectedServiceVersion == "1.0") {

        // Need to make a request to a CTS2 version 1.0 service.
        // This will return XML.  The XML needs to be transformed
        // into CTS2 1.1 XML and then transformed to CTS2 standard JSON.

        var xmlResponse = null;

        // Show busy/loading indicator
        showLoadingIndicatorForEntries(true);

        href = currentDefinition + "/resolution?maxtoreturn=500&format=xml";

        $.get( href, function(data) {

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

                // call the transform and send a callback to "populateValueSetEntriesTable" to
                // the next call after transform is complete.
                transformCTS2XML_10ToJSON(populateValueSetEntriesTable, this.data, name);
            });
    }
}

function applyDatatablesToValueSetEntries() {
    // Applying jQuery plugin datatables to the value sets table
    $("#valueSetEntriesTable").dataTable({
        "bBootstrap": true,
        "oTableTools": {"sRowSelect": "single"}
    });

    // Hide the search/filter
    $("#valueSetEntriesTable_filter").hide();
}

function renderEmptyValueSetEntriesTable() {
    $("#valueSetEntriesDiv").html(_.template(App.get("tpl/ValueSetEntriesTableView.html")) (
        {
            data : null,
             title : App.valueSetEntriesTitle
        }
    ));
    applyDatatablesToValueSetEntries();
}

function populateValueSetEntriesTable(entryData, name) {

    // hide busy/loading indicator
    showLoadingIndicatorForEntries(false);

    var title = "";

    // Determine what the Value Set Entries title should be.
    if (name == null){
        title = App.valueSetEntriesTitle;
    }
    else {
        title = App.valueSetEntriesTitle + ": " + name;
    }

    $("#valueSetEntriesDiv").html(_.template(App.get("tpl/ValueSetEntriesTableView.html")) (
        {
            data : entryData,
            title : title
        }
    ));
    applyDatatablesToValueSetEntries();
}

function showLoadingIndicatorForEntries(show) {
    if (show) {
        $('#loading-indicator-entries').show();
        $('#valueSetEntriesTableDiv').hide();
    }
    else {
        $('#loading-indicator-entries').hide();
        $('#valueSetEntriesTableDiv').show();
    }
}