"use strict";
/**
 * @Author: stefanotortone
 * @Date:   2017-12-03T11:46:15+01:00
 * @Last modified by:   stefanotortone
 * @Last modified time: 2017-12-04T13:56:49+01:00
 */

var manager = {
	allData : [],
	/**
	 * [getApiData get all json weather Data from API]
	 * @return {[type]} [description]
	 */
	collapsibleOpenedIndex : []
}

function getApiData() {
$.ajax({
	url: 'https://www.torinometeo.org/api/v1/realtime/data/',
	type: 'GET',
	dataType: 'JSON',
})
.done(function(allDetectionData) {
	console.log("success");
	console.log(allDetectionData);

	loadDataOnDOM(allDetectionData);

})
.fail(function(error) {
	console.log(error);
	console.log(error.status);
	console.log(error.statusText);
	//display the error data into page
	getDataFromJSONBlob();
})
.always(function() {
	console.log("ajax call complete");
	console.log(manager.allData);
});
	/**
	 * [timer call the setTimeout for looping the GetApiData() function every 30 seconds]
	 * @type {[type]}
	 */
	 var timeOut = setTimeout(getApiData, 10000);
}

/**
* Load the json data on the page
* @param {Object} data - the data to be shown
*/
function loadDataOnDOM(data) {
	console.log('palle')
	manager.allData = data;
	console.log(manager.allData);
	$("#container").empty();
	createAllCollapsiblePanel(data);
	assignCollapsibleClick();
  addEventListenerToCollapse();
  console.log(manager.collapsibleOpenedIndex);
}

/**
 * [function that control the collapsible panel]
 * @return {[type]} [description]
 */
function assignCollapsibleClick(){
    /**
     * [contain all the divs that contain a collapsible panel]
     * @type {[type]}
     */
	var acc = document.getElementsByClassName("panelHeader");
	for (var i = 0; i < acc.length; i++) {
	//	console.log(acc);
		acc[i].onclick = function() {
	    	this.classList.toggle("active");
	    	var panel = this.nextElementSibling;
	    	if (panel.style.maxHeight){
	        	panel.style.maxHeight = null;
	        } else {
	        	panel.style.maxHeight = panel.scrollHeight + "px";
	        }
     	}
		for (var item in manager.collapsibleOpenedIndex) {
			if (manager.collapsibleOpenedIndex[item] == i) {
				acc[i].onclick();
			}
		}
	}
}

/**
 * [addEventListenerToCollapse function that retrive index of clicked collapse]
 */
function addEventListenerToCollapse() {

	$('.collapse').click(function (e){
	var flag = null;
	for (var item in manager.collapsibleOpenedIndex) {
		if (manager.collapsibleOpenedIndex.hasOwnProperty(item)) {
			if(manager.collapsibleOpenedIndex[item] == $(this).index('.collapse'))
			{
				flag = manager.collapsibleOpenedIndex[item];

			}
	    }
    }

	if (flag == null){
		manager.collapsibleOpenedIndex[$(this).index('.collapse')] = ($(this).index('.collapse'));
	} else {
		manager.collapsibleOpenedIndex[$(this).index('.collapse')] = null;
	}
 console.log(manager.collapsibleOpenedIndex);
});

}


/**
 * [this function will populate the dom with all data]
 * @param  {[type]} allDetectionData [contain all the data received from the API]
 * @return {[type]}                  [description]
 */
function createAllCollapsiblePanel(allDetectionData) {
	//loop for allDetectionData and call createCollapsiblePanel function
	for (var item in allDetectionData) {
		if (allDetectionData.hasOwnProperty(item)) {
			createCollapsiblePanel(allDetectionData[item]);
		}
	}
}

/**
 * [this function will create the single collapsible panel]
 * @param  {[type]} detectedDataForSinglelocation [contain all the data for a single location]
 * @return {[type]}       [description]
 */
function createCollapsiblePanel(detectedDataForSinglelocation) {
	/**
	 * it is the container of all collapsible panels
	 * @type {[type]}
	 */
	var allCollapsibleContainer = $('#container');
    /**
     * div that contain the header and the body
     * @type {[type]}
     */
	var collapse = $('<div></div>').addClass('collapse');

	/**
	 * [contain the header of the location]
	 * @type {[type]}
	 */
    var divPanelHeader = createPanelHeader(detectedDataForSinglelocation);
	/**
	 * contain the body of the location
	 * @type {[type]}
	 */
    var divPanelCollapsibleBody = createPanelBody(detectedDataForSinglelocation , divPanelHeader);
	collapse.append(divPanelHeader,divPanelCollapsibleBody);
	allCollapsibleContainer.append(collapse);
}
/**
 * [create the header of each collapsible panel]
 * @param  {[type]} detectedDataForSinglelocation [contain all the data for a single location]
 * @return {[type]} [description]
 */
