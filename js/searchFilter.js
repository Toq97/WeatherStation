/**
 * @author: group 05
 * Contains all the function to filter the meteo stations
 */

var filterSearch = {
	/**
	 * [function that save the filter search when there is a refresh]
	 */
	filteringAtRefresh: function(){
		if( refreshManager.textData != "" && (refreshManager.selectData != "-" || refreshManager.selectData != "")){
		   filterSearch.filter();
	   } else if (refreshManager.textData != ""){
		   filterSearch.filter();
	   } else if (refreshManager.selectData != "-" || refreshManager.selectData != ""){
		   filterSearch.filter();
	   }
	},

	/**
	 * [filter function to filter the collapse elements]
	 */
	filter: function(){
		//what the user write in the input text
		var inputText = $('#input-station-name').val().toLowerCase();
		//the id of the selected option
		var selectedOption = $('#select-country')[0].selectedOptions[0].id;

		//iterate each accordion elements
	    $(".stationName").each(function() {
	    	//check if the id of the accordion element is equal to the selected option
	    	if (selectedOption === '-' || $(this).attr('id') === selectedOption) {
	    		//do the filter
	      		$(this).closest(".collapse").toggle($(this).text().toLowerCase().indexOf(inputText) > -1);
	  		}
	      else if($(this).attr('id') != selectedOption){
	  			//if the id is different, hide the element
	  			$(this).closest(".collapse").hide();
	  		}
	   });
	refreshManager.selectData = selectedOption;
	refreshManager.textData = inputText;
	}
};
