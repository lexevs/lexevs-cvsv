/* set the ability to start/stop the wait cursor. */
function enableWaitCursor() {
    $(document).ajaxStart(function () {
        document.body.style.cursor = 'wait';
        $('div#wrapper').addClass('wait');
    });

    $(document).ajaxStop(function () {
        document.body.style.cursor = 'auto';
        $('div#wrapper').removeClass('wait');
    });
}

/* Add in placeholder text (for I.E.) */
function addPlaceholderText() {
    //Placeholder Support for I.E.
    $('input, textarea').placeholder();
}

function updateUrlToInternal(url) {

    var nlmExternalUrl = "https://informatics.mayo.edu/vsmc/cts2";

    // For NLM, we need to use an internal url.  This will go through our proxy correctly.
    if (url.indexOf(nlmExternalUrl) > -1){
        url = url.replace(nlmExternalUrl, App.selectedServiceUrl)
    }

    return url;
}

function updateUrlToExternal(url) {

    // Swap the external URL in for the internal one.
    var nlmInternalUrl = "http://infvsac/vsmcsecure/cts2";
    var nlmExternalUrl = "https://informatics.mayo.edu/vsmc/cts2";

    // For NLM, we need to use an internal url.  This will go through our proxy correctly.
    if (url.indexOf(nlmInternalUrl) > -1){
        url = url.replace(nlmInternalUrl, nlmExternalUrl)
    }

    return url;
}