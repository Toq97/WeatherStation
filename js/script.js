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
	DOM_Manipulation.fadeOutCollapse();
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

		console.log(error.status);
		console.log(error.statusText);
		//display the error data into page
		$('.error-panel').show();
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
	console.log(error.status);
	console.log(error.statusText);
	//display the error data into page
	$('.error-panel').show();
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


/**************************************************/
//[the function of the historical button, it give the meteo conditions of a an date]
$('#history-btn').click(function() {
  var inputDate = $('.history-box input').val();
  console.log(inputDate)
  var dateArray = inputDate.split('-');
  if(historicalMeteo.isValidDate(inputDate)) {
    //stop standard call
    manager.standardCallActive = false;
    manager.allData = [];
    historicalMeteo.getHistoricalData(dateArray);
  }
});


  /**
   * [function that stop/restart the refresh]
   */
  $('#buttonstoprefresh').click(function (){

  if(manager.stoprefresh == 0){
    clearInterval(manager.timeOut);
    $('#buttonstoprefresh').html('START REFRESH');
    alert("Refresh stopped");
    manager.stoprefresh = 1;
  }else{
    manager.timeOut = setTimeout(getAllStations, manager.refreshtime);
    $('#buttonstoprefresh').html('STOP REFRESH');
    manager.stoprefresh = 0;
  }
  });



  //funzione che serve per impostare il refresh
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

jsonBlobBackup.keepJsonBlobUpdated();



/*****************************************************************/
/*                              MAIN                             */
/*****************************************************************/
getAllStations();

/**
 * Search filter
 * @return {[type]} [description]
 */
