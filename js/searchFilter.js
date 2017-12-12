/**
 * [filter function to filter the collapse elements]
 */
function filter(){
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
/**
 * [function that save the filter search when there is a refresh]
 */
function filteringAtRefresh(){
	if( refreshManager.textData != "" && (refreshManager.selectData != "-" || refreshManager.selectData != "")){
	   filter();
   } else if (refreshManager.textData != ""){
	   filter();
   } else if (refreshManager.selectData != "-" || refreshManager.selectData != ""){
	   filter();
   }
}
//add events to the input text and the select
$("#input-station-name").on("keyup", filter);
$('#select-country').on('click', filter);
