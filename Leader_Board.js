function logout() {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    localStorage.clear()
    window.location = 'Login.html'
}

function password2() {
    var password = document.getElementById("Password").value
    var new_password = document.getElementById("NewPassword").value
    if (password == new_password) {
        document.getElementById("passworderr").innerHTML = "New Password cant be same"
    } else {
        document.getElementById("passworderr").innerHTML = ""
    }
}

function password() {
    var new_password = document.getElementById("NewPassword").value
    var confirm_passowrd = document.getElementById("ConfirmPassword").value
    if (new_password == confirm_passowrd) {
        document.getElementById("passworderr").innerHTML = ""
    } else {
        document.getElementById("passworderr").innerHTML = "Password doesnt match"
    }
}

function changepassword() {
    //var elements = document.cookie.split('=')
    //var team = localStorage.getItem("User")
    var password = document.getElementById("Password").value
    var new_password = document.getElementById("NewPassword").value
    var confirm_passowrd = document.getElementById("ConfirmPassword").value
    var elements = document.cookie.split('=')
    elem = JSON.parse(elements[1])
    elements = elem.token
    var team = elem.user
    console.log(password);
    console.log(new_password);
    console.log(confirm_passowrd);
    if (new_password == confirm_passowrd) {
        $.ajax({
            type: 'POST',
            url: "https://hasocsubmission.el.r.appspot.com/user/change_password",
            headers: {
                "x-access-token": elements,
                'content-type': 'application/json'
            },
            data: JSON.stringify({
                "team_name": team,
                "password": password,
                "new_password": new_password
            }),
            success: function(result) {
                console.log(result)
                Swal.fire({
                    icon: 'success',
                    title: 'Password Changed'
                })
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 402) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid password',

                    })
                }
                if (jqXHR.status == 401) {
                    window.location = "Login.html"
                }
            }

        });
    } else {

    }
}

function check_token() {
    var authtoken = document.cookie
    console.log(authtoken);
    if (authtoken.length == 0) {
        console.log("Inside Null");
        window.location = 'Login.html';
    } else {
        leaderboard_table()
    }
}

