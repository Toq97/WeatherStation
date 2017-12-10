$('#history-btn').click(function() {
  //stop standard call
  manager.standardCallActive = false;
  var inputDate = $('.history-box input').val();
  manager.allData = [];
  if(isValidDate(inputDate)) getHistoricalData(dateArray);
})

function isValidDate(textDate) {
  var sixMonths = 3600 * 24 * 30 * 6 * 1000;
  if(new Date(textDate) == 'Invalid Date') return false;
  var dateTimestamp = new Date(textDate).getTime();
  var todayTimestamp = new Date().getTime();
  if ((todayTimestamp - dateTimestamp) > sixMonths) return false;
  if (dateTimestamp > todayTimestamp) return false;
  return true;
}

function getHistoricalData(dateArray) {
  $.ajax({
  	url: 'https://www.torinometeo.org/api/v1/realtime/history/' + dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2] + '/',
  	type: 'GET',
  	dataType: 'JSON',
  })
  .done(function(response) {
      manager.allData = response;
  		updateLoading();
  		//if(manager.allData.length === manager.slugs.length) {
  			loadDataOnDOM(manager.allData);
  		//}
  		/*dateutilities();
  		$('#refreshtime').attr('placeholder',manager.refreshtime);*/
      console.log(response)

  })
  .fail(function(error) {
  	//alertTorinoMeteoError();
  	console.log(error.status);
  	console.log(error.statusText);
  	//display the error data into page
  	//alertTorinoMeteoError();
  	//get the station from the backup API
  	//getStationFromJSONBlob(findBlobIdFromSlug(slug));
  })
  .always(function() {
  	console.log("ajax historical call complete");
  	if(manager.allData.length === 111) {
  		console.log(manager.allData);
  	}

  });
}
