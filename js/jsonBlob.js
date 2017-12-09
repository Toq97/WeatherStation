//https://jsonblob.com/api/jsonBlob/0d2e6422-da8c-11e7-b7f1-f7bfe312a22e

/**
 * [getDataFromJSONBlob description]
 * @return {[type]} [description]
 */
function getDataFromJSONBlob() {
    $.ajax({
        type: 'GET',
        url: 'https://jsonblob.com/api/jsonBlob/0d2e6422-da8c-11e7-b7f1-f7bfe312a22e',
        dataType: 'json',
        success: function(response) {
          console.log("success from jBlob");
        	console.log(response);
          $('.jsonblob-date').html(response[0].datetime);
          //load the data on the page
          loadDataOnDOM(response);
        },
        error: function(xhr, status, e) {
            console.log(status, e);
        }
       });

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
 * [uploadJSONBlob description]
 * @param  {[type]} newData [description]
 * @return {[type]}         [description]
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
        //console.log(new Date());
    }).fail(function(jqXHR, textStatus){
        console.error('Request to upload JSONBlob failed: ' + textStatus);
    });
}

function keepJsonBlobUpdated() {
  var tryToCall = setInterval(function() {
    if(!!manager.allData.length) {
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
function findSlugFromStation(station) {
  var corrispSlug = slugs.filter(function(element) {
    return parseInt(element.id) === station.station.id;
  })[0];
  var slugPosition = slugs.indexOf(corrispSlug);
  return slugs[slugPosition];
}

function alertTorinoMeteoError() {
  $('.error-panel').show();
  $('#close-error-panel-btn').click(function() {
    $('.error-panel').hide();
  })
}

keepJsonBlobUpdated();
