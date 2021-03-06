
import { updateUser } from "./index.js";

updateUser(false)

// Set the date we're counting down to
var countDownDate = new Date("Feb 23, 2018 18:45:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("date").innerHTML = "<b>"+days+"</b>" + " day"+((days==1)?"":"s")+ " " + "<b>"+hours+"</b>" + " hour"+((hours==1)?" ":"s ")
    + "<b>"+minutes+"</b>" + " min"+((minutes==1)?" ":"s ") + "<b>"+seconds+"</b>" + " s remaining";
    // console.log("hello"+1)
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("date").innerHTML = "To Infinity and Beyond";
    }
}, 1000);