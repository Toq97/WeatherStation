function loadingPercent() {
  return Math.floor(manager.loadedStations / manager.slugs.length * 100);
}

function updateLoading() {
  manager.loadedStations++;
  $('#loading-percent').html(loadingPercent() + '%');
  if(loadingPercent()  === 100) {
    //$('.loading-box').hide();
    $('.loading-box').css({'background-image' : 'url("./img/cloud_load_img.png")',
                          'background-position' : '0 0'
                          });
  }
}

function initializeLoading() {
    manager.loadedStations = 0;
    $('#loading-percent').html(loadingPercent() + '%');
    $('.loading-box').css({'background-image' : 'url("./img/cloud_load.gif")',
                          'background-position' : '-280px -225px'
                          });
    //$('.comunication-first img').hide();
    //$('.loading-box').show();
}
