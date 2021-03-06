/**
 * @author: group 05
 * Contains all the function to manipulate the html DOM
 */

var DOM_Manipulation = {
  /**
  * [Load the json data on the page]
  * @param {Object} data - [the data to be shown]
  */
  loadDataOnDOM: function(data) {
    DOM_Manipulation.fadeOutCollapse();
  	utilities.sortAllDataArray();
  	//manager.allData = data;filterSearch.
  	$("#collapsibleContainer").empty();
  	DOM_Manipulation.createAllCollapsiblePanel(data);
  	if(manager.loadimageoption == 0){
  		panelBodyUtilities.utilitiesformanageimage();
  		manager.loadimageoption = 1;
  	}
  	DOM_Manipulation.assignCollapsibleClick(data);
    DOM_Manipulation.addEventListenerToCollapse();
    DOM_Manipulation.callOnClickEventOnCollapse();
    filterSearch.filteringAtRefresh();
    $('#collapsibleContainer').hide();
    DOM_Manipulation.fadeInCollapse();
  },

  /**
   * [function that control the collapsible panel]
   */
  assignCollapsibleClick: function(singleData){
    /**
     * [contain all the divs that contain a collapsible panel]
     * @type {DomElement}
     */
  	var acc = document.getElementsByClassName("panelHeader");

  	for (var i = 0; i < acc.length; i++) {
  		acc[i].onclick = function() {
  	    	var panel = this.nextElementSibling;
			var id = $(this).attr('id');
  	    	if (panel.style.maxHeight){
  	        	panel.style.maxHeight = null;
  	       } else {
  			      panel.style.maxHeight = "350" + "px";
  	        }
  		    panelBodyUtilities.managerpanelbodyimage(id);
            this.classList.toggle("active");

       	}
  	   }

     },

  /**
   * [function that open the selected panel when there is a refresh]
   */
  callOnClickEventOnCollapse: function(){
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
    },

  /**
   * [function that retrive index of clicked collapse]
   */
  addEventListenerToCollapse: function() {

  	$('.collapse').click(function (e){
  		var flag = null;
  		for (var item in manager.collapsibleOpenedIndex) {
  			if (manager.collapsibleOpenedIndex.hasOwnProperty(item)) {
  				if(manager.collapsibleOpenedIndex[item] == $(this).index('.collapse')) {
  					flag = manager.collapsibleOpenedIndex[item];
  				}
  		  }
  	  }
  		if (flag == null) {
  			manager.collapsibleOpenedIndex[$(this).index('.collapse')] = ($(this).index('.collapse'));
  		} else {
  			manager.collapsibleOpenedIndex[$(this).index('.collapse')] = null;
  		}
  	});
  },

  /**
   * [this function will populate the dom with all data]
   * @param  {Array} allDetectionData [contain all the data received from the API]
   */
  createAllCollapsiblePanel: function(allDetectionData) {
  	//loop for allDetectionData and call createCollapsiblePanel function
  	for (var item in allDetectionData) {
  		if (allDetectionData.hasOwnProperty(item)) {
  			DOM_Manipulation.createCollapsiblePanel(allDetectionData[item]);
  		}
  	}
  },

  /**
   * [this function will create the single collapsible panel]
   * @param  {Array} detectedDataForSinglelocation [contain all the data for a single location]
   */
  createCollapsiblePanel: function(detectedDataForSinglelocation) {
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
      var divPanelHeader = DOM_Manipulation.createPanelHeader(detectedDataForSinglelocation);
  	/**
  	 * contain the body of the location
  	 * @type {DomElement}
  	 */
      var divPanelCollapsibleBody = DOM_Manipulation.createPanelBody(detectedDataForSinglelocation , divPanelHeader);
  	collapse.append(divPanelHeader,divPanelCollapsibleBody);
  	allCollapsibleContainer.append(collapse);
  },

  /**
   * [appendHeaderData description]
   * @param  {DomElement} divPanelHeader [pannel header]
   * @param  {CSS Class} className      [name of the css class]
   * @param  {String} text           [text]
   * @param  {String/Number} data           [the data that append to the header]
   */
  appendHeaderData: function(divPanelHeader, className, data, text){
  	if (data == null || data == "") {
  		data = "NO Data";
      text = "";
  	}
  	var stationData = $('<p></p').addClass(className + " col col-headerElements")
  								 .html(" " + data + text);
       divPanelHeader.append(stationData);
  },

  /**
   * [create the header of each collapsible panel]
   * @param  {Array} detectedDataForSinglelocation [contain all the data for a single location]
   * @return {DomElement} [header of the collapsiblePanel]
   */
  createPanelHeader: function(detectedDataForSinglelocation){
  	var divPanelHeader = $('<div></div>').addClass("panelHeader")
      var stationName = $('<p></p').addClass('stationName col col-headerElements')
  	                             .html(detectedDataForSinglelocation.station.name)
  								 .attr('id',detectedDataForSinglelocation.station.nation.name);
     DOM_Manipulation.appendTemperatureBox(detectedDataForSinglelocation, divPanelHeader);
     divPanelHeader.append(stationName);
     DOM_Manipulation.appendHeaderData( divPanelHeader,'stationCity',
                                        detectedDataForSinglelocation.station.city, "");
     DOM_Manipulation.appendHeaderData( divPanelHeader, 'stationProvince',
                                       detectedDataForSinglelocation.station.province.name, "");
     DOM_Manipulation.appendHeaderData( divPanelHeader, 'stationRegion',
                                        detectedDataForSinglelocation.station.region.name, "");
     DOM_Manipulation.appendHeaderData( divPanelHeader, 'stationHumidity',
                                        detectedDataForSinglelocation.relative_humidity, " %");
     DOM_Manipulation.appendHeaderData( divPanelHeader, 'stationWind',
                                        detectedDataForSinglelocation.wind_strength, " Km/h");
     DOM_Manipulation.getFlagNation(detectedDataForSinglelocation,divPanelHeader);

     divPanelHeader.append(DOM_Manipulation.getFlagNation(detectedDataForSinglelocation));
     divPanelHeader.attr("id",detectedDataForSinglelocation.station.slug);

     return divPanelHeader;
  },

  /**
   * [append the temperatureBox to the panelHeader]
   * @param  {Object} stationData [object that contain the information of the
   * 															station]
   * @param  {DomElement} panelHeader [header of the collapsiblePanel]
   */
  appendTemperatureBox: function(stationData, panelHeader) {
  	//if historical data take the mean value
  	var temperature = stationData.temperature ?
  										stationData.temperature :
  										stationData.temperature_mean;

  	if(stationData.weather_icon){
  		panelHeader.append(
  			DOM_Manipulation.createTemperatureBox(temperature,
  								stationData.weather_icon.icon));
  	} else {
  		panelHeader.append(
  			DOM_Manipulation.createTemperatureBox(temperature));
  	}
  },

  /**
   * [create the colored box showing the temperature]
   * @param  {Number} temperature [temperature of the station]
   * @param  {String} urlIcon     [URL of the icon]
   * @return {DomElement}         [div with the temperature and the icon to
   * 															append to the header]
   */
  createTemperatureBox: function(temperature,urlIcon) {

  		var $weatherIcon = $('<img>').addClass('weather-icon');
  		if(urlIcon) {
  			$weatherIcon.attr('src', urlIcon);
  		} else {
  			$weatherIcon.attr('src', 'img/not_found_weather.png');
  		}

  		return $('<div>').addClass('temperature-box')
  										.html(temperature ? temperature + '°' : 'no T')
  										.css({'background-color': (
  											'rgb' + temperatureColorUtilities.temperatureToRGB(temperature)),
  											})
  										.append($weatherIcon);

  },

  /**
   * [create the body of each collapsible panel]
   * @param  {Array} detectedDataForSinglelocation [contain all the data for a single location]
   * @return {DomElement} divPanelCollapsibleBody [the body of the panel]
   */
  createPanelBody: function(detectedDataForSinglelocation){
  	var divPanelCollapsibleBody = $('<div></div>').addClass("panelCollapsibleBody");
      divPanelCollapsibleBody.attr("id",detectedDataForSinglelocation.station.id+"updateimage");

     return divPanelCollapsibleBody;
  },

  /**
   * [give the flag icon for the respetive state of the location]
   * @param  {Array} detectedDataForSinglelocation [contain all the data for a single location]
   * @return {DomElement}     image                          [the image to append to the header]
   */
   getFlagNation: function(detectedDataForSinglelocation){
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
  },
  /**
   * [function that animate all the collapsiblePanel with a fadeIn]
   */
  fadeInCollapse: function(){
    $( "#collapsibleContainer").fadeIn( "60000" );
  },

  /**
   * [function that animate all the collapsiblePanel at the refresh with a
   * fadeOut]
   */
  fadeOutCollapse: function(){
    $("#collapsibleContainer").fadeOut("60000");
  },
  /**
   * [function that stop/restart the refresh]
   */
  manageStopRefresh: function() {
  	if(manager.stopRefresh == 0){
      clearInterval(manager.timeOut);
      $('#buttonstoprefresh').html('START REFRESH');
      alert("Refresh stopped");
      manager.stopRefresh = 1;
    }else{
      manager.timeOut = setTimeout(getAllStations, manager.refreshtime);
      $('#buttonstoprefresh').html('STOP REFRESH');
      manager.stopRefresh = 0;
    }
  }
};
