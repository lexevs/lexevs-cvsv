// The CTS2 1.0 XML needs to be transformed into CTS2 1.1 XML
// and then transformed to CTS2 standard JSON. In order to do this,
// we are using a library called "frameless" found here: http://frameless.io/xslt/
// This library is a client side tool to perform transforms using XSL.
//
// cts2Xlm10 : XML from CTS2 1.0 Service.
// displayResults : callback to call and display data when the transformations are complete.
function transformCTS2XML_10ToJSON(displayResults, cts2Xlm10) {

    var proc1 = new XSLT2Processor(),
        proc2 = new XSLT2Processor(),
        CTS210to11Xslt, xml2json;

    if (cts2Xlm10 == null) {
        displayResults(null);
    }

    // Load the two stylesheets:
    CTS210to11Xslt = proc1.importStylesheetURI('xslt/combinedXml10to11.xsl');
    xml2json = proc2.importStylesheetURI('xslt/XMLToJson.xsl');

    CTS210to11Xslt.then(function () {
        // When the document and the first XSLT are loaded,
        // convert the XML to XML
        var doc2 = proc1.transformToDocument(cts2Xlm10);

        xml2json.then(function () {
            // Then convert the XML to JSON:
            var json = proc2.transformToString(doc2);

            // Parse the JSON, and place it in a data object, then send back
            var cts2Json = JSON.parse(json);
            var data = {ValueSetCatalogEntryDirectory: cts2Json.ValueSetCatalogEntryDirectory};
            displayResults(data);
        }, e);
    }, e);
}

function renderJSON(arg)
{
    console.log(arg);
}
// Function to re-throw the error that would otherwise disappear due to the Promise
function e(e) {
    //throw e
    return null;
};