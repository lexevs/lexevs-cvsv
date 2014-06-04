function authenticateUser() {
    this.LoginView = new App.LoginView();
    this.loginContent = this.LoginView.render().el;

    // Show dialog for id and pw
    bootbox.dialog({
        message: this.loginContent,
        title: "Login: " + App.selectedServiceName,
        buttons: {
            success: {
                label: "Login",
                className: "btn-success",
                callback: function() {
                    var user = $("#userIdValue").val();
                    var pw = $("#userPwValue").val()
                    authenticateUserService(user, pw);
                }
            },
            main: {
                label: "Cancel",
                className: "btn-default",
                callback: function() {
                    // reset cts2 service pulldown
                    $("#cts2Services").val('');

                    App.selectedServiceName =   "";
                    App.selectedServiceUrl =   "";
                    App.selectedServiceVersion =  "";
                    App.selectedServiceAuthentication = "";

                    // disable buttons
                    $('#cts2ServiceInfo').prop('disabled', true);
                    $('#cts2SearchButton').prop('disabled', true);
                }
            }
        }
    });
}

function authenticateUserService(id, pw)  {

    var url = App.selectedServiceUrl + App.authenticationParameters;
    var endcodedCredentials =  encodeCredentials(id, pw);

    $.ajax({
        cache: false,
        type: "GET",
        url: url,
        dataType: "xml",
        async: false,

        headers: {
            'Authorization' : 'Basic ' + endcodedCredentials,
            "Content-Type" :"application/xml"
        }
    })
        .done(function (data) {
            // Storing the authentication information in browser session.
            sessionStorage.setItem("endcodedCredentials_"+ App.selectedServiceUrl, endcodedCredentials);
            $("#logoutButton").show();

        })
        .fail(function (jqXHR, textStatus) {
            console.log("Login FAILED");
            authenticateUser();
        })
}

function encodeCredentials(id, pw) {

    var toEncode = id + ":" + pw;
    var encoded = $.base64.encode(toEncode);

    return encoded;
}

function doLogout(){
    $("#logoutButton").hide();

    // reset cts2 service pulldown
    $("#cts2Services").val("");

    // disable buttons
    $('#cts2ServiceInfo').prop('disabled', true);
    $('#cts2SearchButton').prop('disabled', true);

    // clear the tables
    renderEmptyValueSetTable();
    renderEmptyValueSetEntriesTable();

    // TODO: If we get multiple cts2 services that we log into, then we need to remove
    // TODO: only that one, and not do a clear on the entire cache.

    sessionStorage.clear();
    // Force IE to clear the authentication cache
    document.execCommand('ClearAuthenticationCache');
}

