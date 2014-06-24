// -----------------------------------------------------------
//configurationController.js


//Call Types:
// PUT:
// localhost/configuration/settings

// PUT Variables:
//<name_of_setting> = <value>

// note:
// this will modifify only one setting which is provided in the PUT variables.
// ------------------------------------------------------------
//configurationController.js

module.exports = {
    id: null,
    configuration: {},
    apikey: null,

    init: function(req, res, call) {
        // removes mod, id, callType for call obj
        Object.keys(call).forEach(function(e) {
            if (e === 'mod' || e === 'id' || e === 'callType') return true;
            this.configuration[e] = call[e];
        }, this);
        if (call.apiKey) {
            this.apikey = call.apiKey;
        }
        if (call.id) {
            this.id = call.id;
        }
    },

    results: function(callback) {
        // if(this.callType === 'GET'){
        //     this.getResults(callback);
        //     return;
        // }
        var isValid = this.validate({
            apikey: this.apikey
        });
        if (isValid !== true) {
            callback([{
                message: 'failed to save configuration settings please check errormsg for details.',
                success: 0,
                error: 04,
                errormsg: isValid,
            }]);
            return;
        }
        var configurationModel = require(MODELS + this.moduleName + 'Model');
        var c = new configurationModel();
        c.init();
        if (this.id === 'settings') {
            c.update(this.configuration, function(bool, err) {
                if (bool && !err) {
                    callback([{
                        message: 'Configuration settings successfully saved.',
                        success: 1,
                        error: 00,
                    }]);
                } else if (!bool) {
                    callback([{
                        message: 'failed to save configuration settings. This could be a db issue. Please check errormsg for details.',
                        success: 0,
                        error: 04,
                        errormsg: err,
                    }]);
                } else if (bool && err) {
                    callback([{
                        message: 'Issue with updating setting.',
                        success: 0,
                        error: 04,
                        errormsg: err,
                    }]);
                }
            });
        }
        // check id for other things you can config about the server.
        //other settings would go here!
    },

    getResults : function(callback){

    },

    cleanUp: function() {},

    validate: function(data) {
        var validateModel = getValidator();
        var v = new validateModel();
        if (v.checkAPIKEY(data.apikey) !== true) {
            return v.checkAPIKEY(data.apikey);
        }
        return true;
    }
};
