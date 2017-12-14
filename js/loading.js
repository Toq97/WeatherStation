/**
 * @Author: group 05
 * Contains all the functions to show the loading status of the calls
 */

var loadingManager = {
  /**
   * [funtion that calculate the percent of the loading ]
   * @return {Number} [percent of the loading]
   */
  loadingPercent: function() {
    return Math.floor(manager.loadedStations / manager.slugs.length * 100);
  },

  /**
   * [function that update the loading state, if it's done it will hide the
   * loading]
   */
  updateLoading: function() {
    manager.loadedStations++;
    $('#loading-percent').html(loadingManager.loadingPercent() + '%');
    if(loadingManager.loadingPercent()  === 100) {
      $('.loading-box').css({'background-image' : 'url("./img/cloud_load_img.png")',
                            'background-position' : '0 0'
                            });
      $('.comunication-first h3').html('data loaded');
    }
  },

  /**
   * [function that show the loading]
   */
  initializeLoading: function() {
      manager.loadedStations = 0;
      $('#loading-percent').html(loadingManager.loadingPercent() + '%');
      $('.loading-box').css({'background-image' : 'url("./img/cloud_load.gif")',
                            'background-position' : '-280px -225px'
                            });
      $('.comunication-first h3').html('loading data');
  }
};
