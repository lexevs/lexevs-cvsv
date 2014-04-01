function getValueSetEntries(href, name) {

    if (href == null) {
        // Empty the value set entries table
        renderEmptyValueSetEntriesTable();

        return;
    }

    var data = null;
    var url = href + App.valueSetEntryParameters
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

            populateValueSetEntriesTable(this.data, name)
        });
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