/**
 * @author: group 05
 * Contains all the utilities for the creation of panel body
 */

var panelBodyUtilities = {
  /**
   * [function that create the url of google maps]
   * @param  {[String]} nameofLocation [name of location]
   * @return {[String]}[url for google maps]
   */
  createLinkforMaps: function(nameofLocation){

      var finalResult = "";
      var mapsBaseLink = "https://www.google.it/maps/place/";

      var changename = nameofLocation.replace(" ","+");
      changename = changename.replace(" ","+");

      finalResult = mapsBaseLink+changename;

      //the link of the maps
      return finalResult;
   },
  /**
   * [Function that give the correct station for the correct panel]
   * @param  {[String]} id [the slug of station]
   * @return {[Object]}    [te object of the coprrect station]
   */
  getStationForClickedPanel: function(id){
   var detectedDataForSinglelocation = {};
      for (var item in manager.allData) {
          if (manager.allData.hasOwnProperty(item)) {
              if(manager.allData[item].station.slug == id){
                  detectedDataForSinglelocation = manager.allData[item];
              }
          }
      }
      return detectedDataForSinglelocation;
  },
  /**
   * [function that done the call for take the information of a station and update it in the body of panel]
   * @param  {[String]} id [the id of the clicked panel]
   */
  updateImageApi: function(id){
    var detectedDataForSinglelocation = panelBodyUtilities.getStationForClickedPanel(id);
    //title with the name of the place
     var collapsibleBodytitle = $('<h3></h3>');
     collapsibleBodytitle.html(detectedDataForSinglelocation.station.name+" situato nella regione "
                              + detectedDataForSinglelocation.station.region.name+" in "
                              + detectedDataForSinglelocation.station.nation.name);

     //image of the place
     if (detectedDataForSinglelocation.station.webcam == ""){
         var collapsibleBodyImage = $('<img></img>');
         collapsibleBodyImage.attr('src',"./img/immagine_default.jpeg");
         collapsibleBodyImage.addClass("collapsibleImageStyle");
     } else {
             var collapsibleBodyImage = $('<img></img>');
             collapsibleBodyImage.attr('src',detectedDataForSinglelocation.station.webcam);
             collapsibleBodyImage.addClass("collapsibleImageStyle");
    }

     //link to maps
     var collapsibleBodyMapsLink = $('<a></a>');
     collapsibleBodyMapsLink.attr(
            'href',panelBodyUtilities.createLinkforMaps(
                  detectedDataForSinglelocation.station.city));
     collapsibleBodyMapsLink.append(collapsibleBodyImage);

     var linkparagraph = $('<p></p>');
     linkparagraph.html('Il link per maps si trova all interno dell immagine');

     $("#"+detectedDataForSinglelocation.station.id+"updateimage").append(collapsibleBodytitle);
     $("#"+detectedDataForSinglelocation.station.id+"updateimage").append(collapsibleBodyMapsLink);
     $("#"+detectedDataForSinglelocation.station.id+"updateimage").append(linkparagraph);
  },
  /**
   * [function that control when the pannel open, the body of pannel is empty]
   * @param  {[String]} id [id of the station]
   */
  managerpanelbodyimage: function(id){
    for (var item in manager.collapsebody){
      if (manager.collapsebody[item].id == id) {
        if(manager.collapsebody[item].count == 0){
          //libera il corpo del pannelo ogni volta che lo apro, in modo tale che
          //non venga caricato più volte il materiale nel body del pannello
          for(var items in manager.allData) {
             if (manager.allData[items].station.slug == id) {
               $('#'+manager.allData[items].station.id+'updateimage').empty();
            }
          }
          panelBodyUtilities.updateImageApi(id);
          manager.collapsebody[item].count  = 1;
       } else {
         manager.collapsebody[item].count  = 0;
       }
    }
   }
 },

  /**
   * [function that give utilities for manage the update of the image]
   */
  utilitiesformanageimage: function(){
  //serve per caricare l'oggetto del manager con i'id appartenente alla stazione in modo tale che quando
  //utilizzero manager potrò utilizzare quello associato alla stazione
    for(var item in manager.allData){
      var testobject= {
        id: "",
        count: 0,
        deleteimage:  ""
      };
      testobject.id =  manager.allData[item].station.slug;
      manager.collapsebody.push(testobject);
    }
  },

  /**
   * [function that print in the header the time of last update call]
   */
  dateutilities: function(){

    var dateupdatetest = new Date();
    var dateupdateprint= "Last Update: " + utilities.padNum(dateupdatetest.getDate()) + "/"
        + utilities.padNum(dateupdatetest.getMonth()) + "/" + dateupdatetest.getFullYear() + " "
        + utilities.padNum(dateupdatetest.getHours()) + ":"
        + utilities.padNum(dateupdatetest.getMinutes())
        + ":" + utilities.padNum(dateupdatetest.getSeconds());

    $('#updatedate').html(dateupdateprint);
  }
};
