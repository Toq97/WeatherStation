(function($, window, undefined) {
    //is onprogress supported by browser?
    var hasOnProgress = ("onprogress" in $.ajaxSettings.xhr());

    //If not supported, do nothing
    if (!hasOnProgress) {
        return;
    }

    //patch ajax settings to call a progress callback
    var oldXHR = $.ajaxSettings.xhr;
    $.ajaxSettings.xhr = function() {
        var xhr = oldXHR.apply(this, arguments);
        if(xhr instanceof window.XMLHttpRequest) {
            xhr.addEventListener('progress', this.progress, false);
        }

        if(xhr.upload) {
            xhr.upload.addEventListener('progress', this.progress, false);
        }

        return xhr;
    };
})(jQuery, window);

/*progress: function(e) {
  console.log(e.loaded)
      //make sure we can compute the length
      if(e.lengthComputable) {
          //calculate the percentage loaded
          var pct = (e.loaded / e.total) * 100;

          //log percentage loaded
          console.log(pct);
      }
      //this usually happens when Content-Length isn't set
      else {
          console.warn('Content Length not reported!');
      }
  }*/
