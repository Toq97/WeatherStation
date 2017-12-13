var utilities = {
  /*
  * Deep copy an object into a new one
   */
  cloneObj: function(obj) {
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
  },

  /**
   * Sort all the obj in the main array by slug name alphabetic order
   */
  sortAllDataArray: function() {
    manager.allData.sort(function(a, b){
      if(a.station.slug < b.station.slug) return -1;
      if(a.station.slug > b.station.slug) return 1;
      return 0;
  })
},

  /**
   * [function that do the padding of the number]
   * @param  {Number} number [number that contain the date or the month or the
   *                         year or the hours or the minutes or the seconds]
   * @return {Number}        [number with the type of data passed before]
   */
  padNum: function(number) {
     if (number<10) {
       return "0"+number;
     } else {
       return number;
     }
  }
};
