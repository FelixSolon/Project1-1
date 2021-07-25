var METERS_PER_MILE = 1609.34;

var lat = null;
var long = null;
var geolocSuccess = false;

var radiusVals = ["0.25 mi (walking)", "0.5 mi (walking)", "1 mi (walking)", "2 mi (biking)", "3 mi (biking)", "5 mi (driving)", "10 mi (driving)", "15 mi (driving)", "20 mi (driving)", "25 mi (driving)"];
$(function() {
    $( "#radius-slider" ).slider({
        range: "min",
        value: 6,
        min: 0,
        max: 9,
        slide: function( event, ui ) {
            $( "#radius-display" ).text(radiusVals[ui.value]);
        }
    });
    $( "#radius-display" ).text(radiusVals[$( "#radius-slider" ).slider( "value" )]);
});

$(window).load(function() {
	$("body").css("visibility", "visible");
	$("#mask").fadeOut(500);
	
});

window.onunload = function(){};		//fix back button in firefox resulting in no scripts running

$(document).ready(function(){
	$('input, textarea').placeholder();		//make placeholders visible for IE
	
	//geolocation feature
	if (navigator.geolocation)		//geolocation available
	{
		navigator.geolocation.getCurrentPosition(positionSuccess);
	}
});

function positionSuccess(position)
{
	geolocSuccess = true;
	lat = position.coords.latitude;
	long = position.coords.longitude;
	$("#locBoxDirections").fadeOut(500, function(){$("#locBoxDirections").html("<br><span id=green>thanks</span> - location data gathered successfully!"); $("#locBoxDirections").fadeIn(300);});
	$("#search").fadeOut(500, function(){$("#searchradiuscontainer").css("margin-top", "74px");});
}

function submitform(numSubmitted)
{
	var paramQ = "";
	if (!geolocSuccess)
	{
		if (document.search1.q.value == "" || document.search1.q.value == "zip, address, etc.")
		{
			$("#noLocError").css({"visibility":"visible"});
			$("#noLocError").effect("bounce");
			return false;
		}
		else
		{
			paramQ = document.search1.q.value;
		}
	}
	else
	{
		paramQ = lat + "," + long;
	}
	var param3 = "";
	var param1 = "";
	var param2 = "";
	if (numSubmitted == 3) {
		var selfEntryVal = document.search3.selfentry.value;
		if (selfEntryVal == "" || selfEntryVal == "(enter cuisine)")
		{
			$("#noSelfEntryError").text("first enter cuisine above");
			$("#noSelfEntryError").effect("bounce");
			return false;
		}
		else
		{
			param3 = document.search3.selfentry.value;
		}
	}
	if (numSubmitted == 1) {
		param1 = "cheap";
	}
	else if (numSubmitted == 2) {
		param2 = "expensive";
	}
	
	//now get the max distance
	var max_distance = $( "#radius-display" ).text().split(" ")[0];
	max_distance = Math.round(max_distance * METERS_PER_MILE);
	if (max_distance > 40000)
	{
		max_distance = 40000;	//yelp API's max limit for search radius filter
	}
	
	q = encodeURIComponent(paramQ);
	var geolocSuccessParam = encodeURIComponent(geolocSuccess);
	selfentry = encodeURIComponent(param3);
	cheap = encodeURIComponent(param1);
	expensive = encodeURIComponent(param2);
	maxdistance = encodeURIComponent(max_distance);
	restaurantLinkLocation = "restaurantselect.html?q=" + q + "&geolocSuccess=" + geolocSuccessParam + "&selfentry=" + selfentry + "&cheap=" + cheap + "&expensive=" + expensive + "&maxdistance=" + maxdistance;
	$("#mask").fadeIn(500, redirectPage);
	return false;
}

function redirectPage() {
	window.location = restaurantLinkLocation;
}
