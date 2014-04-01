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
