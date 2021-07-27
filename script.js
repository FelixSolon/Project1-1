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
        // this calls the API to start
        // getData();
    });
    // Hide Zip until Start Button clicked to call showZip function
    hideZip();
});
// Have a function that compares key words to items in the menu arrays
// API for restuarants and menus by zip code
// const api_url = "https://api.documenu.com/v2/restaurants/zip_code/33773?size=20&fullmenu=true&top_cuisines=false&key=fe622a5ac3aa4f64e60a0ab9c844306d";
// async function getData() {
//     const response = await fetch(api_url, {
//         "method": "GET",
//         "headers": {
//             "x-api-key": "fe622a5ac3aa4f64e60a0ab9c844306d",
//             "x-rapidapi-host": "documenu.p.rapidapi.com"
//         }
//     });
//     console.log(response);
//     var restaurants = 0;
//     const totalRestaurants = await response.json();
//     console.log(totalRestaurants);
//     const restName = totalRestaurants.data[1].restaurant_name;
//     console.log(restName);
//     // zip code is postal_code for restaurant data
//     const restAddress = totalRestaurants.data[1].address.formatted;
//     console.log(restAddress);
//     // const restZipCode = totalRestaurants.data[1].address.postal_code;
//     // console.log(restZipCode);
//     const restMenu = totalRestaurants.data[1].menus;
//     console.log(restMenu);
//     // const restCuisine = totalRestaurants.data[1].cuisines;
    
//     // const menuItems = totalRestaurants.data[1].menus[0].menu_sections[0];
//     // console.log(menuItems);
//     var restCuisine = [];
//     for (var i = 0; i < totalRestaurants.data.length; i++) {
//         var currentRestaurant = totalRestaurants.data[i];
//         restCuisine = restCuisine.concat(currentRestaurant.cuisines);
//         for (var z = 0; z < currentRestaurant.cuisines.length; z++) {
//             if (currentRestaurant.cuisines[z] != '') {
//                 document.querySelector('#sine').innerHTML += `<button class="cuisine">${currentRestaurant.cuisines[z]}</button>`;
//             }
//         }
//     }
//     console.log(restCuisine);

//     document.querySelector('#name').innerHTML = restName;
//     document.querySelector('#address').innerHTML = restAddress;
//     // document.querySelector('#sine').innerHTML = restCuisine;
//     // document.querySelector('#menu').innerHTML = menuItems;
//     $('.cuisine').on('click', function (e) {
//         selectedCuisine(e.target.innerText);
//         $('.cuisine').hide();
//     });
//     function selectedCuisine(cuisine) {
//         console.log(cuisine);
//         for (var i = 0; i < totalRestaurants.data.length; i++) {
//         var currentRestaurant = totalRestaurants.data[i];
//         restCuisine = restCuisine.concat(currentRestaurant.cuisines);
//         if (currentRestaurant.cuisines.includes(cuisine)) {
//             console.log(cuisine);
//         }
    
//     }
//         // clear all cuisine buttons after button click clear HTML of container
//         // look through total restaurants list to match picked cuisine with for loop
//         // show them the restaurant
//         // maybe add menu items
//     }
// }