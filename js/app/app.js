// Main javascript.
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;

        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from;
        }
        return -1;
    };
}

var App = {
	Views : {},

    selectedServiceName :'',
    selectedServiceUrl :'',
    selectedServiceVersion :'',
    selectedServiceAuthentication : '',

    valueSetParameters : '&maxtoreturn=2000&format=json&callback=?',
    valueSetEntryParameters : '/resolution?format=json&maxtoreturn=500&callback=?',
    authenticationParameters : "/valuesets?maxtoreturn=1",

    valueSetEntriesTitle : "Value Set Entries",

    // turn debug on/off for the site
    Debug : false,

    // function to retrieve a url and return the response
	get : function(url) {
		var data = "<h1> failed to load url : " + url + "</h1>";
		$.ajax({
			async : false,
			url : url,
			success : function(response) {
				data = response;
			}
		});
		return data;
	}
};

if (!window.console) {
	console = {
	    log : function(msg) {}
	}		
}

$(document).on("ready", function() {

    //Support for I.E.
    $.support.cors = true;

	App.Router = new App.Router();
	Backbone.history.start();

   // enableWaitCursor();

    //Placeholder Support for I.E.
    $('input, textarea').placeholder();
});

// redirect any https calls to use the proxy.
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    if (options.url.indexOf("http://infvsac/vsmcsecure") > -1) {
        options.headers['X-Proxy-URL'] = options.url;
        options.url = 'proxy.php';
    }
});