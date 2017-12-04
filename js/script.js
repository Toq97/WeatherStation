/**
 * @Author: stefanotortone
 * @Date:   2017-12-03T11:46:15+01:00
 * @Last modified by:   stefanotortone
 * @Last modified time: 2017-12-04T13:56:49+01:00
 */



/**
 * [getApiData get all json weather Data from API]
 * @return {[type]} [description]
 */
function getApiData() {
$.ajax({
	url: 'https://www.torinometeo.org/api/v1/realtime/data/',
	type: 'GET',
	dataType: 'JSON',
})
.done(function(allDetectionData) {
	console.log("success");
	console.log(allDetectionData);
	createAllCollapsiblePanel(allDetectionData);
	assignCollapsibleClick();
})
.fail(function(error) {
	console.log(error);
	console.log(error.status);
	console.log(error.statusText);
	//display the error data into page
})
.always(function() {
	console.log("ajax call complete");
});
	/**
	 * [timer call the setTimeout for looping the GetApiData() function every 30 seconds]
	 * @type {[type]}
	 */
//	var timer = setTimeout(myFunction, 30000);

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
		acc[i].onclick = function() {
	    	this.classList.toggle("active");
	    	var panel = this.nextElementSibling;
	    	if (panel.style.maxHeight){
	        	panel.style.maxHeight = null;
	        } else {
	        	panel.style.maxHeight = panel.scrollHeight + "px";
	        }
     	}
	}
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
    var divPanelCollapsibleBody = createPanelBody(detectedDataForSinglelocation);
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

    return divPanelHeader;

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
  var collapsibleBodyImage = $('<img></img>');
	collapsibleBodyImage.attr('src',detectedDataForSinglelocation.station.webcam);
  collapsibleBodyImage.addClass("collapsibleImageStyle");


	//link to maps
	var collapsibleBodyMapsLink = $('<a></a>');
	collapsibleBodyMapsLink.attr('href',createLinkforMaps(detectedDataForSinglelocation.station.city));
	collapsibleBodyMapsLink.append(collapsibleBodyImage);


  divPanelCollapsibleBody.append(collapsibleBodytitle);
	divPanelCollapsibleBody.append(collapsibleBodyMapsLink);
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
