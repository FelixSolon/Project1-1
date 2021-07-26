var HoneyGuy = ("male");
var HoneyGal = ("female");
var HoneySingle = ("male or female");

var body = document.body;

$(document).ready(function(){
    // container for intro
    var introContainer = document.createElement('div');
    $(introContainer).attr('id', 'intro-container');
    // add css class for container
    $(introContainer).addClass("introStyle");

    // This is for the intro paragraph
    var introP = document.createElement('p');
    $(introP).attr('id', "intro");
    // Add the css class here
    $(introP).addClass("");
    // This is for the start button
    var startBtn = document.createElement('button');
    $(startBtn).attr('id', "start");
    $(startBtn).addClass('button is-info');
    introP.innerHTML = "This application allows you to randomly generate a restaurant in your area when you are having a hard time choosing where to eat." + "<br/>" + "To use this app, enter your zip code on the next page and answer the following questions.";
    // Add the style class for the button to the anchor tag
    startBtn.innerHTML = 'START';
    // Adds elements to HTML
    body.append(introContainer);
    introContainer.appendChild(introP);
    introContainer.appendChild(startBtn);
    // This function will hide the intro so we can display new info
    function hideIntro() {
        $(introContainer).hide();
    }

    // This is the container for the zip code info
    var zipContainer = document.createElement('div');
    $(zipContainer).attr('id', "zip-container");
    // Add the container class for css here
    $(zipContainer).attr("");
    // This is the zip code p
    var zipP = document.createElement('p');
    $(zipP).attr('id', "zip-text");
    // Add css class here
    $(zipP).addClass("");
    zipP.innerText = "Please enter your ZIP CODE.";
    // This is for the text input field for the zip code
    var zipInput = document.createElement('textarea');
    $(zipInput).attr('id', "zip-input");
    // Add css class for input box
    $(zipInput).addClass("");
    // This is for the zip code submit button
    var submitBtn = document.createElement('button');
    $(submitBtn).attr('id', "zip-button");
    // Add css class like START button
    submitBtn.innerHTML = `<a>SUBMIT</a>`
    // Add elements to HTML
    body.append(zipContainer);
    zipContainer.appendChild(zipP);
    zipContainer.appendChild(zipInput);
    zipContainer.appendChild(submitBtn);
    function hideZip() {
        $(zipContainer).hide();
    }
    function showZip() {
        $(zipContainer).show()
    }
    $(startBtn).on('click', function () {
        hideIntro();
        showZip();
    });
    // Hide Zip until Start Button clicked to call showZip function
    hideZip();
});