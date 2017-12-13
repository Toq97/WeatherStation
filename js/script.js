/**
 * @Author: stefanotortone
 * @Date:   2017-12-07T11:10:26+01:00
 * @Last modified by:   stefanotortone
 * @Last modified time: 2017-12-12T15:23:13+01:00
 */

"use strict";

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
		loadingManager.initializeLoading();
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
			loadingManager.updateLoading();
			if(manager.allData.length === manager.slugs.length) {
				DOM_Manipulation.loadDataOnDOM(manager.allData);
			}
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
   panelBodyUtilities.dateutilities();
}





/*****************************************************************/
/*                              MAIN                             */
/*****************************************************************/
getAllStations();
