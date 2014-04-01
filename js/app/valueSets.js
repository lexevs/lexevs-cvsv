function getValueSets() {

    // Empty the value sets table
    renderEmptyValueSetTable();

    var data = null;
    var url =  App.selectedServiceUrl;

    if (App.selectedServiceVersion == "1.1") {

        // Show busy/loading indicator
        showLoadingIndicatorForValueSets(true);

        url = url +  App.valueSetParameters;
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
                // hide busy/loading indicator
                showLoadingIndicatorForValueSets(false);

                $("#valueSetsDiv").html(_.template(App.get("tpl/ValueSetsTableView.html")) (
                    {
                        data : this.data
                    }
                ));

                registerRowClickEvent();
                applyDatatablesToValueSets();
            });
    }
    else if (App.selectedServiceVersion == "1.0") {


        // Need to make a request to a CTS2 version 1.0 service.
        // This will return XML.  The XML needs to be transformed
        // into CTS2 1.1 XML and then transformed to CTS2 standard JSON.

        url = url + "/valuesets?maxtoreturn=20";
        var xmlResponse = null;

        $.get( url, function(data) {
            alert( "success" );
        })
            .done(function(data) {
                this.data = data;

                //console.log("XML File is loaded!");
                //console.log(data);


                transformXML(data);

            })
            .fail(function(xhr, ajaxOptions, thrownError){
                this.data = null;

                //console.log(xhr.status);
                //console.log(thrownError);
            })
            .always(function(data) {

            });


//        $.ajax({
//            type: "GET",
//            url: url,
//            dataType: "xml",
//            cache: false,
//            success: function(result) {
//                console.log("XML File is loaded!");
//                console.log(result);
//            },
//            error:function (xhr, ajaxOptions, thrownError){
//                console.log(xhr.status);
//                console.log(thrownError);
//
//                console.log("Error " +xhr.status+": " + thrownError);
//            },
//            async: true
//        });

    }

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

function transformXML(xml) {

    $('#bottom').getTransform(
        'examples/test.xsl',
        'examples/test.xml'
    );


//    $.getTransform(
//        '/xslt/XMLToJson.xsl',            // path or xsl document in javascript variable
//        xml,                              // path or xml document in javascript variable
//        {
//            //xpath: '/test/inside',        // trims your xml file to that defined by this xpath
//            eval: true,                     // evaluates any <script> blocks it finds in the transformed result
//            callback: function(result){     // getTransform evaluates this function when transformation is complete
//                console.log("after xml transform....");
//            }
//        }
//    );

}



