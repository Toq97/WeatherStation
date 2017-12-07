/**
 * @Author: stefanotortone
 * @Date:   2017-12-07T11:43:44+01:00
 * @Last modified by:   stefanotortone
 * @Last modified time: 2017-12-08T00:20:51+01:00
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
 * [function that done the call for take the information of a station and update it in the body of panel]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function updateImageApi(id){

//commento che serve piu tardi spero non dia fastidio a nessuno

      //$('.collapse').click(function(event){
       //prendere l'id del panel, cioè quello della stazione
      //  var falseid = $(this).attr('id');
      //  var id = falseid.replace("#","");
      // console.log(id);

       $.ajax({
         //chiamata con l'id
         url: "https://www.torinometeo.org/api/v1/realtime/data/"+id+"/",
         type: 'GET',
         dataType: 'JSON',
       })
         .done(function(detectedDataForSinglelocation) {
         //var divPanelCollapsibleBody = $(".panelCollapsibleBody");

         //title with the name of the place
         var collapsibleBodytitle = $('<h3></h3>');
         collapsibleBodytitle.html(detectedDataForSinglelocation.station.name+" situato nella regione "+detectedDataForSinglelocation.station.region.name+" in "+ detectedDataForSinglelocation.station.nation.name);

         //image of the place
         var collapsibleBodyImage = $('<img></img>');
         collapsibleBodyImage.attr('src',detectedDataForSinglelocation.station.webcam);
         collapsibleBodyImage.addClass("collapsibleImageStyle");

         //link to maps
         var collapsibleBodyMapsLink = $('<a></a>');
         collapsibleBodyMapsLink.attr('href',createLinkforMaps(detectedDataForSinglelocation.station.city));
         collapsibleBodyMapsLink.append(collapsibleBodyImage);

         $("#"+detectedDataForSinglelocation.station.id+"updateimage").append(collapsibleBodytitle);
         $("#"+detectedDataForSinglelocation.station.id+"updateimage").append(collapsibleBodyMapsLink);

        //deleteimagetest ="#"+detectedDataForSinglelocation.station.id+"updateimage";



 })
 .fail(function(error) {
   console.log(error);
   console.log(error.status);
   console.log(error.statusText);
   //display the error data into page
 })
 .always(function() {
   console.log("ajax call for image complete");
 });
//);


}


/**
 * [function that control when the pannel open, the body of pannel is empty]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function managerpanelbodyimage(id){

for (var item in manager.collapsebody){



      if (manager.collapsebody[item].id == id)
      {
        if(manager.collapsebody[item].count == 0){
          //libera il corpo del pannelo ogni volta che lo apro, in modo tale che non venga caricato più volte il materiale nel body del pannello
          $(".panelCollapsibleBody").empty();
           console.log(manager.collapsebody[item].count);
          updateImageApi(id);
          //manager.collapsebody[item].deleteimage = deleteimagetest;
         //console.log(manager.collapsebody[item].deleteimage);
         manager.collapsebody[item].count  = 1;
       } else {
         manager.collapsebody[item].count  = 0;
         //$(manager.collapsebody[item].deleteimage).empty();

       }

      }

}
}


/**
 * [function that give utilities for manage the update of the image]
 * @return {[type]} [description]
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

//console.log(manager.collapsebody);
}
