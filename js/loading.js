function loadingPercent() {
  return Math.floor(manager.loadedStations / manager.slugs.length * 100);
}

function updateLoading() {
  manager.loadedStations++;
  $('#loading-percent').html(loadingPercent() + '%');
  if(loadingPercent()  === 100) {
    $('.loading-box').hide();
  }
}

function initializeLoading() {
    manager.loadedStations = 0;
    //$('.loading-box').show();
}
