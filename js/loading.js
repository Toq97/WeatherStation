/**
 * [funtion that calculate the percent of the loading ]
 * @return {Number} [percent of the loading]
 */
function loadingPercent() {
  return Math.floor(manager.loadedStations / manager.slugs.length * 100);
}

/**
 * [function that update the loading state, if it's done it will hide the
 * loading]
 */
function updateLoading() {
  manager.loadedStations++;
  $('#loading-percent').html(loadingPercent() + '%');
  if(loadingPercent()  === 100) {
    //$('.loading-box').hide();
    $('.loading-box').css({'background-image' : 'url("./img/cloud_load_img.png")',
                          'background-position' : '0 0'
                          });
    $('.comunication-first h3').html('data loaded');
  }
}

/**
 * [function that show the loading]
 */
function initializeLoading() {
    manager.loadedStations = 0;
    $('#loading-percent').html(loadingPercent() + '%');
    $('.loading-box').css({'background-image' : 'url("./img/cloud_load.gif")',
                          'background-position' : '-280px -225px'
                          });
    $('.comunication-first h3').html('loading data');
    //$('.loading-box').show();
}


function sortAllDataArray() {
  manager.allData.sort(function(a, b){
    if(a.station.slug < b.station.slug) return -1;
    if(a.station.slug > b.station.slug) return 1;
    return 0;
})
}
