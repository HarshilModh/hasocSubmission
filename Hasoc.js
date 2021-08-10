function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function check_token() {
    //var authtoken = document.cookie
    //console.log(authtoken);
    if (getCookie('token') == null || getCookie('user') == null) {
        console.log("Inside Null");
        window.location = 'Login.html';
    } else {
        team_data_new()
    }
}


/*function set_task(td) {
    selectedRow = td.parentElement.parentElement;
    var task = selectedRow.cells[2].innerHTML
    localStorage.setItem("tn", task)
    console.log(task);
    if (task == "English Subtask A") {
        task = "1A_English"
    }
    if (task == "English Subtask B") {
        task = "1B_English"
    }
    if (task == "Hindi Subtask A") {
        task = "1A_Hindi"
    }
    if (task == "Hindi Subtask B") {
        task = "1B_Hindi"
    }
    if (task == "Marathi Subtask A") {
        task = "1A_Marathi"
    }
    if (task == "Subtask 2") {
        task = "2_ICHCL"
    }
    console.log(task);
    localStorage.setItem("task_name", task)
}

function setlang(str) {
    console.log(str);
    localStorage.setItem("Lang", str)
}
*/
async function submission() {
    const url = "https://hasocsubmission.el.r.appspot.com/dashboard/submission";
    let submission_name = `<input type=text id="Subname" class="swal2-input mb-2" placeholder="Please enter your submission name" style="width:70%;" maxlength="40"></input>`
    let desc = `<textarea id="Desc" placeholder="Please enter your description" class="swal2-input mb-2" style="width:70%;height:30%" maxlength="150"></textarea>`
    let select_box_html = `<select id="subtask_name" class="swal2-input" style="width:70%;">
    <option value="1A_English">English Subtask A</option>
    <option value="1A_Marathi">Marathi Subtask A</option>
    <option value="1B_English">English Subtask B</option>
    <option value="1A_Hindi">Hindi Subtask A</option>
    <option value="1B_Hindi">Hindi Subtask B</option>
    <option value="2_ICHCL">Subtask 2</option></select>`
    Swal.fire({
        html: `${select_box_html}${submission_name}${desc}<input type="file" id="file" placeholder="Submission File">`,
        confirmButtonText: 'SUBMIT',
        focusConfirm: false,
        customClass: 'swal-height-submission',
        preConfirm: () => {
            Swal.showLoading()
                //var elements = document.cookie.split('=')
                //elem = JSON.parse(elements[1])
                //elements = elem.token
            var team_name = getCookie('user')
            if (team_name == null) {
                window.location = "Login.html"
            }
            var des = document.getElementById("Desc").value
            var input = document.getElementById("file");
            var ex = document.getElementById("file").value;
            ex = ex.split('.').pop()
            if (ex != "csv") {
                Swal.fire({
                    icon: 'warning',
                    title: 'CSV files only',
                })
            }
            var sel = document.getElementById("subtask_name")
            var subname = document.getElementById("Subname").value
            if (subname.length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Please Enter submission name',
                })
            }
            var opt = sel.options[sel.selectedIndex];
            var tasks_name = opt.value;
            console.log(tasks_name);
            var elements = document.cookie.split('=')
            elem = JSON.parse(elements[1])
            elements = elem.token
            if (input.files && input.files[0]) {
                const formData = new FormData();
                formData.append('file', input.files[0])
                formData.append('task_name', tasks_name);
                formData.append('team_name', team_name);
                formData.append('description', des);
                formData.append('submission_name', subname)
                console.log(input.files)
                return fetch(url, {
                        method: 'post',
                        body: formData,
                        headers: {
                            "x-access-token": getCookie('token')
                        }
                    })
                    .then(response => {
                        console.log(response.status)
                        if (response.status == 401) {
                            window.location = "Login.html"
                        }
                        if (response.status != 200) {
                            throw new Error(response.status)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        console.log(error);
                        if (error == 'Error: 408') {
                            Swal.showValidationMessage(
                                `Request failed: maximum submission exceeded`
                            )
                        }
                        if (error == 'Error: 406') {
                            Swal.showValidationMessage(
                                `Request failed: missinng tweet id or unknown id found`
                            )
                        }
                        if (error == 'Error: 405') {
                            Swal.showValidationMessage(
                                `Request failed: unknown or empty labels found`
                            )
                        }
                        if (error == 'Error: 403') {
                            Swal.showValidationMessage(
                                `Request failed: wrong columns`
                            )
                        }
                        if (error == 'Error: 409') {
                            console.log("In 409");
                            Swal.showValidationMessage(
                                `Request failed: can't use same submission name for multiple submissions`
                            )
                        }
                    })
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Success! &#x1F60A',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            })
            team_data_new();
        }
    })
}

