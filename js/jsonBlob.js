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
          console.log("success");
        	console.log(response);
          //load the data on the page
          loadDataOnDOM(response);
        },
        error: function(xhr, status, e) {
            console.log(status, e);
        }
       });

}

/**
 * [uploadJSONBlob description]
 * @param  {[type]} newData [description]
 * @return {[type]}         [description]
 */
function uploadJSONBlob(newData) {
    $.ajax({
        method: 'PUT',
        url: 'https://jsonblob.com/api/jsonBlob/0d2e6422-da8c-11e7-b7f1-f7bfe312a22e',
        headers: {
            "Content-Type": "application/json; charset=utf8"
        },
        data: newData
    }).done(function(msg){
        console.log('Data Saved on JSONBlob: ' + msg);
        console.log(new Date());
    }).fail(function(jqXHR, textStatus){
        console.error('Request to upload JSONBlob failed: ' + textStatus);
    });
}

function keepJsonBlobUpdated() {
  var tryToCall = setInterval(function() {
    if(!!Object.keys(manager.allData).length) {
      var dataString = JSON.stringify(manager.allData);
      uploadJSONBlob(dataString);
      var keepUpdating = setTimeout(keepJsonBlobUpdated, 300000);
      clearInterval(tryToCall);
  }

  },2000);

}

keepJsonBlobUpdated();
