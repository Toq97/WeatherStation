//https://jsonblob.com/api/jsonBlob/0d2e6422-da8c-11e7-b7f1-f7bfe312a22e

/**
 * [function that do the JSONBLob call]
 * @param  {String} blobId [string that contains the id of the single station in JSONBlob]
 */
function getStationFromJSONBlob(blobId) {
    $.ajax({
        type: 'GET',
        url: 'https://jsonblob.com/api/jsonBlob/' + blobId +'/',
        dataType: 'json',
        success: function(response) {
          console.log("success from jBlob");
        	//console.log(response);
          manager.allData.push(response);
          if(!manager.jsonBlobCalls) {
              $('#failed-stations-list').empty();
          }
          manager.jsonBlobCalls++;
          //
          $('.jsonblob-date').html(response.datetime);
          $('#failed-stations-list').append(
            $('<li>').html(response.station.slug));
          updateLoading();

        },
        error: function(xhr, status, e) {
            console.log(status, e);
        }
       });

}

/**
 * [function that call the function getStationFromJSONBlob for each station ]
 */
function getDataFromJSONBlob() {
  manager.allData = [];
  for(var i = 0; i < slugs.length; i++) {
    getStationFromJSONBlob(slugs[i].blobId);
  }
}

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

/*function cose(i,stationObj) {
  $.ajax({
   method: 'POST',
   url: 'https://jsonblob.com/api/jsonBlob',
   headers: {
       "Content-Type": "application/json; charset=utf8"
   },
   data: JSON.stringify(stationObj),
   success: function(data,textStatus,jqXHR,bla) {
    //console.log(jqXHR)
    //console.log(bla)
    }
  }).done(function(msg,ba,bla){
    console.log(msg,ba,bla)
    console.log(bla.getAllResponseHeaders())
    console.log(bla.getAllResponseHeaders().slice(48,85))
    console.log(sli[i])

    sli[i].blobId = bla.getAllResponseHeaders().slice(48,85);
    var str = '';
    sli.forEach(function(slug) {
      str += '\n{\n\t id : \'' + slug.id + '\', \n\tslug : \'' + slug.slug + '\' \n\tblobId : \'' + slug.blobId + '\'\n},'
    });
    console.log(str)

    }).fail(function(jqXHR, textStatus){
      console.log(textStatus);
      alert('Request failed: ' + textStatus);
    });
}


function clone(obj) {
      if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

      if (obj instanceof Date)
        var temp = new obj.constructor(); //or new Date(obj);
      else
        var temp = obj.constructor();

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj['isActiveClone'] = null;
          temp[key] = clone(obj[key]);
          delete obj['isActiveClone'];
        }
      }

      return temp;
    }

*/

/**
 * [function that upload the JSONBlob with the updated stations]
 * @param  {JSON Object} newData [object that contains the single updated station]
 * @param  {String} blobId  [string that contains the id of the single station in JSONBlob]
 */
function uploadJSONBlob(newData, blobId) {
    $.ajax({
        method: 'PUT',
        url: 'https://jsonblob.com/api/jsonBlob/' + blobId,
        headers: {
            "Content-Type": "application/json; charset=utf8"
        },
        data: newData
    }).done(function(msg){
        console.log('Data Saved on JSONBlob: ' + msg);
        if(manager.allData.length === manager.slugs.length) {
    			loadDataOnDOM(manager.allData);
    		}
        //console.log(new Date());
    }).fail(function(jqXHR, textStatus){
        console.error('Request to upload JSONBlob failed: ' + textStatus);
    });
}

/**
 * [function that keep the JSONBlob updated]
 */
function keepJsonBlobUpdated() {
  var tryToCall = setInterval(function() {
    var dataNumber = manager.allData.length;

    if(!(dataNumber < slugs.length)) {
      for (var i = 0; i < manager.allData.length; i++) {
        //search the slug with the same id of the current station
        var corrSlug = findSlugFromStation(manager.allData[i]);
        var dataString = JSON.stringify(manager.allData[i]);
        uploadJSONBlob(dataString,corrSlug.blobId);
      }

      var keepUpdating = setTimeout(keepJsonBlobUpdated, 300000);
      clearInterval(tryToCall);
    }

  },2000);

}

/** aggiungere manager. quando slug sarà in manager {} **/
/**
 * [function that find the slug of the corrispondent station]
 * @param  {Object} station [object with the information of the station]
 * @return {Object}         [object with the id, the name of the station with
 *                          kebabCase and the blobId of the station]
 */
function findSlugFromStation(station) {
  var corrispSlug = slugs.filter(function(element) {
    return parseInt(element.id) === station.station.id;
  })[0];
  var slugPosition = slugs.indexOf(corrispSlug);
  return slugs[slugPosition];
}

/**
 * [function that find he blobId from the slugs array]
 * @param  {Array} slug [array that contains the id, the name of the station
 *                      with kebabCase and the blobId of the stations]
 * @return {String}      [string that contain the blobId of the station]
 */
function findBlobIdFromSlug(slug) {
  return slugs.filter(function(element) {
    return element.slug === slug;
  })[0].blobId;
}

/**
 * [function that show the error panel]
 */
function alertTorinoMeteoError() {
  $('.error-panel').show();
/*  $('#close-error-panel-btn').click(function() {
    $('.error-panel').hide();
  })*/
  /*setTimeout(function() {
    $('.error-panel').hide();
  },5000);*/
}

keepJsonBlobUpdated();
