getApiData();

/**
 * [getApiData get all json weather data from API]
 * @return {[type]} [description]
 */
function getApiData() {
$.ajax({
	url: 'https://www.torinometeo.org/api/v1/realtime/data/',
	type: 'GET',
	dataType: 'JSON',
})
.done(function(data) {
	console.log("success");
	console.log(data);
	console.log(data[105])
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
	 * [timer call the setTimeout for looping the GetApiData() function]
	 * @type {[type]}
	 */
//	var timer = setTimeout(myFunction, 30000);
}

aja
