/**
 * @author: group 05
 * Main code to manage the page
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
	timeOut: "",
	stopRefresh: 0
}

/**
 * [filterManager manager that saves the data for filtering at the refresh]
 * @type {Object}
 */
var filterManager = {
	selectData: "",
	textData: ""
}

var meteoMainFunctions = {
	/*
	 * Get the data about the staions
	 * Save them in a variable
	 * Show them on the page
	 */
	getAllStations: function() {
		if(manager.standardCallActive) {
			manager.allData = [];
			manager.jsonBlobCalls = 0;
			loadingManager.initializeLoading();
			for (var i = 0; i < slugs.length; i++) {
				meteoMainFunctions.getApiData(slugs[i].slug);
			}
		}
		console.log(manager.allData);
		manager.timeOut = setTimeout(meteoMainFunctions.getAllStations, manager.refreshtime);
	},

	/**
	 * [function that get the Json Data]
	 */
	getApiData: function(slug) {
		$.ajax({
			url: 'https://www.torinometeo.org/api/v1/realtime/data/' + slug + '/',
			type: 'GET',
			dataType: 'JSON',
		})
		.done(function(detectionData) {
		    manager.allData.push(detectionData);
				loadingManager.updateLoading();
				console.log('oalle')
				if(manager.allData.length === manager.slugs.length) {
					DOM_Manipulation.loadDataOnDOM(manager.allData);
				}
				$('#refreshtime').attr('placeholder',manager.refreshtime);
		})
		.fail(function(error) {
			console.log(error.status);
			console.log(error.statusText);
			//display the error data into page
			$('.error-panel').show();
			//get the station from the backup API
			jsonBlobBackup.getStationFromJSONBlob(jsonBlobBackup.findBlobIdFromSlug(slug));
		})
		.always(function() {
			//console.log("ajax call complete");
			if(manager.allData.length === 111) {
				console.log(manager.allData);
			}
			$('#refreshtime').attr('placeholder',manager.refreshtime);

		});
	   //update the data update
	   panelBodyUtilities.dateutilities();
	}
}

/**************************************************/
/*         Add all the event listeners            */
/**************************************************/

	//[the function of the historical button, it give the meteo conditions of a an date]
	$('#history-btn').click(function() {
	  var inputDate = $('.history-box input').val();
	  console.log(inputDate)
	  var dateArray = inputDate.split('-');
	  if(historicalMeteo.isValidDate(inputDate)) {
	    //stop standard call
	    DOM_Manipulation.manageStopRefresh();
	    manager.allData = [];
	    historicalMeteo.getHistoricalData(dateArray);
	  } else {
			var $showError = $('<div>');
			$showError.html('');
			$showError.addClass('jsonBlob-error')
								.html('Invalid Date. The date must be in the format yyyy-mm-dd and no more than 6 month ago.');
			$('.other-comunications').append($showError);
		}
	});

	//stop/refresh button
	$('#buttonstoprefresh').click(DOM_Manipulation.manageStopRefresh);
	  //Set the refresh
	  $('#buttonsaverefresh').click(function (){
	  var newrefreshtime = document.getElementById("refreshtime");
	  if(newrefreshtime.value >= 15000) {
	    manager.refreshtime = newrefreshtime.value;
	    clearInterval(manager.timeOut);
	    manager.timeOut = setTimeout(getAllStations, manager.refreshtime);
	  } else {
	    alert("Refresh value too low. Minimum value is 15000ms");
	  }
	});

	//add events to the input text and the select
	$("#input-station-name").on("keyup", filterSearch.filter);
	$('#select-country').on('click', filterSearch.filter);



/*****************************************************************/
/*                              MAIN                             */
/*****************************************************************/

(function() {
	//main calls
	meteoMainFunctions.getAllStations();
	//keep jsons on jsonblob always synchronized to the freshest data on torino meteo api
	jsonBlobBackup.keepJsonBlobUpdated();
	//keep slugs always synchronized to the data on torino meteo api
	jsonBlobBackup.getCompleteJsonFromTorinoMeteo();
})();
