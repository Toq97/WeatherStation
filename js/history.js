
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



var historicalMeteo = {
  /**
   * [the function that make the call of historical data and it give the body]
   * @param  {[array]} dateArray [array whit the date of the call]
   */
  getHistoricalData: function(dateArray) {
    $.ajax({
    	url: 'https://www.torinometeo.org/api/v1/realtime/history/' + dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2] + '/',
    	type: 'GET',
    	dataType: 'JSON',
    })
    .done(function(response) {
        manager.allData = response;
    		loadingManager.updateLoading();
    		DOM_Manipulation.loadDataOnDOM(manager.allData);
        console.log(response)

    })
    .fail(function(error) {
    	console.log(error.status);
    	console.log(error.statusText);
      //TODO: manage error
    })
    .always(function() {
    	console.log("ajax historical call complete");
    	if(manager.allData.length === 111) {
    		console.log(manager.allData);
    	}
    });
  },
  /**
   * [function that give the validate of a date]
   * @param  {[String]}  textDate [the text of the date]
   * @return {Boolean}          [a boolean value]
   */
  isValidDate: function(textDate) {
    var sixMonths = 3600 * 24 * 30 * 6 * 1000;
    if(new Date(textDate) == 'Invalid Date') return false;
    var dateTimestamp = new Date(textDate).getTime();
    var todayTimestamp = new Date().getTime();
    if ((todayTimestamp - dateTimestamp) > sixMonths) return false;
    if (dateTimestamp > todayTimestamp) return false;
    return true;
  }
}
