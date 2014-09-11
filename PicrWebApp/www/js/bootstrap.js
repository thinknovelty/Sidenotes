//JLH - Created 09/10/2014

// This docutment is for anything we 
// want to run before the applicaiton starts
// if you add your code to the .ready section it should 
// run as soon as the document is ready.

//Addes to the string object;
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

(function($) {
    'use strict';
    $(document).ready(function() {
        //I will trigger a event so I can know when my document is ready.
        console.log("Document is ready launching document ready event.");
        //this code will run when the document is readyt to launch.
    });
})(jQuery);

// runs the startApp.js
require(["startApp"], function(StartApp) {
    StartApp.initialize();
    console.log("Boot process completed.");
});