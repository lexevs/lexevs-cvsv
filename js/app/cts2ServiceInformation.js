// Retrieve the service information (functional/structural profile) for the new service selected.
function getServiceInformation() {

    console.log(App.selectedServiceUrl);
    console.log(App.selectedServiceName);
    console.log(App.selectedServiceVersion);
    console.log(App.selectedServiceAuthentication);

    // URL to display
    var serviceUrl =  App.selectedServiceUrl;

    // URL to use for request (NLM url needs to be modified).
    var requestUrl =  App.selectedServiceUrl + "/service?format=json&callback=?";

    // Check the version.  The return type for 1.0 is different and needs to
    // be accounted for.
    if (App.selectedServiceVersion === "1.0") {
        serviceUrl = updateUrlToExternal(App.selectedServiceUrl);

        // add the bypass param here so no authentication is needed.
        requestUrl =  serviceUrl + "/service?format=json&bypass=1&callback=?";
    }

    $.getJSON(requestUrl, function(data) {

        if (App.selectedServiceVersion === 1.1) {
            displayServiceResults11(data, serviceUrl);
        }
        else if (App.selectedServiceVersion === "1.0") {
            displayServiceResults10(data, serviceUrl);
        }
    });
}

function displayServiceResults10(data, serviceUrl) {
    // String to build the metadata table
    var metadataStr = "";

    // String to build the profile table
    var dataStr = "";

    $('#serviceInfoTitle').empty();
    $('#serviceInfoProperties').empty();
    $('#serviceInfoMessage').empty();

    $('#serviceInfoTitle').append("CTS2 Service Profile: " + App.selectedServiceName);

    var baseService = null;

    // Determine if CTS2 Version 1.0 or 1.1
    if (data.baseService != undefined) {
        baseService = data.baseService;
    }

    var cts2ServiceName = baseService.serviceName;
    var cts2Version = baseService.serviceVersion;
    var cts2Desc = baseService.serviceDescription.value;

    // There may be multiple supported formats
    var cts2SupportedFormatsStr = "";
    var cts2SupportedFormats = baseService.supportedFormatList;
    $.each(cts2SupportedFormats, function(k,format) {
        cts2SupportedFormatsStr += format.content + " ";
    });

    var cts2DefaultFormat = data.baseService.defaultFormat.content;

    // Build the metadata table.
    metadataStr += "<table class=\"table table-striped table-bordered\" id=\"serviceInfoProperties\">";

    metadataStr += "<tr>";
    metadataStr += "<td>Service URL</td>";
    metadataStr += "<td>" + serviceUrl + "</td>";
    metadataStr += "</tr>";

    metadataStr += "<tr>";
    metadataStr += "<td>Service Name</td>";
    metadataStr += "<td>" + cts2ServiceName + "</td>";
    metadataStr += "</tr>";

    metadataStr += "<tr>";
    metadataStr += "<td>Version</td>";
    metadataStr += "<td>" + cts2Version + "</td>";
    metadataStr += "</tr>";

    metadataStr += "<tr>";
    metadataStr += "<td>Description</td>";
    metadataStr += "<td>" + cts2Desc + "</td>";
    metadataStr += "</tr>";

    metadataStr += "<tr>";
    metadataStr += "<td>Default Format</td>";
    metadataStr += "<td>" + cts2DefaultFormat + "</td>";
    metadataStr += "</tr>";

    metadataStr += "<tr>";
    metadataStr += "<td>Supported Format</td>";
    metadataStr += "<td>" + cts2SupportedFormatsStr + "</td>";
    metadataStr += "</tr>";

    metadataStr += "</table>";

    $('#serviceInfoProperties').append(metadataStr);


    // Build the profile table.
    dataStr += "<table class=\"table table-striped table-bordered\" id=\"serviceProfileTable\">";

    dataStr += "<thead><tr>";
    dataStr += "<th>Structural Profile</th>";
    dataStr += "<th>Functional Profile</th>";
    dataStr += "</tr></thead>";

    $.each(data.baseService.supportedProfileList, function(k,supportedProfile) {

        //console.log(k + " SP: " + supportedProfile.structuralProfile);

        dataStr += "<tr>";
        dataStr += "<td>" + supportedProfile.structuralProfile + "</td>";

        $.each(supportedProfile.functionalProfileList, function(x,fp) {
            //console.log(x + " FP " + fp.content);
            dataStr += "<td>" + fp.content + "</td>";
        });

        dataStr += "</tr>";

        //console.log("----------") ;
    });

    dataStr += "</table>";

    $('#serviceInfoMessage').append(dataStr);

    // show the dialog now
    $('#cts2ServiceModal').modal();

    // Applying jQuery plugin datatables to the profile table
    $("#serviceProfileTable").dataTable({
        "bBootstrap": true,
        "oTableTools": {"sRowSelect": "single"}
    });

}