/*function team_data() {
    document.getElementById("Sorts").innerHTML = "Sort by timestamp descending"
    var elements = document.cookie.split('=')
    var team = localStorage.getItem("User")
    console.log(team);

    document.getElementById("navbarDropdownMenuLink").innerHTML = `Welcome ${team}`
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/timestamp_desc",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team
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
                cell1.innerHTML = result[i].timestamp
                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name
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
                cell4.innerHTML = result[i].f1_score
                cell5 = newRow.insertCell(4)
                var data = '<td><button class="btn btn-info" onclick="deatils(this)" data-toggle="modal" data-target="#myModal3"  >Deatils</button></td>'
                cell5.innerHTML = data
                cell6 = newRow.insertCell(5)
                cell6.innerHTML = ' <td><button class="btn btn-info" onclick="set_task(this)"><a href="Leader_Board.html" style="text-decoration: none; color: white; ">Rank</a> </button></td>'
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                console.log(jqXHR.status);

                //  document.getElementById("Sort").innerHTML=""
                //document.getElementById("Guide").innerHTML=""
                document.getElementById("team_data").innerHTML = "Button"

            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}*/

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
    var elements = document.cookie.split('=')
    elem = JSON.parse(elements[1])
    elements = elem.token
    var team = elem.user
    var password = document.getElementById("Password").value
    var new_password = document.getElementById("NewPassword").value
    var confirm_passowrd = document.getElementById("ConfirmPassword").value
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
                    title: 'Password Changed Successfully'
                })
                logout()
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

/*function team_data_f1_asc() {
    // var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
    // for(var i=0;i<table.length;i++){
    //     console.log(i);
    // }
    document.getElementById("Sorts").innerHTML = "Sort by f1 score ascending"
    var elements = document.cookie.split('=')
        //console.log(elements[1]);
    var team = localStorage.getItem("User")
    console.log(team);
    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/f1_asc",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team
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
                cell1.innerHTML = result[i].timestamp

                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name

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
                cell4.innerHTML = result[i].f1_score

                cell5 = newRow.insertCell(4)
                var data = '<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML = data

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = ' <td><button class="btn btn-info" onclick="set_task(this)"><a href="Leader_Board.html" style="text-decoration: none; color: white; ">Rank</a> </button></td>'

            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}

function team_data_f1_desc() {
    document.getElementById("Sorts").innerHTML = "Sort by f1 score descending"

    var elements = document.cookie.split('=')

    var team = localStorage.getItem("User")
    console.log(team);
    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({


        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/f1_desc",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team
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
                cell1.innerHTML = result[i].timestamp

                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name

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
                cell4.innerHTML = result[i].f1_score

                cell5 = newRow.insertCell(4)
                var data = '<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML = data

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = ' <td><button class="btn btn-info" onclick="set_task(this)"><a href="Leader_Board.html" style="text-decoration: none; color: white; ">Rank</a> </button></td>'

            }

            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);


            //alert( document.cookie)

        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}

function team_data_timestamp_asc() {
    document.getElementById("Sorts").innerHTML = "Sort by timestamp ascending"

    var elements = document.cookie.split('=')

    var team = localStorage.getItem("User")
    console.log(team);
    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/timestamp_asc",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team
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
                cell1.innerHTML = result[i].timestamp

                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name

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
                cell4.innerHTML = result[i].f1_score

                cell5 = newRow.insertCell(4)
                var data = '<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML = data

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = ' <td><button class="btn btn-info" onclick="set_task(this)"><a href="Leader_Board.html" style="text-decoration: none; color: white; ">Rank</a> </button></td>'

            }

            // var res=result[1].description;
            // console.log(result[1].description);
            // console.log(result[1].task_name);
            // console.log(result[1].f1_score);
            // console.log(result[1].submission_name);


            //alert( document.cookie)

        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}

function team_data_timestamp_desc() {
    document.getElementById("Sorts").innerHTML = "Sort by timestamp descending"
    var elements = document.cookie.split('=')
    var team = localStorage.getItem("User")
    console.log(team);
    var raw = document.getElementsByTagName("tbody")[0]
    raw.parentNode.removeChild(raw)
    var x = document.createElement("tbody")
    document.getElementById("team_data").appendChild(x)
    $.ajax({
        type: 'POST',
        url: "https://hasocsubmission.el.r.appspot.com/dashboard/team_data/timestamp_desc",
        headers: {
            "x-access-token": elements[1],
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": team
        }),
        success: function(result) {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var table = document.getElementById("team_data").getElementsByTagName('tbody')[0]
                var newRow = table.insertRow(table.length)
                cell1 = newRow.insertCell(0)
                cell1.innerHTML = result[i].timestamp

                cell2 = newRow.insertCell(1)
                cell2.innerHTML = result[i].submission_name

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
                cell4.innerHTML = result[i].f1_score

                cell5 = newRow.insertCell(4)
                var data = '<td><button class="btn btn-info" data-toggle="modal" data-target="#myModal3" >Deatils</button></td>'
                cell5.innerHTML = data

                cell6 = newRow.insertCell(5)
                cell6.innerHTML = '<td><button class="btn btn-info" onclick="set_task(this)"><a href="Leader_Board.html" style="text-decoration: none; color: white; ">Rank</a> </button></td>'

            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}*/

