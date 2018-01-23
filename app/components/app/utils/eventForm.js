(function() {
    "use strict";
    const $$index$$url = "https://api.tryst-iitd.com";

    function $$index$$updateUser(rel) {
        // console.log("this")
        var xh = new XMLHttpRequest();
        xh.open("GET", $$index$$url+"/api/user/view", true);
        xh.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
        xh.onreadystatechange = function () {
            if (xh.readyState === 4){
                if (xh.status === 200) {
                    var jon = JSON.parse(xh.responseText);
                    var dta = jon.data;
                    // console.log(xhr.responseText)
                    if (jon.error == false) {
                        // console.log(dta)
                        // console.log("this hap")
                        sessionStorage.setItem("authUser", JSON.stringify(dta))
                        if (rel) {
                            document.location.reload(true)
                        }
                    }
                }
            }
        }
        xh.send()
    }

    function $$index$$linkExtract(str) {
        let arr = str.split('=')
        // console.log(arr[1])
        return 'https://drive.google.com/uc?id='+arr[1]+'&export=view'
    }

    var app$utils$eventForm$$send = {}


    // var mode = document.getElementById('reg_mode')
    // mode.addEventListener('click', function() {
    //     for (var x in mode.children) {
    //         if (x<mode.children.length) {
    //             if (mode.children[x].checked) {

    //             }
    //         }
    //     }
    // })

    document.getElementById('cat').addEventListener('change', function() {
        if (document.getElementById('c2').checked) {
            document.getElementById('depName').hidden = false
        } else {
            document.getElementById('depName').hidden = true
        }
    });

    document.getElementById('reg_type').addEventListener('change', function() {
        if (document.getElementById('mo2').checked) {
            document.getElementById('team').hidden = false
        } else {
            document.getElementById('team').hidden = true
        }
    });

    document.getElementById('reg_mode').addEventListener('change', function() {
        if (document.getElementById('ty2').checked) {
            document.getElementById('t3').hidden = false
            document.getElementById('t4').hidden = true
        } else if (document.getElementById('ty3').checked){
            document.getElementById('t3').hidden = true
            document.getElementById('t4').hidden = false
        } else {
            document.getElementById('t3').hidden = true
            document.getElementById('t4').hidden = true
        }
    });
    // document.getElementById('dead').addEventListener('change')

    document.getElementById('launch').addEventListener('click', function() {
        let radios = document.getElementsByClassName('radioset')
        radios = (Array.prototype.slice.call( radios, 0 ))
        radios.map(t => {
                for (var x in t.children) {
                    if (x<t.children.length) {
                        if (t.children[x].checked) {
                            app$utils$eventForm$$send = Object.assign(app$utils$eventForm$$send, {[t.children[x].name]:t.children[x].value})
                            if ([t.children[x].name] == "category"){
                                if (t.children[x].value == "department") {
                                    app$utils$eventForm$$send = Object.assign(app$utils$eventForm$$send, {"category_name":document.getElementById('depName').value})
                                } else {
                                    app$utils$eventForm$$send = Object.assign(app$utils$eventForm$$send, {"category_name":t.children[x].value})
                                }
                            }
                        }
                    }
                }
        })
        for (var x=1; x<=8; x++) {
            var targ = document.getElementById('t'+x)
            app$utils$eventForm$$send = Object.assign(app$utils$eventForm$$send, {[targ.name]:targ.value})
        }

        var pocInfo = Array.prototype.slice.call(document.getElementById('poc').children, 0)
        var poc = {}
        for (var n in pocInfo) {
            if (pocInfo[n].name) {
                poc = Object.assign(poc, {[pocInfo[n].name]:pocInfo[n].value})
                // console.log(pocInfo[n])
            }
        }
        app$utils$eventForm$$send = Object.assign(app$utils$eventForm$$send, {"poc":[poc]})

        app$utils$eventForm$$send = Object.assign(app$utils$eventForm$$send, {"photos":[document.getElementById('phot').value]})
        app$utils$eventForm$$send = Object.assign(app$utils$eventForm$$send, {"reg_deadline":(new Date(Date.parse(document.getElementById('dead').value)).toISOString())})
        app$utils$eventForm$$send = Object.assign(app$utils$eventForm$$send, {"registration": true, "reg_status": true, "subheading":"", "dtv":[]})
        console.log(app$utils$eventForm$$send)
        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", url+"/api/user/login", true);
        // xhr.setRequestHeader("Content-type", "application/json");
        // document.getElementById('message').innerHTML = ('loading...')
        // xhr.onreadystatechange = function () {
        //     var json = JSON.parse(xhr.responseText);
        // 	document.getElementById('message').innerHTML = xhr.responseText
        // 	// console.log(xhr.responseText + " " + xhr.status, "response");
        //     if (xhr.readyState === 4){
        // 		if (xhr.status === 200) {
        // 			document.getElementById('message').innerHTML = ('email and password checked')		
        // 			var data = json.data;
                    // console.log(json.error == false)
                    // if (json.error == false) {
                        // sessionStorage.setItem("token", data.token);
                        console.log("login")
                        var xt = new XMLHttpRequest();
                        xt.open("POST", $$index$$url+"/api/event/create", true)
                        xt.setRequestHeader("Content-type", "application/json")
                        xt.setRequestHeader("x-auth-token", sessionStorage.getItem('token'))
                        xt.onreadystatechange = function() {
                            if (xt.readyState === 4) {
                                if (xt.status === 200) {
                                    let res = JSON.parse(xt.responseText)
                                    document.getElementById('message').innerHTML = ('Cool' + res.message + 'id: ' + res.data.id + 'Name: ' + res.data.name)
                                } else {
                                    document.getElementById('message').innerHTML = ('some problem has occured')
                                }
                            }
                        }
                        console.log(({"event":app$utils$eventForm$$send}))
                        xt.send(JSON.stringify({"event":app$utils$eventForm$$send}))
                    
        //         }
        //     }
        // }
        // console.log(JSON.stringify({"email":document.getElementById('em').value, "password":document.getElementById('pa').value}))
        // xhr.send(JSON.stringify({"email":document.getElementById('em').value, "password":document.getElementById('pa').value}))

    });
}).call(this);