function createPanelHeader(detectedDataForSinglelocation){
	var divPanelHeader = $('<div></div>').addClass("panelHeader")
	                                     .html("Station Name:" + detectedDataForSinglelocation.station.name + " | City: "
										  + detectedDataForSinglelocation.station.city +
										  " | Temperature: "+ detectedDataForSinglelocation.temperature)
										  .append(getFlagNation(detectedDataForSinglelocation));
	/*divPanelHeader.append(
		createTemperatureBox(detectedDataForSinglelocation.temperature,
							detectedDataForSinglelocation.weather_icon.icon));*/


    return divPanelHeader;

}
/**
 * create the colored box showing the temperature
 */
function createTemperatureBox(temperature,urlIcon) {
	var $weatherIcon = $('<img>').attr('src', urlIcon)
								.addClass('weather-icon');
	return $('<div>').addClass('temperature-box')
									//.html(temperature + '°')
									.css({'background-color': (
										'rgb' + temperatureColorUtilities.temperatureToRGB(temperature)),
										})
									.append($weatherIcon);
}

/**
 * [create the body of each collapsible panel]
 * @param  {[type]} detectedDataForSinglelocation [contain all the data for a single location]
 * @return {[type]} [description]
 */
function createPanelBody(detectedDataForSinglelocation){
	var divPanelCollapsibleBody = $('<div></div>').addClass("panelCollapsibleBody");

  //title with the name of the place
	var collapsibleBodytitle = $('<h3></h3>');
 	collapsibleBodytitle.html(detectedDataForSinglelocation.station.name+" situato nella regione "+detectedDataForSinglelocation.station.region.name+" in "+ detectedDataForSinglelocation.station.nation.name);

  //image of the place
  /*var collapsibleBodyImage = $('<img></img>');
	collapsibleBodyImage.attr('src',detectedDataForSinglelocation.station.webcam);
  collapsibleBodyImage.addClass("collapsibleImageStyle");*/


	//link to maps
/*	var collapsibleBodyMapsLink = $('<a></a>');
	collapsibleBodyMapsLink.attr('href',createLinkforMaps(detectedDataForSinglelocation.station.city));
	collapsibleBodyMapsLink.append(collapsibleBodyImage);
*/
    divPanelCollapsibleBody.append(collapsibleBodytitle);
	//divPanelCollapsibleBody.append(collapsibleBodyMapsLink);
	return divPanelCollapsibleBody;
}
/**
 * [give the flag icon for the respetive state of the location]
 * @param  {[type]} detectedDataForSinglelocation [contain all the data for a single location]
 * @return {[type]}                               [description]
 */
function getFlagNation(detectedDataForSinglelocation){
	switch(detectedDataForSinglelocation.station.nation.name){
		case "Italia":
		    var imageItaly = $("<img></img>").attr('src',"img/flag_italy.jpg").addClass("flagIcon");
			return imageItaly;
		case "Francia":
			var imageFrance = $("<img></img>").attr('src',"img/flag_france.jpg").addClass("flagIcon");
			return imageFrance;
		case "Svizzera":
			var imageSwiss = $("<img></img>").attr('src',"img/flag_swiss.jpg").addClass("flagIcon");
			return imageSwiss;
		default:
			var defaultImage = $("<img></img>").attr('src',"img/flag_default.svg").addClass("flagIcon");
			return defaultImage;
	}
}

/**
 * function that create the url of google maps
 * @param  {[type]} nameofLocation
 * @return {[type]}                [description]
 */

var createLinkforMaps = function(nameofLocation){

    var finalResult = "";
    var mapsBaseLink = "https://www.google.it/maps/place/";

    var changename = nameofLocation.replace(" ","+");
    changename = changename.replace(" ","+");

    finalResult=mapsBaseLink+changename;

    //the link of the maps
    return finalResult;
 }


/*****************************************************************/
                         /*MAIN*/
/*****************************************************************/
getApiData();

/**
 * filter
 */

//search filter

 $(document).ready(function(){
   $("#input-station-name").on("keyup", function() {
     var value = $(this).val().toLowerCase();
     $("#container *").filter(function() {
       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
     });
   });
 });

//select filter
/*
 $(document).ready(function(){
	 $("#select-country").on("change", function() {
		 var value = $(this).val().toLowerCase();
		 for(var i=0;i<allData.length;i++)
		 {
		 if(value == allData[i].station.nation.name)
		 {
		 $("#container *").filter(function() {
			 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		 });
	 }
	 }
	 });
 });
 */
