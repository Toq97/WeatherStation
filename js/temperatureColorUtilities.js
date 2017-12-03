/* da -5 a 45 gradi
* centrato in 20
* 2 -> 45
* -2 -> -5
* 0 -> 20
*/


var temperatureColorUtilities = {
    /*
    * recalibrate the temperature range in order to take advantage of the linear section of the arctg function
    * convert the [-5,45] interval into [-2;2]
    * 20° must be the central value
    */
    recalibrateXRange: function(celsiusT) {
        return (celsiusT - 20) * 2/25;
    },

    /*
    * recalibrate the y range of the arctg function (-Pi/2; Pi/2) in order to fit
    * the [0; 255] range of the RGB color code
    */
    recalibrateYRange: function(radiants) {
        return (radiants + (Math.PI/2)) / Math.PI * 255;
    },

    /*
    * Profit the arctg function as a inferiorly and superiorly limited function
    */
    temperatureToDecimalColor: function(celsiusT) {
        return Math.round(
                temperatureColorUtilities.recalibrateYRange(
                    Math.atan(
                        temperatureColorUtilities.recalibrateXRange(celsiusT))));
    },

    /*
    * green fixed to 0
    * return RGB bracket notation
    */
    temperatureToRGB: function(celsiusT) {
        var red = temperatureColorUtilities.temperatureToDecimalColor(celsiusT);
        var blue = 255 - red;
    
        return '(' + red + ',0,' + blue + ')';
    },

    /** test */
    testTemperatures : [-1200, -20, -5, 0, 10, 15, 20, 30, 45, 50, 1500, 2520],

    testTemperatureToDecimalColor: function(celsiusT) {
        console.log('temperature: ' + celsiusT + '; Color decimal number: ' 
            + temperatureColorUtilities.temperatureToDecimalColor(celsiusT) + '.');
    },

    /*
    * Needs JQuery
    */
    testTemperatureToRGB: function(celsiusT) {
        var $div = $('<div>');
        $('body').append($div);
        $div.css({ 'background-color': ('rgb' + temperatureColorUtilities.temperatureToRGB(celsiusT)),
                'width' : '100px',
                'height' : '40px'
        }).html(celsiusT);
    },

    test: function() {
        temperatureColorUtilities.testTemperatures.forEach(function(celsiusT) {
            temperatureColorUtilities.testTemperatureToDecimalColor(celsiusT);
            temperatureColorUtilities.testTemperatureToRGB(celsiusT);
        })
    }

}

//temperatureColorUtilities.test();