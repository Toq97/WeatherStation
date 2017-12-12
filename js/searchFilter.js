/**
 * [filter function to filter the collpse elements
 * @param  {[type]}  				  [description]
 * @return {[type]}                   [description]
 */
function filter(){
	//what the user write in the input text
	var inputText = $('#input-station-name').val().toLowerCase();
	//the id of the selected option
	var selectedOption = $('#select-country')[0].selectedOptions[0].id;

	//iterate each accordion elements
    $(".collapse").each(function() {
    	//check if the id of the accordion element is equal to the selected option
    	if (selectedOption === '-' || $(this).attr('id') === selectedOption) {
    		//do the filter
      		$(this).toggle($(this).text().toLowerCase().indexOf(inputText) > -1);
  		}
      else if($(this).attr('id') != selectedOption){
  			//if the id is different, hide the element
  			$(this).hide();

  		}
   });
}

/**
 * function that take the selected nation
 * @param  {[type]} allDetectionData [description]
 * @return {[type]}                  [description]
 */
/*
function getSelectedValue(allDetectionData)
{
	$(document).ready(function(){
		 $("#select-country").on("change", function() {
			 $("#container").empty();
			 var value = $(this).val();
			 for (var i in allDetectionData) {
			 	if (allDetectionData.hasOwnProperty(i)) {
					if(value == allDetectionData[i].station.nation.name || value == "")
					{
						//console.log(value);
						getSelectNation(allDetectionData[i]);
					}
			 	}
			 }

		 });
	 });
}

*/
/**
 * function that control what nation is selected and create all the collapse
 * of that nation
 * @param  {[type]} detectedDataForSinglelocation [description]
 * @return {[type]}                               [description]
 */
/*
function getSelectNation(detectedDataForSinglelocation){
 switch(detectedDataForSinglelocation.station.nation.name){
   case "Italia":
     createCollapsiblePanel(detectedDataForSinglelocation);
     assignCollapsibleClick();
     break;
   case "Francia":
     createCollapsiblePanel(detectedDataForSinglelocation);
     assignCollapsibleClick();
     break;
   case "Svizzera":
     createCollapsiblePanel(detectedDataForSinglelocation);
     assignCollapsibleClick();
     break;
   case "undefined":
     createAllCollapsiblePanel();
     assignCollapsibleClick();
     break;
   }
}
*/
//add events to the input text and the select
$("#input-station-name").on("keyup", filter);
$('#select-country').on('click', filter);
