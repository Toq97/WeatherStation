/**
 * @Author: stefanotortone
 * @Date:   2017-12-07T11:10:26+01:00
 * @Last modified by:   stefanotortone
 * @Last modified time: 2017-12-12T15:23:13+01:00
 */



//"use strict";

/**
 * [global object manager that manage the most important data]
 * @type {Object}
 */
var manager = {
	allData : [],
	collapsibleOpenedIndex : [],
    collapsebody: [],
	loadimageoption: 0,
	refreshtime: 30000,
	loadedStations : 0,
	slugs: slugs,
	jsonBlobCalls : 0,
	standardCallActive: true,
	timeOut: "",
	stoprefresh: 0
}
/**
 * [filterManager manager that saves the data for filtering at the refresh]
 * @type {Object}
 */
var refreshManager = {
	selectData: "",
	textData: ""
}
/**
 * [function that does the API call and set the setTimeout of the refresh]
 */
function getAllStations() {
	if(manager.standardCallActive) {
		manager.allData = [];
		manager.jsonBlobCalls = 0;
		initializeLoading();
		for (var i = 0; i < slugs.length; i++) {
			getApiData(slugs[i].slug);
		}
	}
	console.log(manager.allData);
		manager.timeOut = setTimeout(getAllStations, manager.refreshtime);


}

/**
 * [function that get the Json Data]
 * @param  {String} slug [station name with kebabCase]
 */
function getApiData(slug) {
$.ajax({
	url: 'https://www.torinometeo.org/api/v1/realtime/data/' + slug + '/',
	type: 'GET',
	dataType: 'JSON',
})
.done(function(detectionData) {
	//console.log("success");
    manager.allData.push(detectionData);
		updateLoading();
		if(manager.allData.length === manager.slugs.length) {
			loadDataOnDOM(manager.allData);
		}
		/** Gian: queste funzioni mi sono servite per creare su jsonBlob tutti gli indirizzi
		corrispondenti alle varie stazioni.
		Non dovrebbero servire più, ma finchè c'è la possibilità che si crei qualche errore
		preferirei non cancellarle **/
//faiLeCOse(manager.allData)

		/*var slugs = [];
		for(var i = 0; i< allDetectionData.length; i++) {
			slugs.push({
				id: allDetectionData[i].station.id,
				slug: allDetectionData[i].station.slug
			});
		}
		var str = '';
		slugs.forEach(function(slug) {
			str += '\n{\n\t id : \'' + slug.id + '\', \n\tslug : \'' + slug.slug + '\' \n},'
		});
		console.log(str)*/

		$('#refreshtime').attr('placeholder',manager.refreshtime);

})
.fail(function(error) {
	//alertTorinoMeteoError();
	console.log(error.status);
	console.log(error.statusText);
	//display the error data into page
	alertTorinoMeteoError();
	//get the station from the backup API
	getStationFromJSONBlob(findBlobIdFromSlug(slug));
})
.always(function() {
	//console.log("ajax call complete");
	if(manager.allData.length === 111) {
		console.log(manager.allData);
	}

});
   //update the data update
   dateutilities();
}

/**
* [Load the json data on the page]
* @param {Object} data - [the data to be shown]
*/
function loadDataOnDOM(data) {
	//manager.allData = data;
	$("#collapsibleContainer").empty();
	createAllCollapsiblePanel(data);
	if(manager.loadimageoption == 0){
		utilitiesformanageimage();
		manager.loadimageoption = 1;
	}
	assignCollapsibleClick(data);
    addEventListenerToCollapse();
    callOnClickEventOnCollapse();
    filteringAtRefresh();
}

/**
 * [function that control the collapsible panel]
 */
function assignCollapsibleClick(singleData){
    /**
     * [contain all the divs that contain a collapsible panel]
     * @type {DomElement}
     */
	var acc = document.getElementsByClassName("panelHeader");

	for (var i = 0; i < acc.length; i++) {

		acc[i].onclick = function() {
	    	this.classList.toggle("active");
	    	var panel = this.nextElementSibling;
				var id = $(this).attr('id');
	    	if (panel.style.maxHeight){
	        	panel.style.maxHeight = null;
	        } else {
			    panel.style.maxHeight = "350" + "px";
	        }
		    managerpanelbodyimage(id);
     	}
	}

}
/**
 * [function that open the selected panel when there is a refresh]
 */
function callOnClickEventOnCollapse(){
	/**
     * [contain all the divs that contain a collapsible panel]
     * @type {DomElement}
     */
	var acc = document.getElementsByClassName("panelHeader");
    for (var i = 0; i < acc.length; i++) {
		for (var item in manager.collapsibleOpenedIndex) {
			if (manager.collapsibleOpenedIndex[item] == i) {
				acc[manager.collapsibleOpenedIndex[item]].onclick();
			}
	    }
    }
}
/**
 * [function that retrive index of clicked collapse]
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
	});
}


/**
 * [this function will populate the dom with all data]
 * @param  {[type]} allDetectionData [contain all the data received from the API]
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
 * @param  {Array} detectedDataForSinglelocation [contain all the data for a single location]
 */
