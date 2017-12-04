/**
 * [getApiData get all json weather Data from API]
 * @return {[type]} [description]
 */
var collapsibleOpenedIndex = [];

function getApiData() {
$.ajax({
	url: 'https://www.torinometeo.org/api/v1/realtime/data/',
	type: 'GET',
	dataType: 'JSON',
})
.done(function(allDetectionData) {
	console.log("success");
	console.log(allDetectionData);
	$("#container").empty();
	createAllCollapsiblePanel(allDetectionData);
	assignCollapsibleClick();
  addEventListenerToCollapse();



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
	 var timeOut = setTimeout(getApiData, 10000);
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
	//	console.log(acc);
		acc[i].onclick = function() {
	    	this.classList.toggle("active");
	    	var panel = this.nextElementSibling;
	    	if (panel.style.maxHeight){
	        	panel.style.maxHeight = null;
	        } else {
	        	panel.style.maxHeight = panel.scrollHeight + "px";
	        }
     	}
for (var item in collapsibleOpenedIndex) {
	if (item == i) {
		acc[i].onclick();
	}
}

	}
}

/**
 * [addEventListenerToCollapse function that retrive index of clicked collapse]
 */
function addEventListenerToCollapse() {
	var flag = null;
	$('.collapse').click(function (e){
	for (var item in collapsibleOpenedIndex) {
		if(collapsibleOpenedIndex[item] == $(this).index('.collapse'))
		{
			flag = item;
		}
    }
	if (flag == null){
		collapsibleOpenedIndex.push($(this).index('.collapse'));
	} else {
		collapsibleOpenedIndex.splice(flag,1);
	}

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
}/**
 * [addEventListenerToCollapse description]
 */

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
 /** 
  * Gian: a me la riga successiva dà un errore e spacca tutto. Credo sia dovuto al fatto che nextElementSibling è
  * una proprietà degli elementi del DOM e non degli oggetti JQuery
  * Sostituendolo con next() dovrebbe sistemarsi.
  * Un altro errore credo sia dovuto al fatto che panel non è globale e quindi non sa chi sia
  */
  //divPanelHeader.next().style.maxHeight = panel.scrollHeight + "px";

	divPanelHeader.append(
		createTemperatureBox(detectedDataForSinglelocation.temperature,
							detectedDataForSinglelocation.weather_icon.icon));
  //divPanelHeader[0].style.maxHeight = divPanelHeader[0].scrollHeight + "px";


    return divPanelHeader;

}
/**
 * create the colored box showing the temperature
 */
function createTemperatureBox(temperature,urlIcon) {
	var $weatherIcon = $('<img>').attr('src', urlIcon)
								.addClass('weather-icon');
	return $('<div>').addClass('temperature-box')
									//.html(temperature + '°')
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
function createPanelBody(detectedDataForSinglelocation , divPanelHeader){
	var divPanelCollapsibleBody = $('<div></div>').addClass("panelCollapsibleBody").html(detectedDataForSinglelocation.station.name +" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dosto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat");

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

/*****************************************************************/
                         /*MAIN*/
/*****************************************************************/
getApiData();

/*$( "#input-station-name" ).change(function() {
  var str = "";
	str += $(this.text());

});*/
//window.setTimeout(refreshPage, 30000);
