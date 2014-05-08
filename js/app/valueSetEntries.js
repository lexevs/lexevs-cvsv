function getValueSetEntries(href, name) {

    if (href == null) {
        // Empty the value set entries table
        renderEmptyValueSetEntriesTable();

        return;
    }

    var data = null;
    var url = null;

    if (App.selectedServiceVersion == "1.1") {

        url = href + "/resolution?format=json&callback=?";
        console.log(url);

        // Show busy/loading indicator
        showLoadingIndicatorForEntries(true);

        // Use JSONP lib
        $.jsonp({
            url: url,
            success: function(json) {
                populateValueSetEntriesTable(json, name);
            },
            error: function() {
                populateValueSetEntriesTable(null, name);
            }
        });
    }
    else if (App.selectedServiceVersion == "1.0") {

        // Need to make a request to a CTS2 version 1.0 service.
        // This will return XML.  The XML needs to be transformed
        // into CTS2 1.1 XML and then transformed to CTS2 standard JSON.

        // Show busy/loading indicator
        showLoadingIndicatorForEntries(true);

        url = href + "/resolution?maxtoreturn=500";
        url = updateUrlToInternal(url);

        var endcodedCredentials = sessionStorage.getItem("endcodedCredentials_"+ App.selectedServiceUrl);

        console.log(url);

        $.ajax({
            cache: false,
            type: "GET",
            url: url,
            dataType: "xml",
            async: false,

            headers: {
                'Authorization' : 'Basic ' + endcodedCredentials
            }
        })
            .done(function (data) {
                console.log("get entries DONE");
                this.data = data;
            })
            .fail(function (jqXHR, textStatus) {
                console.log("get entries FAILED");
                this.data = null;
            })
            .always(function(data) {
                console.log("Get entries, going to process the XML");

                if (this.data != null){
                    // call the transform and send a callback to "displayResults" to
                    // display the results after transform is complete.
                    transformCTS2XML_10ToJSON(populateValueSetEntriesTable, this.data, name);
                }
                else {
                    // don't transform, just display empty table.
                    populateValueSetEntriesTable(null, name);
                }
            })
    }
}

function applyDatatablesToValueSetEntries() {
    // Applying jQuery plugin datatables to the value sets table
    $("#valueSetEntriesTable").dataTable({
        "bBootstrap": true,
        "oTableTools": {"sRowSelect": "single"},
        "iDisplayLength": 25
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
            title : title,
            version: App.selectedServiceVersion
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
