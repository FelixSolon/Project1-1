var HoneyGuy = ("male");
var HoneyGal = ("female");
var HoneySingle = ("male or female");

var body = document.body;

$(document).ready(function(){
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
    body.append(introP);
    body.append(startBtn);
    function hideIntro() {
        $(introP).hide();
        $(startBtn).hide();
    }
    $(startBtn).on('click', function () {
        hideIntro();
    });
});