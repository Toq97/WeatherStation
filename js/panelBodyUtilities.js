/**
 * @Author: stefanotortone
 * @Date:   2017-12-07T11:43:44+01:00
 * @Last modified by:   stefanotortone
 * @Last modified time: 2017-12-12T15:19:52+01:00
 */



//file with utilities for the creation of panel body

/**
 * [function that create the url of google maps]
 * @param  {[String]} nameofLocation [name of location]
 * @return {[String]}[url for google maps]
 */
var createLinkforMaps = function(nameofLocation){

    var finalResult = "";
    var mapsBaseLink = "https://www.google.it/maps/place/";

    var changename = nameofLocation.replace(" ","+");
    changename = changename.replace(" ","+");

    finalResult=mapsBaseLink+changename;

    //the link of the maps
    return finalResult;
 }

/**
 * [Function that give the correct station for the correct panel]
 * @param  {[String]} id [the slug of station]
 * @return {[Object]}    [te object of the coprrect station]
 */
function getStationForClickedPanel(id){
 var detectedDataForSinglelocation = {};
    for (var item in manager.allData) {
        if (manager.allData.hasOwnProperty(item)) {
            if(manager.allData[item].station.slug == id){
                detectedDataForSinglelocation = manager.allData[item];
            }
        }
    }
    return detectedDataForSinglelocation;
}
/**
 * [function that done the call for take the information of a station and update it in the body of panel]
 * @param  {[String]} id [the id of the clicked panel]
 */
function updateImageApi(id){



        var detectedDataForSinglelocation = getStationForClickedPanel(id);


        //title with the name of the place
         var collapsibleBodytitle = $('<h3></h3>');
         collapsibleBodytitle.html(detectedDataForSinglelocation.station.name+" situato nella regione "+detectedDataForSinglelocation.station.region.name+" in "+ detectedDataForSinglelocation.station.nation.name);

         //image of the place
         if (detectedDataForSinglelocation.station.webcam == ""){
             var collapsibleBodyImage = $('<img></img>');
             collapsibleBodyImage.attr('src',"./img/immagine_default.jpeg");
             collapsibleBodyImage.addClass("collapsibleImageStyle");
         } else {
             var collapsibleBodyImage = $('<img></img>');
             collapsibleBodyImage.attr('src',detectedDataForSinglelocation.station.webcam);
             collapsibleBodyImage.attr('alt',"Errore nel caricamento dell'immagine");
             collapsibleBodyImage.addClass("collapsibleImageStyle");
        }

         //link to maps
         var collapsibleBodyMapsLink = $('<a></a>');
         collapsibleBodyMapsLink.attr('href',createLinkforMaps(detectedDataForSinglelocation.station.city));
         collapsibleBodyMapsLink.append(collapsibleBodyImage);

         var linkparagraph = $('<p></p>');
         linkparagraph.html('Il link per maps si trova all interno dell immagine');

         $("#"+detectedDataForSinglelocation.station.id+"updateimage").append(collapsibleBodytitle);
         $("#"+detectedDataForSinglelocation.station.id+"updateimage").append(collapsibleBodyMapsLink);
         $("#"+detectedDataForSinglelocation.station.id+"updateimage").append(linkparagraph);



}


/**
 * [function that control when the pannel open, the body of pannel is empty]
 * @param  {[String]} id [id of the station]
 */
function managerpanelbodyimage(id){

for (var item in manager.collapsebody){



      if (manager.collapsebody[item].id == id)
      {
        if(manager.collapsebody[item].count == 0){
          //libera il corpo del pannelo ogni volta che lo apro, in modo tale che non venga caricato più volte il materiale nel body del pannello
          for(var items in manager.allData)
          {
             if (manager.allData[items].station.slug == id)
            {
                   $('#'+manager.allData[items].station.id+'updateimage').empty();
            }
          }
          updateImageApi(id);
         manager.collapsebody[item].count  = 1;
       } else {
         manager.collapsebody[item].count  = 0;

       }

      }

}


}


/**
 * [function that give utilities for manage the update of the image]
 */
function utilitiesformanageimage(){

//serve per caricare l'oggetto del manager con i'id appartenente alla stazione in modo tale che quando utilizzero manager potrò utilizzare quello associato alla stazione
  for(var item in manager.allData){
    var testobject=
    {
      id: "",
      count: 0,
      deleteimage:  ""
    }

    testobject.id =  manager.allData[item].station.slug;
    manager.collapsebody.push(testobject);

  }


}


/**
 * [function that print in the header the time of last update call]
 */
function dateutilities(){


  var dateupdatetest = new Date();

  var dateupdateprint= "Last Update: "+padNum(dateupdatetest.getDate())+"/"+padNum(dateupdatetest.getMonth())+"/"+dateupdatetest.getFullYear()+ " "+padNum(dateupdatetest.getHours())+":"+padNum(dateupdatetest.getMinutes())+":"+padNum(dateupdatetest.getSeconds());

  $('#updatedate').html(dateupdateprint);

}


/**
 * [function that do the padding of the number]
 * @param  {Number} number [number that contain the date or the month or the
 *                         year or the hours or the minutes or the seconds]
 * @return {Number}        [number with the type of data passed before]
 */
function padNum(number)
{
   if (number<10)
   {
     return "0"+number;
   }else
   {
     return number;
   }

   return number<10 ? '0' + number : number;

}

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

if(newrefreshtime.value >= 15000){

  manager.refreshtime = newrefreshtime.value;
  clearInterval(manager.timeOut);
  manager.timeOut = setTimeout(getAllStations, manager.refreshtime);

}else{
  alert("Refresh value too low. Minimum value is 15000ms");
}

});
