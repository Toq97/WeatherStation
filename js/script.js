/**
 * @Author: stefanotortone
 * @Date:   2017-12-07T11:10:26+01:00
 * @Last modified by:   stefanotortone
 * @Last modified time: 2017-12-12T15:23:13+01:00
 */



//"use strict";

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
	timeOut: ""
}
/**
 * [filterManager manager that saves the data for filtering at the refresh]
 * @type {Object}
 */
var refreshManager = {
	selectData: "",
	textData: ""
}

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
	fadeOutCollapse();
		manager.timeOut = setTimeout(getAllStations, manager.refreshtime);


}

/**
 * [function that get the Json Data]
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
   panelBodyUtilities.dateutilities();
}





/*****************************************************************/
/*                              MAIN                             */
/*****************************************************************/
getAllStations();

/**
 * Search filter
 * @return {[type]} [description]
 */
