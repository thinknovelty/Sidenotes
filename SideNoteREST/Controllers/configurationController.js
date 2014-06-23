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
    id: null,
    init: function(req, res, call) {
        if (call.settings) {}
        if (call.id) {
            this.id = call.id;
        }
    },
    results: function(callback) {
        if (this.id === 'settings') {
            this.setSettings(function(bool, err) {
                if (bool) {
                    callback([{
                        message: 'Configurations successfully saved.',
                        settings: appConfig().picr,
                        error: 0
                    }]);
                } else {
                    callback([{
                        message: 'Configurations save failed.',
                        settings: appConfig().picr,
                        error: 0,
                        errormsg: err
                    }]);
                }
            });
        }

        //other settings would go here!
    },

    setSettings: function(callback) {
        callback(true, null);
    },

    cleanUp: function() {},
    validate: function(data) {
        return true;
    }
};
