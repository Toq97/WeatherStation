var jsonBlobBackup = {

  /**
   * [function that do the JSONBLob call]
   * @param  {String} blobId [string that contains the id of the single station in JSONBlob]
  */
  getStationFromJSONBlob: function(blobId) {
      $.ajax({
          type: 'GET',
          url: 'https://jsonblob.com/api/jsonBlob/' + blobId +'/',
          dataType: 'json',
          success: function(response) {
            console.log("success from jBlob");
            manager.allData.push(response);
            if(!manager.jsonBlobCalls) {
                $('#failed-stations-list').empty();
            }
            manager.jsonBlobCalls++;
            $('.jsonblob-date').html(response.datetime);
            $('#failed-stations-list').append(
              $('<li>').html(response.station.slug));
            updateLoading();
            if(loadingPercent() == 100) loadDataOnDOM(manager.allData);

          },
          error: function(xhr, status, e) {
              console.log(status, e);
              var $showError = $('<div>');
              $showError.addClass('jsonBlob-error')
                        .html('Request to upload JSONBlob failed: ' + status);
              $('.other-comunications').append($showError);
              updateLoading();
          }
         });

  },

  /**
   * [function that call the function getStationFromJSONBlob for each station ]
   */
  getDataFromJSONBlob: function() {
    manager.allData = [];
    for(var i = 0; i < slugs.length; i++) {
      jsonBlobBackup.getStationFromJSONBlob(slugs[i].blobId);
    }
  },

  /**
   * [function that upload the JSONBlob with the updated stations]
   * @param  {JSON Object} newData [object that contains the single updated station]
   * @param  {String} blobId  [string that contains the id of the single station in JSONBlob]
   */
  uploadJSONBlob: function(newData, blobId) {
      $.ajax({
          method: 'PUT',
          url: 'https://jsonblob.com/api/jsonBlob/' + blobId,
          headers: {
              "Content-Type": "application/json; charset=utf8"
          },
          data: newData
      }).done(function(msg){
          console.log('Data Saved on JSONBlob: ' + msg);
          /*if(manager.allData.length === manager.slugs.length) {
      			loadDataOnDOM(manager.allData);
      		}*/
          //console.log(new Date());
      }).fail(function(jqXHR, textStatus){
          console.error('Request to upload JSONBlob failed: ' + textStatus);
      });
  },

  /**
   * [function that keep the JSONBlob updated]
   */
  keepJsonBlobUpdated: function() {
    var tryToCall = setInterval(function() {
      var dataNumber = manager.allData.length;

      if(!(dataNumber < slugs.length)) {
        for (var i = 0; i < manager.allData.length; i++) {
          //search the slug with the same id of the current station
          var corrSlug = jsonBlobBackup.findSlugFromStation(manager.allData[i]);
          var dataString = JSON.stringify(manager.allData[i]);
          jsonBlobBackup.uploadJSONBlob(dataString,corrSlug.blobId);
        }

        var keepUpdating = setTimeout(jsonBlobBackup.keepJsonBlobUpdated, 300000);
        clearInterval(tryToCall);
      }

    },2000);

  },

  /**
   * [function that find the slug of the corrispondent station]
   * @param  {Object} station [object with the information of the station]
   * @return {Object}         [object with the id, the name of the station with
   *                          kebabCase and the blobId of the station]
   */
  findSlugFromStation: function(station) {
    var corrispSlug = manager.slugs.filter(function(element) {
      return parseInt(element.id) === station.station.id;
    })[0];
    var slugPosition = manager.slugs.indexOf(corrispSlug);
    return manager.slugs[slugPosition];
  },

  /**
   * [function that find he blobId from the slugs array]
   * @param  {Array} slug [array that contains the id, the name of the station
   *                      with kebabCase and the blobId of the stations]
   * @return {String}      [string that contain the blobId of the station]
   */
  findBlobIdFromSlug: function(slug) {
    return manager.slugs.filter(function(element) {
      return element.slug === slug;
    })[0].blobId;
  }
};



/*
function faiLeCOse(array) {
  console.log(array[0])
  sli = [];
  for (var i = 0; i < array.length; i++) {
    var stationObj = clone(array[i]);
    sli.push({
      id : stationObj.station.id,
      slug: stationObj.station.slug,
    });
    cose(i, stationObj);

  }

  var str = '';
  sli.forEach(function(slug) {
    str += '\n{\n\t id : \'' + slug.id + '\', \n\tslug : \'' + slug.slug + '\' \n\tblobId : \'' + slug.blobId + '\'\n},'
  });
  console.log('********************')
  console.log(sli)
  console.log(str)
}



*/
/**
 * [function that show the error panel]
 */
function alertTorinoMeteoError() {
  $('.error-panel').show();
}

jsonBlobBackup.keepJsonBlobUpdated();
