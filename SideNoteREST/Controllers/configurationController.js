'use strict';

// -----------------------------------------------------------
//configurationController.js


//Call Types:
// POST:
// localhost/login/

// POST Variables:



// ------------------------------------------------------------
//configurationController.js

module.exports = {
    callType: 'PUT',
    init: function(req, res, call) {
        if (call.settings) {
        }
    },
    results: function(callback) {
        var data = {}
        console.log(appConfig().picr);
        callback([{
            message: 'Configurations successfully saved.',
            settings: appConfig().picr,
            error: 0
        }]);
    },
    cleanUp: function() {},
    validate: function(data) {
        return true;
    }
};