async function team_data_new() {
    var sort_param = "timestamp_desc";
    sort_param = document.getElementById("sort_param").value;
    console.log(sort_param)
        //document.getElementById("Sorts").innerHTML = "Sort by timestamp descending"
        //var elements = document.cookie.split('=')
        //elem = JSON.parse(elements[1])
        //elements = elem.token
        //console.log(elem)
        //var team = elem.user
        //console.log(team)
        //console.log(team);
    document.getElementById("navbarDropdownMenuLink").innerHTML = `Welcome ${getCookie('user')}`
    $.ajax({
        type: 'POST',
        url: `https://hasocsubmission.el.r.appspot.com/dashboard/team_data/${sort_param}`,
        headers: {
            "x-access-token": getCookie('token'),
            'content-type': 'application/json'
        },
        data: JSON.stringify({
            "team_name": getCookie('user')
        }),
        success: function(result) {
            console.log(result);
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
            var table_body = document.getElementById("team_data_table_body")
            var tab = ``;
            var task_titles = {
                "1A_English": "English Subtask A",
                "1B_English": "English Subtask B",
                "1A_Hindi": "Hindi Subtask A",
                "1B_Hindi": "Hindi Subtask B",
                "1A_Marathi": "Marathi Subtask A",
                "2_ICHCL": "Subtask 2"
            }
            for (var i = 0; i < result.length; i++) {
                tab += `<tr class="text-center">
                    <td class="text-left align-middle">${result[i].timestamp}</td>
                    <td class="text-center align-middle">${result[i].submission_name}</td>
                    <td class="text-center align-middle">${task_titles[result[i].task_name]}</td>
                    <td class="text-center align-middle">${result[i].f1_score}</td>
                    <td class="text-center align-middle"><button class="btn btn-outline-info" onclick="details(this.fun)" value="${result[i].timestamp+'$$$'+result[i].submission_name+'$$$'+task_titles[result[i].task_name]+'$$$'+result[i].f1_score+'$$$'+result[i].accuracy+'$$$'+result[i].description+'$$$'+result[i].confusion}"  name="details" data-toggle="modal" data-target="#myModal3">Details</button></td>
                    <td class="text-center align-middle"> <button class="btn btn-outline-info" onclick="location.href='Leader_Board.html?subtask_name=${result[i].task_name}'"><i class="fas fa-walking"></i></a> </button></td>
                </tr>`
                table_body.innerHTML = tab + `<div class="mb-3"></div>`;
                document.getElementById("loading").setAttribute("hidden", true);
                document.getElementById("zero_submission_div").setAttribute("hidden", true);
                document.getElementById("body_content").removeAttribute("hidden");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                document.getElementById("loading").setAttribute("hidden", true);
                document.getElementById("zero_submission_div").removeAttribute("hidden");
            }
            if (jqXHR.status == 401) {
                window.location = "Login.html"
            }
        }
    });
}