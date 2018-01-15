(function() {
    "use strict";
    const $$index$$url = "https://api.tryst-iitd.com";

    function $$index$$updateUser() {
        console.log("this")
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
                        sessionStorage.setItem("authUser", JSON.stringify(dta))
                    }
                }
            }
        }
        xh.send()
    }

    var app$utils$eventsList$1$$events = {}
    var app$utils$eventsList$1$$arrKey = [];
    // console.log("hi")
    let app$utils$eventsList$1$$xhr = new XMLHttpRequest();

    app$utils$eventsList$1$$xhr.open("GET", $$index$$url+"/api/event/getCategories", true);
    app$utils$eventsList$1$$xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    app$utils$eventsList$1$$xhr.onreadystatechange = function () {
        if (app$utils$eventsList$1$$xhr.readyState === 4){
            // console.log(xhr.responseText)
            if (app$utils$eventsList$1$$xhr.status === 200) {
                var json = JSON.parse(app$utils$eventsList$1$$xhr.responseText);
                app$utils$eventsList$1$$events = json.data;              //this can be different
                var i = 0;
                var eve = ''
                app$utils$eventsList$1$$arrKey = Object.keys(app$utils$eventsList$1$$events)
                // console.log(arrKey);
                for (var x in app$utils$eventsList$1$$arrKey) {
                    $("#row").append(
                      '<div class="col-md-4 col-sm-6 col-xs-12 category-block  animatedParent animateOnce" data-appear-top-offset="-200">'+
                        '<div class="container">'+
                          '<img src='+'images/'+app$utils$eventsList$1$$arrKey[x]+'.png'+' class="img-responsive img-circle oneeighty mx-auto category-img" alt="">'+
                          '<button class="overlay" id='+app$utils$eventsList$1$$arrKey[x]+'>'+app$utils$eventsList$1$$arrKey[x].toUpperCase()+'</button>'+
                          '<h4>'+app$utils$eventsList$1$$arrKey[x].toUpperCase()+'</h4>'+
                          '<div class="description-block mx-auto container-fluid">'+
                            '<div class="row" id="eveList"></div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'
                    );
                }

                function onClick(e) {
                  var opened = $(".description-block").hasClass("active");
                  if( opened ){
                    // console.log("__opened");
                    $("#eveList").empty();
                  }
                    var eveList = app$utils$eventsList$1$$events[e.target.id]
                    let str = ''
                    for (var x in eveList) {

                      if (eveList[x].name != "bogus")
                        $("#eveList").append(
                          '<div class="col-md-4 col-sm-6 col-xs-12 event-container">'+
                          '<img src='+'"../images/'+eveList[x].name+'.png"'+' class="img-responsive event-img">'+
                          '<p class="mx-auto">'+
                            '<a href=../specifEvent.html?'+eveList[x].id+'>'+eveList[x].name+'</a>'+
                          '</p>'+
                          '</div>'
                        );
                    }
                    $("#eveList").toggleClass("show");
                }



                var eventsButton = document.getElementsByClassName('category-block');
                var x = 0;
                // console.log(eventsButton);
                while (x < eventsButton.length) {

                    $(".category-block").click(function(){
                      // console.log("clicked");
                      $(".description-block").toggleClass("active");
                    });
                    eventsButton[x].addEventListener('click', onClick);
                    x++;
                }
            }
        }
    }
    app$utils$eventsList$1$$xhr.send();
}).call(this);