function createCollapsiblePanel(detectedDataForSinglelocation) {
	/**
	 * it is the container of all collapsible panels
	 * @type {DomElement}
	 */
	var allCollapsibleContainer = $('#collapsibleContainer');
    /**
     * div that contain the header and the body
     * @type {DomElement}
     */
	var collapse = $('<div></div>').addClass('collapse');
	//aggiungo l'id al pannello per poterlo identificare in seguito
	//collapse = $('#'+detectedDataForSinglelocation.id);
	/**
	 * [contain the header of the location]
	 * @type {DomElement}
	 */
    var divPanelHeader = createPanelHeader(detectedDataForSinglelocation);
	/**
	 * contain the body of the location
	 * @type {DomElement}
	 */
    var divPanelCollapsibleBody = createPanelBody(detectedDataForSinglelocation , divPanelHeader);
	collapse.append(divPanelHeader,divPanelCollapsibleBody);
	allCollapsibleContainer.append(collapse);
}
/**
 * [appendHeaderData description]
 * @param  {DomElement} divPanelHeader [pannel header]
 * @param  {CSS Class} className      [name of the css class]
 * @param  {String} text           [text]
 * @param  {String/Number} data           [the data that append to the header]
 */
function appendHeaderData(divPanelHeader, className, data){
	if (data == null){
		data = "NO Data";
	}
	var stationData = $('<p></p').addClass(className + " col col-headerElements")
								 .html(data);
     divPanelHeader.append(stationData);
}
/**
 * [create the header of each collapsible panel]
 * @param  {Array} detectedDataForSinglelocation [contain all the data for a single location]
 * @return {DomElement} [header of the collapsiblePanel]
 */
function createPanelHeader(detectedDataForSinglelocation){
	var divPanelHeader = $('<div></div>').addClass("panelHeader")
    var stationName = $('<p></p').addClass('stationName col col-headerElements')
	                             .html(detectedDataForSinglelocation.station.name)
								 .attr('id',detectedDataForSinglelocation.station.nation.name);
   appendTemperatureBox(detectedDataForSinglelocation, divPanelHeader);
   divPanelHeader.append(stationName);
   appendHeaderData( divPanelHeader,'stationCity', detectedDataForSinglelocation.station.city );
   appendHeaderData( divPanelHeader, 'stationRegion',  detectedDataForSinglelocation.station.region.name);
   appendHeaderData( divPanelHeader, 'stationPressure', detectedDataForSinglelocation.pressure);
   appendHeaderData( divPanelHeader, 'stationHumidity', detectedDataForSinglelocation.relative_humidity);
   appendHeaderData( divPanelHeader, 'stationWind', detectedDataForSinglelocation.wind_strength);
   getFlagNation(detectedDataForSinglelocation,divPanelHeader);

   divPanelHeader.append(getFlagNation(detectedDataForSinglelocation));
   divPanelHeader.attr("id",detectedDataForSinglelocation.station.slug);

    return divPanelHeader;
}
/**
 * [append the temperatureBox to the panelHeader]
 * @param  {Object} stationData [object that contain the information of the
 * 															station]
 * @param  {DomElement} panelHeader [header of the collapsiblePanel]
 */
function appendTemperatureBox(stationData, panelHeader) {
	//if historical data take the mean value
	var temperature = stationData.temperature ?
										stationData.temperature :
										stationData.temperature_mean;

	if(stationData.weather_icon){
		panelHeader.append(
			createTemperatureBox(temperature,
								stationData.weather_icon.icon));
	} else {
		panelHeader.append(
			createTemperatureBox(temperature));
	}
}
/**
 * [create the colored box showing the temperature]
 * @param  {Number} temperature [temperature of the station]
 * @param  {String} urlIcon     [URL of the icon]
 * @return {DomElement}         [div with the temperature and the icon to
 * 															append to the header]
 */
function createTemperatureBox(temperature,urlIcon) {

		var $weatherIcon = $('<img>').addClass('weather-icon');
		if(urlIcon) {
			$weatherIcon.attr('src', urlIcon);
		} else {
			$weatherIcon.attr('src', 'img/nf_weather_icon.png');
		}

		return $('<div>').addClass('temperature-box')
										.html(temperature ? temperature + '°' : 'no T')
										.css({'background-color': (
											'rgb' + temperatureColorUtilities.temperatureToRGB(temperature)),
											})
										.append($weatherIcon);

}

/**
 * [create the body of each collapsible panel]
 * @param  {Array} detectedDataForSinglelocation [contain all the data for a single location]
 * @return {DomElement} divPanelCollapsibleBody [the body of the panel]
 */
function createPanelBody(detectedDataForSinglelocation){
	var divPanelCollapsibleBody = $('<div></div>').addClass("panelCollapsibleBody");
    divPanelCollapsibleBody.attr("id",detectedDataForSinglelocation.station.id+"updateimage");

   return divPanelCollapsibleBody;
}
/**
 * [give the flag icon for the respetive state of the location]
 * @param  {Array} detectedDataForSinglelocation [contain all the data for a single location]
 * @return {DomElement}     image                          [the image to append to the header]
 */
function getFlagNation(detectedDataForSinglelocation){
	switch(detectedDataForSinglelocation.station.nation.name){
		case "Italia":
		    var imageItaly = $("<img></img>").attr('src',"./img/backgroundItaly.png").addClass("flagIcon");
			return imageItaly;
		case "Francia":
			var imageFrance = $("<img></img>").attr('src',"./img/backgroundFrancia.png").addClass("flagIcon");
			return imageFrance;
		case "Svizzera":
			var imageSwiss = $("<img></img>").attr('src',"./img/backgroundSvizzera.png").addClass("flagIcon");
			return imageSwiss;
		default:
			var defaultImage = $("<img></img>").attr('src',"./	img/pirates-flag.png").addClass("flagIcon");
			return defaultImage;
	}
}


/*****************************************************************/
/*                              MAIN                             */
/*****************************************************************/
getAllStations();
