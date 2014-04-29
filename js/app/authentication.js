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
                    user = $("#userIdValue").val();
                    pw = $("#userPwValue").val()

                    authenticateUserService(user, pw);
                }
            },
            main: {
                label: "Cancel",
                className: "btn-default",
                callback: function() {
                    // reset cts2 service pulldown
                    $("#cts2Services").val("");
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
        dataType: "json",
        async: false,

        headers: {
            'Authorization' : 'Basic ' + endcodedCredentials,
            "Content-Type" :"application/json"
        }
    })

        .done(function (data) {
            console.log("Login DONE");
        })
        .fail(function (jqXHR, textStatus) {
            console.log("Login FAILED");
        })
        .always(function(jqXHR, textStatus, errorThrown, data) {
            console.log("Login status: " + jqXHR.status);

            // if successful login, return the encoded credentials to be cached.
            if (jqXHR.status === 200) {

                // Storing the authentication information in browser session.
                sessionStorage.setItem("endcodedCredentials_"+ App.selectedServiceUrl, endcodedCredentials);
                $("#logoutButton").show();
            }
            else {
                authenticateUser();
            }
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

    // clear the tables
    renderEmptyValueSetTable();
    renderEmptyValueSetEntriesTable();

    // TODO:  if we get multiple cts2 services that we log into, then we need to remove
    // only that one, and not do a clear on the entire cache.

    sessionStorage.clear();
    // Force IE to clear the authentication cache
    document.execCommand('ClearAuthenticationCache');
}

