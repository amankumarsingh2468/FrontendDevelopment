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
                        let userReg = dta.registration
                        // console.log(dta)
                        let uDict = {}
                        for (var x in userReg) {
                            uDict[userReg[x].event_id] = userReg[x].reg_id
                        }
                        // console.log(uDict)
                        sessionStorage.setItem("useReg", JSON.stringify(uDict))
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





    $$index$$updateUser(false);



    let app$utils$guestLec$$useReg = (sessionStorage.getItem("authUser"))?JSON.parse(sessionStorage.getItem("useReg")):{}
    let app$utils$guestLec$$email = (sessionStorage.getItem("authUser"))?JSON.parse(sessionStorage.getItem("authUser")).email:{}
    // console.log(useReg)

    function app$utils$guestLec$$buttonCtrl(e, str) {
        let tar = e.target.id
        tar = tar.slice(4)
        if (str == "v") {
            tar = e.target.value
        }
        e.target.innerText = 'Loading'
        let xh = new XMLHttpRequest()
        if ((sessionStorage.getItem("authUser"))) {
            if (tar in app$utils$guestLec$$useReg) {
                // console.log(useReg[tar], "here")
                xh.open("POST", $$index$$url+"/api/register/delete/"+app$utils$guestLec$$useReg[tar], true)
                xh.setRequestHeader("Content-type", "application/json");
                xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                xh.onreadystatechange = function () {
                    // console.log('load')
                    if (xh.readyState === 4) {
                        // console.log(xh.responseText)
                        if (xh.status === 200) {
                            delete app$utils$guestLec$$useReg[tar]
                            sessionStorage.setItem("useReg", JSON.stringify(app$utils$guestLec$$useReg))
                            e.target.innerText = 'Register'
                            if (str=='v') {document.getElementById('info'+tar).innerText = 'Register'; document.getElementById('info'+tar).classList.toggle('reg')}
                            e.target.classList.toggle('reg')
                        }
                    }
                }
                xh.send()
            } else {
                xh.open("POST", $$index$$url+"/api/register/register", true)
                xh.setRequestHeader("Content-type", "application/json");
                xh.setRequestHeader("x-auth-token", sessionStorage.getItem("token"))
                xh.onreadystatechange = function () {
                    if (xh.readyState === 4) {
                        // console.log(xh.responseText)
                        let data = JSON.parse(xh.responseText).data
                        if (xh.status === 200) {
                            app$utils$guestLec$$useReg[tar] = data.reg_id
                            sessionStorage.setItem("useReg", JSON.stringify(app$utils$guestLec$$useReg))
                            e.target.innerText = 'Delete'
                            if (str=='v') {document.getElementById('info'+tar).innerText = 'Delete'; document.getElementById('info'+tar).classList.toggle('reg')}
                            e.target.classList.toggle('reg')
                        }
                    }
                }
                // console.log(tar)
                var send = (Object.assign({}, {"event_id": tar, "members": [{"email":app$utils$guestLec$$email}], "team_name": "", "source": "", "remark":""}))
                // console.log(send)
                xh.send(JSON.stringify(send))
            }
        } else {
            document.location.href = "../login.html"      
        }
    }

    let app$utils$guestLec$$xhr = new XMLHttpRequest();
    app$utils$guestLec$$xhr.open("GET", $$index$$url + "/api/event/getCategories", true);
    app$utils$guestLec$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // console.log(sessionStorage.getItem('useReg'))
    app$utils$guestLec$$xhr.onreadystatechange = function () {
        if (app$utils$guestLec$$xhr.readyState === 4) {
            if (app$utils$guestLec$$xhr.status === 200) {
                let json = JSON.parse(app$utils$guestLec$$xhr.responseText)
                let guestLecs = json.data.guest
                // console.log(guestLecs)
                $('#guests').append(            
                    '<div class="row">'
                )
                let guestDict = {}
                for (var y in guestLecs) {
                    guestDict[guestLecs[y].id] = guestLecs[y]
                }
                // console.log(guestDict)
                for (var x in guestLecs) {
                    $('#guests').append(          
                        '<div class="col-md-3 col-sm-6 guestElement">'+
                        '<div class="fixed"><img src="'+$$index$$linkExtract(guestLecs[x].photos[0])+'" class="event-img"></div>'+
                        '<p id="'+guestLecs[x].id+'" class="nameBut">' + guestLecs[x].name + '</p>' + 
                        // '<p class="desc">' + guestLecs[x].description + '</p>' +
                        '<button id="info'+guestLecs[x].id+'" class="regisGuest '+((guestLecs[x].id in app$utils$guestLec$$useReg)?'reg':'')+'">'+ ((guestLecs[x].id in app$utils$guestLec$$useReg)?'Delete':'Register') + '</button>'+
                        // '<button id="'+guestLecs[x].id+'" value="'+guestLecs[x].id+'" class="fa fa-info-circle no_margin"></button>'+
                        '</div>'
                    )
                    if (x%4==3) {
                        $('#guests').append(
                            '</div>'+
                            '<div class="row">'
                        )
                    }

                    document.getElementById(guestLecs[x].id).addEventListener('click', function(e) {
                        let xr = new XMLHttpRequest();
                        xr.open("GET", $$index$$url+"/api/event/view/"+e.target.id, true);
                        xr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xr.onreadystatechange = function () {
                            if (xr.readyState === 4){
                                if (xr.status === 200) { 
                                    document.getElementById('popup').hidden = false
                                    // document.getElementById('guests').classList.toggle('noscroll')
                                    let tarLec = JSON.parse(xr.responseText).data
                                    let cont = ''
                                    if (tarLec.dtv.length >0) {
                                        for (var y in tarLec.dtv) {
                                            let keyCont = Object.keys(tarLec.dtv[y])
                                            for (var x in keyCont) {
                                                cont += keyCont[x] + ': '+tarLec.dtv[y][keyCont[x]]
                                                cont += '<br>'
                                            }
                                        }
                                    }
                                    $('#fill').html(
                                        '<div class="col-md-8 col-sm-12 col-xs-12">'+
                                        '<p>'+tarLec.description+'</p>'+
                                            '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                                '<button id="lea'+tarLec.id+'" value="'+tarLec.id+'" class="regisGuest '+((tarLec.id in app$utils$guestLec$$useReg)?'reg':'')+'">'+ ((tarLec.id in app$utils$guestLec$$useReg)?'Delete':'Register') + '</button>'+
                                            '</div>'+
                                            '<div class="col-md-6 col-sm-12 col-xs-12">'+
                                                '<p>'+cont+'</p>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="col-md-4 col-sm-12 col-xs-12 lec-img">' +
                                        '<div class="fixed"><img src="'+$$index$$linkExtract(tarLec.photos[0])+'" id="pho'+tarLec.id+'" class="event-img"></div>'+
                                        '</div>'
                                    )
                                    
                                    document.getElementById('lea'+tarLec.id).addEventListener('click', function(e) {
                                        app$utils$guestLec$$buttonCtrl(e, "v")
                                    })
                
                                    document.getElementById('pho'+tarLec.id).onload = function () {
                                        // console.log(this.parentNode)
                                        this.parentNode.style.backgroundImage = "none"
                                    }
                                }
                            }
                        }
                        xr.send()
                    })

                    document.getElementById('info'+guestLecs[x].id).addEventListener('click', function(e) {
                        app$utils$guestLec$$buttonCtrl(e, "i")
                    })
                }
                $('#guests').append(            
                    '<div>'
                )
                document.getElementById('cloBut').addEventListener('click', function(){
                    document.getElementById('popup').hidden = true
                    // document.getElementById('guests').classList.toggle('noscroll')
                })
                var images = Array.prototype.slice.call(document.getElementsByClassName('event-img'), 0)
                for (var x in images) {
                  images[x].onload = function () {
                    this.parentNode.style.backgroundImage = "none"
                  }
                }
            }
        }
    }
    app$utils$guestLec$$xhr.send();
}).call(this);