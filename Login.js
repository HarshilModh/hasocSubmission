function validate() {
    var email = document.getElementById("username")
    var password = document.getElementById("password")
    if (email.value == "") {
        document.getElementById("Nameerror").innerHTML = "Username Missing"
    } else {
        document.getElementById("Nameerror").innerHTML = ""
    }
    if (password.value == "") {
        document.getElementById("passerror").innerHTML = "Password Missing"
    } else {
        document.getElementById("passerror").innerHTML = ""
    }
}

function setCookie(name, value, daysToLive) {
    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(value);

    if (typeof daysToLive === "number") {
        /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
        cookie += "; max-age=" + (daysToLive * 24 * 60 * 60);

        document.cookie = cookie;
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function login() {
    console.log("log in called")
    var email = document.getElementById("username").value
    var password = document.getElementById("password").value
    console.log(email)
    console.log(password)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/user/login",
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": email,
            "password": password
        }),
        success: function(result) {
            var token = result.token
            setCookie('token', token, 7)
            setCookie('user', email, 7)
            console.log(document.cookie);
            window.location = 'Index.html';
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 402) {
                console.log(jqXHR.status);

                Swal.fire({
                    icon: 'error',
                    title: 'Invalid password',
                })
            }
            if (jqXHR.status == 404) {
                console.log(jqXHR.status);
                Swal.fire({
                    icon: 'error',
                    title: 'Team does not exist',
                })
            }
            if (jqXHR.status == 400) {
                console.log(jqXHR.status);

                Swal.fire({
                    icon: 'error',
                    title: 'Bad request',
                })
            }

        }
    });


}