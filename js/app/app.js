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
    valueSetEntryParameters : '?maxtoreturn=1000&format=json&callback=?',
    authenticationParameters : "/valuesets?maxtoreturn=1&callback=?",

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