/*function leaderboard() {

    var team = localStorage.getItem("User")
    console.log(team);
    var elements = document.cookie.split('=')

    document.getElementById("navbarDropdownMenuLink").innerHTML = `Welcome ${team}`
    var task_name = localStorage.getItem("task_name")
    var tn = localStorage.getItem("tn")
    document.getElementById("Tname").innerHTML = tn
    if (task_name == null) {
        console.log("Here");
        leaderboard_Eng()
    }


    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "task_name": task_name
        }),
        success: function(result) {
            // var request=new XMLHttpRequest();
            // token=request.getResponseHeader("x-mstr-authtoken")
            //console.log(result.token)
            //var token=result.token
            // console.log(token);
            //document.cookie=token;
            console.log(result);
            for (var i = 0; i < result.length; i++) {

                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = (i + 1)


                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].team_name

                cell3 = newRow.insertCell(2)
                cell3 = newRow.insertCell(2)
                if (result[i].task_name == "1A_English") {
                    cell3.innerHTML = "English Subtask A"

                }
                if (result[i].task_name == "1B_English") {
                    cell3.innerHTML = "English Subtask B"

                }
                if (result[i].task_name == "1A_Hindi") {
                    cell3.innerHTML = "Hindi Subtask A"

                }
                if (result[i].task_name == "1B_Hindi") {
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if (result[i].task_name == "1A_Marathi") {
                    cell3.innerHTML = "Marathi Subtask A"

                }
                if (result[i].task_name == "2_ICHCL") {
                    cell3.innerHTML = "Subtask 2"

                }

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].timestamp
                    //result[i].f1_score

                cell5 = newRow.insertCell(4)
                cell5.innerHTML = result[i].submission_name

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = result[i].f1_score


            }


        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}

function set_task(td) {
    selectedRow = td.parentElement.parentElement;
    var task = selectedRow.cells[0].innerHTML
    console.log(task);
}

function leaderboard_Eng() {
    console.log("scsa");
    document.getElementById("Tname").innerHTML = "English Subtask A"

    var elements = document.cookie.split('=')

    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "task_name": '1A_English'
        }),
        success: function(result) {

            console.log(result);
            for (var i = 0; i < result.length; i++) {

                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = (i + 1)


                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].team_name

                cell3 = newRow.insertCell(2)
                cell3 = newRow.insertCell(2)
                if (result[i].task_name == "1A_English") {
                    cell3.innerHTML = "English Subtask A"

                }
                if (result[i].task_name == "1B_English") {
                    cell3.innerHTML = "English Subtask B"

                }
                if (result[i].task_name == "1A_Hindi") {
                    cell3.innerHTML = "Hindi Subtask A"

                }
                if (result[i].task_name == "1B_Hindi") {
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if (result[i].task_name == "1A_Marathi") {
                    cell3.innerHTML = "Marathi Subtask A"

                }
                if (result[i].task_name == "2_ICHCL") {
                    cell3.innerHTML = "Subtask 2"

                }

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].timestamp
                    //result[i].f1_score

                cell5 = newRow.insertCell(4)
                cell5.innerHTML = result[i].submission_name

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = result[i].f1_score
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}

function leaderboard_Hindi() {
    var elements = document.cookie.split('=')
    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    document.getElementById("Tname").innerHTML = "Hindi Subtask A"


    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "task_name": "1A_Hindi"
        }),
        success: function(result) {

            console.log(result);
            for (var i = 0; i < result.length; i++) {

                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = (i + 1)


                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].team_name

                cell3 = newRow.insertCell(2)
                cell3 = newRow.insertCell(2)
                if (result[i].task_name == "1A_English") {
                    cell3.innerHTML = "English Subtask A"

                }
                if (result[i].task_name == "1B_English") {
                    cell3.innerHTML = "English Subtask B"

                }
                if (result[i].task_name == "1A_Hindi") {
                    cell3.innerHTML = "Hindi Subtask A"

                }
                if (result[i].task_name == "1B_Hindi") {
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if (result[i].task_name == "1A_Marathi") {
                    cell3.innerHTML = "Marathi Subtask A"

                }
                if (result[i].task_name == "2_ICHCL") {
                    cell3.innerHTML = "Subtask 2"

                }

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].timestamp
                    //result[i].f1_score

                cell5 = newRow.insertCell(4)
                cell5.innerHTML = result[i].submission_name

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = result[i].f1_score



            }



        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}

function leaderboard_Marathi() {
    var elements = document.cookie.split('=')

    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    document.getElementById("Tname").innerHTML = "Marathi Subtask A"

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "task_name": '1A_Marathi'
        }),
        success: function(result) {

            console.log(result);
            for (var i = 0; i < result.length; i++) {

                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = (i + 1)


                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].team_name

                cell3 = newRow.insertCell(2)
                cell3 = newRow.insertCell(2)
                if (result[i].task_name == "1A_English") {
                    cell3.innerHTML = "English Subtask A"

                }
                if (result[i].task_name == "1B_English") {
                    cell3.innerHTML = "English Subtask B"

                }
                if (result[i].task_name == "1A_Hindi") {
                    cell3.innerHTML = "Hindi Subtask A"

                }
                if (result[i].task_name == "1B_Hindi") {
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if (result[i].task_name == "1A_Marathi") {
                    cell3.innerHTML = "Marathi Subtask A"

                }
                if (result[i].task_name == "2_ICHCL") {
                    cell3.innerHTML = "Subtask 2"

                }

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].timestamp
                    //result[i].f1_score

                cell5 = newRow.insertCell(4)
                cell5.innerHTML = result[i].submission_name

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = result[i].f1_score



            }



        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}

function leaderboard_1BEng() {

    var elements = document.cookie.split('=')

    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    document.getElementById("Tname").innerHTML = "English Subtask B"

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "task_name": "1B_English"
        }),
        success: function(result) {

            console.log(result);
            for (var i = 0; i < result.length; i++) {

                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = (i + 1)


                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].team_name

                cell3 = newRow.insertCell(2)
                cell3 = newRow.insertCell(2)
                if (result[i].task_name == "1A_English") {
                    cell3.innerHTML = "English Subtask A"

                }
                if (result[i].task_name == "1B_English") {
                    cell3.innerHTML = "English Subtask B"

                }
                if (result[i].task_name == "1A_Hindi") {
                    cell3.innerHTML = "Hindi Subtask A"

                }
                if (result[i].task_name == "1B_Hindi") {
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if (result[i].task_name == "1A_Marathi") {
                    cell3.innerHTML = "Marathi Subtask A"

                }
                if (result[i].task_name == "2_ICHCL") {
                    cell3.innerHTML = "Subtask 2"

                }

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].timestamp
                    //result[i].f1_score

                cell5 = newRow.insertCell(4)
                cell5.innerHTML = result[i].submission_name

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = result[i].f1_score


            }


        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}

function leaderboard_1BHin() {
    var elements = document.cookie.split('=')

    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    document.getElementById("Tname").innerHTML = "Hindi Subtask B"

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "task_name": "1B_Hindi"
        }),
        success: function(result) {

            console.log(result);
            for (var i = 0; i < result.length; i++) {

                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = (i + 1)


                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].team_name

                cell3 = newRow.insertCell(2)
                cell3 = newRow.insertCell(2)
                if (result[i].task_name == "1A_English") {
                    cell3.innerHTML = "English Subtask A"

                }
                if (result[i].task_name == "1B_English") {
                    cell3.innerHTML = "English Subtask B"

                }
                if (result[i].task_name == "1A_Hindi") {
                    cell3.innerHTML = "Hindi Subtask A"

                }
                if (result[i].task_name == "1B_Hindi") {
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if (result[i].task_name == "1A_Marathi") {
                    cell3.innerHTML = "Marathi Subtask A"

                }
                if (result[i].task_name == "2_ICHCL") {
                    cell3.innerHTML = "Subtask 2"

                }

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].timestamp
                    //result[i].f1_score

                cell5 = newRow.insertCell(4)
                cell5.innerHTML = result[i].submission_name

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = result[i].f1_score


            }


        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}

function leaderboard_2ICHCL() {
    var elements = document.cookie.split('=')

    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    document.getElementById("Tname").innerHTML = "Subtask 2"

    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "task_name": "2_ICHCL"
        }),
        success: function(result) {

            console.log(result);
            for (var i = 0; i < result.length; i++) {

                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = (i + 1)


                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].team_name

                cell3 = newRow.insertCell(2)
                cell3 = newRow.insertCell(2)
                if (result[i].task_name == "1A_English") {
                    cell3.innerHTML = "English Subtask A"

                }
                if (result[i].task_name == "1B_English") {
                    cell3.innerHTML = "English Subtask B"

                }
                if (result[i].task_name == "1A_Hindi") {
                    cell3.innerHTML = "Hindi Subtask A"

                }
                if (result[i].task_name == "1B_Hindi") {
                    cell3.innerHTML = "Hindi Subtask B"

                }
                if (result[i].task_name == "1A_Marathi") {
                    cell3.innerHTML = "Marathi Subtask A"

                }
                if (result[i].task_name == "2_ICHCL") {
                    cell3.innerHTML = "Subtask 2"

                }

                cell4 = newRow.insertCell(3)
                cell4.innerHTML = result[i].timestamp
                    //result[i].f1_score

                cell5 = newRow.insertCell(4)
                cell5.innerHTML = result[i].submission_name

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = result[i].f1_score




            }


        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}
*/

