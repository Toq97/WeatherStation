//"use strict";

var manager = {
	allData : [],
	collapsibleOpenedIndex : []
}

var countimage = 0;
/**
 * [function that get the Json Data]
 */
function getApiData() {
$.ajax({
	url: 'https://www.torinometeo.org/api/v1/realtime/data/',
	type: 'GET',
	dataType: 'JSON',
})
.done(function(allDetectionData) {
	console.log("success");
    loadDataOnDOM(allDetectionData);
})
.fail(function(error) {
	alertTorinoMeteoError();
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
	 var timeOut = setTimeout(getApiData, 30000);
}

/**
* Load the json data on the page
* @param {Object} data - the data to be shown
*/
function loadDataOnDOM(data) {
	manager.allData = data;
	$("#container").empty();
	createAllCollapsiblePanel(data);
	assignCollapsibleClick(data);
    addEventListenerToCollapse();
    getSelectedValue(data);
}

/**
 * [function that control the collapsible panel]
 * @return {[type]} [description]
 */
function assignCollapsibleClick(allDetectionData){
    /**
     * [contain all the divs that contain a collapsible panel]
     * @type {[type]}
     */
	var acc = document.getElementsByClassName("panelHeader");
	for (var i = 0; i < acc.length; i++) {
		acc[i].onclick = function() {
	    	this.classList.toggle("active");
	    	var panel = this.nextElementSibling;
	    	if (panel.style.maxHeight){
	        	panel.style.maxHeight = null;
	        } else {
	        	panel.style.maxHeight = panel.scrollHeight + "px";
	        }
	/*
           ste questa cosa mettila in funzione,
		   solo che count image non ti va come variabile singola,
		   ti serve un array che si salvi una cosa del genere per ogni pannello.
          puoi usare la logica di 'createAllCollapsiblePanel' per richiamare
		  updateImageAPi(che poi non si chiama piu cosi perche fa altre cose,chiamala in un altro modo in modo che ti renda le sue funzioni )

			if(countimage == 0){
				updateImageApi(allDetectionData[i]);
				countimage = 1;
			} else {
				countimage = 0;
			}
	*/
       callOnClickEventOnCollapse(acc,i);
     	}
	}

}
/**
 * [fucntion that call the onclick event if the collapse in the previus refresh was opened]
 */
function callOnClickEventOnCollapse(acc,i){
	for (var item in manager.collapsibleOpenedIndex) {
		if (manager.collapsibleOpenedIndex[item] == i) {
			acc[i].onclick();
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
	var collapse = $('<div></div>').addClass('collapse').attr('id', '#'+detectedDataForSinglelocation.station.slug);
	//aggiungo l'id al pannello per poterlo identificare in seguito
	//collapse = $('#'+detectedDataForSinglelocation.id);
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

	if(detectedDataForSinglelocation.weather_icon){
		divPanelHeader.append(
			createTemperatureBox(detectedDataForSinglelocation.temperature,
								detectedDataForSinglelocation.weather_icon.icon));
	} else {
		divPanelHeader.append(
			createTemperatureBox(detectedDataForSinglelocation.temperature));
	}

   divPanelHeader.attr("id",'#'+detectedDataForSinglelocation.station.id+"updateimageheader");

    return divPanelHeader;

}
/**
 * create the colored box showing the temperature
 */
function createTemperatureBox(temperature,urlIcon) {

		var $weatherIcon = $('<img>').addClass('weather-icon');
		if(urlIcon) {
			$weatherIcon.attr('src', urlIcon);
		} else {
			$weatherIcon.attr('src', 'img/provv.png');
		//	console.log($weatherIcon);
		}

		return $('<div>').addClass('temperature-box')
										.html(temperature + '°')
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
   //test
   divPanelCollapsibleBody.html("test");
   divPanelCollapsibleBody.attr("id",detectedDataForSinglelocation.station.id+"updateimage");
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
 * [function that create the url of google maps]
 * @param  {[String]} nameofLocation [name of location]
 * @return {[String]}[url for google maps]
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
/**
 * function that take the selected nation
 * @param  {[type]} allDetectionData [description]
 * @return {[type]}                  [description]
 */
function getSelectedValue(allDetectionData)
{
	$(document).ready(function(){
		 $("#select-country").on("change", function() {
			 $("#container").empty();
			 var value = $(this).val();
			 for (var i in allDetectionData) {
			 	if (allDetectionData.hasOwnProperty(i)) {
					if(value == allDetectionData[i].station.nation.name || value == "")
					{
						//console.log(value);
						getSelectNation(allDetectionData[i]);
					}
			 	}
			 }

		 });
	 });
}

 function updateImageApi(detectedDataForSinglelocation){

 	      var divPanelCollapsibleBody = $(".panelCollapsibleBody");

 		  //title with the name of the place
 		  var collapsibleBodytitle = $('<h3></h3>');
 		  collapsibleBodytitle.html(detectedDataForSinglelocation.station.name+" situato nella regione "+detectedDataForSinglelocation.station.region.name+" in "+ detectedDataForSinglelocation.station.nation.name);

 		  //image of the place
 		  var collapsibleBodyImage = $('<img></img>');
 		  collapsibleBodyImage.attr('src',detectedDataForSinglelocation.station.webcam);
 		  collapsibleBodyImage.addClass("collapsibleImageStyle");

 		  //link to maps
 		  var collapsibleBodyMapsLink = $('<a></a>');
 		  collapsibleBodyMapsLink.attr('href',createLinkforMaps(detectedDataForSinglelocation.station.city));
 		  collapsibleBodyMapsLink.append(collapsibleBodyImage);

 		  $("#"+detectedDataForSinglelocation.station.id+"updateimage").append(collapsibleBodytitle);
 		  $("#"+detectedDataForSinglelocation.station.id+"updateimage").append(collapsibleBodyMapsLink);



//commento che serve piu tardi spero non dia fastidio a nessuno
		  /*
		   $('.collapse').click(function(event){
		   	//prendere l'id del panel, cioè quello della stazione
		     var falseid = $(this).attr('id');
		     var id = falseid.replace("#","");
		   	console.log(id);

		   	$.ajax({
		   		//chiamata con l'id
		   		url: "https://www.torinometeo.org/api/v1/realtime/data/"+id+"/",
		   		type: 'GET',
		   		dataType: 'JSON',
		   	})
		   	  .done(function(detectedDataForSinglelocation) {
		  */
/*
 	})
 	.fail(function(error) {
 		console.log(error);
 		console.log(error.status);
 		console.log(error.statusText);
 		//display the error data into page
 	})
 	.always(function() {
 		console.log("ajax call for image complete");
 	});
 });

*/
}

 /**
  * function that control what nation is selected and create all the collapse
  * of that nation
  * @param  {[type]} detectedDataForSinglelocation [description]
  * @return {[type]}                               [description]
  */
 function getSelectNation(detectedDataForSinglelocation){
 	switch(detectedDataForSinglelocation.station.nation.name){
 		case "Italia":
 			createCollapsiblePanel(detectedDataForSinglelocation);
 			assignCollapsibleClick();
			break;
 		case "Francia":
 			createCollapsiblePanel(detectedDataForSinglelocation);
 			assignCollapsibleClick();
			break;
 		case "Svizzera":
 			createCollapsiblePanel(detectedDataForSinglelocation);
 			assignCollapsibleClick();
			break;
 		case "undefined":
 			createAllCollapsiblePanel();
 			assignCollapsibleClick();
			break;
 		}
 }

/*****************************************************************/
/*                              MAIN                             */
/*****************************************************************/
getApiData();

/**
 * Search filter
 * @return {[type]} [description]
 */


/*$(document).ready(function(){
   $("#input-station-name").on("keyup", function() {
     var value = $(this).val().toLowerCase();
     $("#container *").filter(function() {
       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
     });
   });
});*/