function displayServiceResults11(data, serviceUrl) {
    // String to build the metadata table
    var metadataStr = "";

    // String to build the profile table
    var dataStr = "";

    $('#serviceInfoTitle').empty();
    $('#serviceInfoProperties').empty();
    $('#serviceInfoMessage').empty();

    $('#serviceInfoTitle').append("CTS2 Service Profile: " + App.selectedServiceName);

    var baseService = null;

    // Determine if CTS2 Version 1.0 or 1.1
    if (data.baseService != undefined) {
        baseService = data.baseService;
    }
    else if (data.BaseService != undefined) {
        baseService = data.BaseService;
    }

    var cts2ServiceName = baseService.serviceName;
    var cts2Version = baseService.serviceVersion;
    var cts2Desc = baseService.serviceDescription.value;

    // There may be multiple supported formats
    var cts2SupportedFormatsStr = "";
    var cts2SupportedFormats = baseService.supportedFormat;
    $.each(cts2SupportedFormats, function(k,format) {
        cts2SupportedFormatsStr += format.content + " ";
    });

    var cts2DefaultFormat = data.BaseService.defaultFormat.content;

    // Build the metadata table.
    metadataStr += "<table class=\"table table-striped table-bordered\" id=\"serviceInfoProperties\">";

    metadataStr += "<tr>";
    metadataStr += "<td>Service URL</td>";
    metadataStr += "<td>" + serviceUrl + "</td>";
    metadataStr += "</tr>";

    metadataStr += "<tr>";
    metadataStr += "<td>Service Name</td>";
    metadataStr += "<td>" + cts2ServiceName + "</td>";
    metadataStr += "</tr>";

    metadataStr += "<tr>";
    metadataStr += "<td>Version</td>";
    metadataStr += "<td>" + cts2Version + "</td>";
    metadataStr += "</tr>";

    metadataStr += "<tr>";
    metadataStr += "<td>Description</td>";
    metadataStr += "<td>" + cts2Desc + "</td>";
    metadataStr += "</tr>";

    metadataStr += "<tr>";
    metadataStr += "<td>Default Format</td>";
    metadataStr += "<td>" + cts2DefaultFormat + "</td>";
    metadataStr += "</tr>";

    metadataStr += "<tr>";
    metadataStr += "<td>Supported Format</td>";
    metadataStr += "<td>" + cts2SupportedFormatsStr + "</td>";
    metadataStr += "</tr>";

    metadataStr += "</table>";

    $('#serviceInfoProperties').append(metadataStr);


    // Build the profile table.
    dataStr += "<table class=\"table table-striped table-bordered\" id=\"serviceProfileTable\">";

    dataStr += "<thead><tr>";
    dataStr += "<th>Structural Profile</th>";
    dataStr += "<th>Functional Profile</th>";
    dataStr += "</tr></thead>";

    $.each(data.BaseService.supportedProfile, function(k,supportedProfile) {

        //console.log(k + " SP: " + supportedProfile.structuralProfile);

        dataStr += "<tr>";
        dataStr += "<td>" + supportedProfile.structuralProfile + "</td>";

        $.each(supportedProfile.functionalProfile, function(x,fp) {
            //console.log(x + " FP " + fp.content);
            dataStr += "<td>" + fp.content + "</td>";
        });

        dataStr += "</tr>";

        //console.log("----------") ;
    });

    dataStr += "</table>";

    $('#serviceInfoMessage').append(dataStr);

    // show the dialog now
    $('#cts2ServiceModal').modal();

    // Applying jQuery plugin datatables to the profile table
    $("#serviceProfileTable").dataTable({
        "bBootstrap": true,
        "oTableTools": {"sRowSelect": "single"}
    });

}