function leaderboard_table() {
    document.getElementById("zero_submission_div").setAttribute("hidden", true)
    console.log('hello')
        //var elements = document.cookie.split('=')
    console.log(elements)
    const urlParams = new URLSearchParams(window.location.search);
    task_name = urlParams.get('subtask_name')
    if (task_name == null) {
        var task_name = document.getElementById("leaderboard_task").value
    } else {
        var selectionIndex = {
            "1A_English": 0,
            "1B_English": 1,
            "1A_Hindi": 2,
            "1B_Hindi": 3,
            "1A_Marathi": 4,
            "2_ICHCL": 5
        }
        document.getElementById("leaderboard_task").selectedIndex = selectionIndex[task_name]
    }
    window.history.pushState({}, document.title, "" + "Leader_Board.html");
    var leaderboard_table = document.getElementById('leaderboard_table_body')
    var tab = ``
    var elements = document.cookie.split('=')
    elem = JSON.parse(elements[1])
    elements = elem.token
    document.getElementById("navbarDropdownMenuLink").innerHTML = `Welcome ${elem.user}`
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/leaderboard",
        headers: {
            "x-access-token": elements,
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "task_name": task_name
        }),
        success: function(result) {
            if (result.length <= 2) {
                document.getElementById("footer_div").classList.add("position-fixed")
            }
            if (result.length >= 2) {
                console.log('imin')
                if (document.getElementsByClassName('footer position-fixed bg-dark').length > 0) {
                    document.getElementById("footer_div").classList.remove("position-fixed")
                    console.log("in fixed")
                }
            }
            console.log(result);
            var task_titles = {
                "1A_English": "English Subtask A",
                "1B_English": "English Subtask B",
                "1A_Hindi": "Hindi Subtask A",
                "1B_Hindi": "Hindi Subtask B",
                "1A_Marathi": "Marathi Subtask A",
                "2_ICHCL": "Subtask 2"
            }
            for (var i = 0; i < result.length; i++) {
                if (result[i].team_name == elem.user) {
                    tab += `<tr class="bg-info h5 text-white">
                    <td class="text-center align-middle"><h4>${i+1}</h4></td>
                    <td class="text-center align-middle">${result[i].team_name}</td>
                    <td class="text-center align-middle">${task_titles[result[i].task_name]}</td>
                    <td class="text-center align-middle">${result[i].timestamp}</td>
                    <td class="text-center align-middle">${result[i].f1_score}</td>
                    <td class="text-center align-middle">${result[i].submission_count}/5</td>
                </tr>`
                } else {
                    tab += `<tr>
                        <td class="text-center align-middle"><h4>${i+1}</h4></td>
                        <td class="text-center align-middle">${result[i].team_name}</td>
                        <td class="text-center align-middle">${task_titles[result[i].task_name]}</td>
                        <td class="text-center align-middle">${result[i].timestamp}</td>
                        <td class="text-center align-middle">${result[i].f1_score}</td>
                        <td class="text-center align-middle">${result[i].submission_count}/5</td>
                    </tr>`
                }
                leaderboard_table.innerHTML = tab
                document.getElementById("body_content").removeAttribute("hidden")
                document.getElementById("loading").setAttribute("hidden", true)
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
            if (jqXHR.status == 404) {
                document.getElementById("body_content").setAttribute("hidden", true)
                document.getElementById("zero_submission_div").removeAttribute("hidden");
                document.getElementById("loading").setAttribute("hidden", true);
            }
        }
    });
}