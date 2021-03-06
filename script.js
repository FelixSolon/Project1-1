var body = document.body;

// This is to display questions and answer buttons
var questionContainer = document.createElement('div');
$(questionContainer).attr('id', "question-container");
// Add css class for question container here
$(questionContainer).addClass("");
var question = document.createElement('p');
$(question).attr('id', "question");
// Add css class for question text here
$(question).addClass("");
var answers = document.createElement('div');
$(answers).attr('id', "sine");
// Add css class for question container here
$(answers).addClass("");
$(question).text("What are you in the mood for?");
body.append(questionContainer);
questionContainer.appendChild(question);
questionContainer.appendChild(answers);

// This is for the generated restuarant to be displayed
var displayContainer = document.createElement('div');
$(displayContainer).attr('id', "display-container");
// Add css class for display container
$(displayContainer).addClass("");
var displayRestaurant = document.createElement('p');
$(displayRestaurant).attr('id', "restaurant-name");
// Add css class for restaurant name
$(displayRestaurant).addClass("");
var restaurantName = localStorage.getItem("Name");
// if you are trying to style just the restaurant name use the class restaurant in this span
displayRestaurant.innerHTML = "Your restaurant is:" + "<br/>" + `<span class="restaurant">${restaurantName}</span>`
// This is a link for the address to link to directions to the restaurant
var displayAddress = document.createElement('a');
$(displayAddress).attr('id', "restaurant-address");
// Add css class for address link here
$(displayAddress).addClass("");
var restaurantAddress = localStorage.getItem("Address");
$(displayAddress).text(restaurantAddress);
body.append(displayContainer);
displayContainer.appendChild(displayRestaurant);
displayContainer.appendChild(displayAddress);

localStorage.clear();
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
    // Add css class for button from Bulma CSS framework
    $(startBtn).addClass("button is-info");
    introP.innerHTML = "This application allows you to randomly generate a restaurant in your area when you are having a hard time choosing where to eat." + "<br/>" + "To use this app, enter your zip code on the next page and answer the following questions.";
    startBtn.innerHTML = "START";
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
    $(submitBtn).addClass("button is-info");
    submitBtn.innerHTML = "SUBMIT";
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
    $(submitBtn).on('click', function () {
        hideZip();
        showQuestions();
        // this calls the API to start
        getData();
    });
    function hideRestaurant() {
        $(displayContainer).hide();
    }
    
    // Hide Zip until Start Button clicked to call showZip function
    hideZip();
    hideQuestions();
    hideRestaurant();
});
function showQuestions() {
    $(questionContainer).show();
}
function hideQuestions() {
    $(questionContainer).hide();
}
function showRestaurant() {
    $(displayContainer).show();
}

// Have a function that compares key words to items in the menu arrays
// API for restuarants and menus by zip code
const api_url = "https://api.documenu.com/v2/restaurants/zip_code/33773?size=20&fullmenu=true&top_cuisines=false&key=fe622a5ac3aa4f64e60a0ab9c844306d";
async function getData() {
    const response = await fetch(api_url, {
        "method": "GET",
        "headers": {
            "x-api-key": "fe622a5ac3aa4f64e60a0ab9c844306d",
            "x-rapidapi-host": "documenu.p.rapidapi.com"
        }
    });
    console.log(response);

    const totalRestaurants = await response.json();
    console.log(totalRestaurants);

    // zip code is postal_code for restaurant data
    // const restMenu = totalRestaurants.data[1].menus;
    // console.log(restMenu);
    // const menuItems = totalRestaurants.data[1].menus[0].menu_sections[0];
    // console.log(menuItems);
    
    // This will get the cuisines and put them in buttons
    var restCuisine = [];
    for (var i = 0; i < totalRestaurants.data.length; i++) {
        var currentRestaurant = totalRestaurants.data[i];
        restCuisine = restCuisine.concat(currentRestaurant.cuisines);
        for (var z = 0; z < currentRestaurant.cuisines.length; z++) {
            if (currentRestaurant.cuisines[z] != '') {
                document.querySelector('#sine').innerHTML += `<button class="cuisine">${currentRestaurant.cuisines[z]}</button>`;
            }
        }
    }
    console.log(restCuisine);

    // This gets the selected cuisine
    $('.cuisine').on('click', function (e) {
        selectedCuisine(e.target.innerText);
        $('.cuisine').hide();
        hideQuestions();
        showRestaurant();
    });

    // clear all cuisine buttons after button click clear HTML of container
    // look through total restaurants list to match picked cuisine with for loop
    // show them the restaurant
    // maybe add menu items
    // This function uses the selected cuisine to match with a restaurant / gets restaurant name and address
    function selectedCuisine(cuisine) {
        console.log(cuisine);
        for (var i = 0; i < totalRestaurants.data.length; i++) {
            var currentRestaurant = totalRestaurants.data[i];
            restCuisine = restCuisine.concat(currentRestaurant.cuisines);
            if (currentRestaurant.cuisines.includes(cuisine)) {
                console.log(currentRestaurant.restaurant_name);
                const restName = currentRestaurant.restaurant_name;
                // $('#name').text(restName);
                localStorage.setItem("Name", restName);
                console.log(currentRestaurant.address.formatted);
                const restAddress = currentRestaurant.address.formatted;
                // $('#address').text(restAddress);
                localStorage.setItem("Address", restAddress);
            }
    
        }
    }
}