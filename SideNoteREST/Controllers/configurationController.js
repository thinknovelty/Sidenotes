// -----------------------------------------------------------
//configurationController.js


//Call Types:
// PUT:
// localhost/configuration/settings

// PUT Variables:
//<name_of_setting> & <value>

// note:
// this will modifify only the settings which you provide in the call.
// ------------------------------------------------------------
//configurationController.js

module.exports = {
    callType: 'PUT',
    id: null,
    configuration: {},
    init: function(req, res, call) {
        // removes mod, id, callType for call obj
        Object.keys(call).forEach(function(e) {
            if(e === 'mod'|| e === 'id'|| e === 'callType') return true;
            this.configuration[e] = call[e];
        }, this);
    },
    results: function(callback) {
        if (this.id === 'settings') {
            this.setSettings(function(bool, err) {
                if (bool) {
                    callback([{
                        message: 'Configurations successfully saved.',
                        settings: appConfig().picr,
                        error: 00
                    }]);
                } else {
                    callback([{
                        message: 'Configurations save failed.',
                        settings: appConfig().picr,
                        error: 04,
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
