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
    $('.loading-box').hide();
    $('.comunication-first img').show();
  }
}

/**
 * [function that show the loading]
 */
function initializeLoading() {
    manager.loadedStations = 0;
    $('#loading-percent').html(loadingPercent() + '%');
    $('.comunication-first img').hide();
    $('.loading-box').show();
}
