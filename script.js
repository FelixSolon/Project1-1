var HoneyGuy = ("male");
var HoneyGal = ("female");
var HoneySingle = ("male or female");

var body = document.body;

$(document).ready(function(){
    // container for intro
    var introContainer = document.createElement('div');
    $(introContainer).attr('id', 'intro-container');
    // add css class for container
    $(introContainer).addClass("");
    // This is for the intro paragraph
    var introP = document.createElement('p');
    $(introP).attr('id', "intro");
    // Add the css class here
    $(introP).addClass("");
    // This is for the start button
    var startBtn = document.createElement('button');
    $(startBtn).attr('id', "start");
    introP.innerHTML = "This application allows you to randomly generate a restaurant in your area when you are having a hard time choosing where to eat." + "<br/>" + "To use this app, enter your zip code on the next page and answer the following questions.";
    // Add the style class for the button to the anchor tag
    startBtn.innerHTML = `<a>START</a>`;
    body.append(introContainer);
    introContainer.appendChild(introP);
    introContainer.appendChild(startBtn);
    // This function will hide the intro so we can display new info
    function hideIntro() {
        $(introContainer).hide();
    }
    $(startBtn).on('click', function () {
        hideIntro();
    });

});