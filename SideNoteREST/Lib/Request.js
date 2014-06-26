// Request.js
//
//
//
//
//
// USAGE: This is used for holding all the request and building them to the proper controller.
//
//-----------------------------------------

module.exports = function RequestModel() {
    this.moduleName = 'Request';

    timeStamp = function() {
        return getDateFormat()(new Date(), "mm-dd-yyyy hh:MM:ss");
    };

    this.callBackOne = function(req, res, callType) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = callType;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();
        appLogger.info(call.callType + ' ' + 'from' + ' ' + ip + '\n' + 'variables=' + JSON.stringify(call));

        if (getAppMode() === 'development' && !call.mod || call.mod === 'test') {
            appLogger.info('No mod provided, this is a error or test call.');
            return false;
        }

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
            return false;
        }

        //check for API KEY.
        if (req.query.apikey) {
            apikey = req.query.apikey;
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            appLogger.error('apikey = ' + apikey);
            throw new Error("BAD API KEY, APIKEY is required parameter.");
            return false;
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        gModular.callType = call.callType;
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info(call.callType + ' ' + call.mod + ' ' + 'call completed.');
                    arr[0].time_stamp = this.timeStamp();
                    res.send(arr);
                } else {
                    gModular.cleanUp();
                    appLogger.error("Issue with returned data.");
                    throw new Error("Issue with returned data.");
                }
                gModular.cleanUp();
            });

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }
    };

    this.callBackTwo = function(req, res, callType) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = callType;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();
        appLogger.info(call.callType + ' ' + 'from' + ' ' + ip + '\n' + 'variables=' + JSON.stringify(call));

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
            return;
        }

        //this should be here if not we have a issue.
        if (!call.id) {
            throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
            return;
        }

        //check for API KEY.
        if (req.query.apikey) {
            apikey = req.query.apikey;
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            appLogger.error('apikey = ' + apikey);
            throw new Error("BAD API KEY, APIKEY is required parameter.");
            return;
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        gModular.callType = call.callType;
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info(call.callType + ' ' + call.mod + ' ' + 'call completed.');
                    arr[0].time_stamp = this.timeStamp();
                    res.send(arr);
                } else {
                    gModular.cleanUp();
                    appLogger.error("Issue with returned data.");
                    throw new Error("Issue with returned data.");
                }
                gModular.cleanUp();
            });

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }
    };

    this.callBackThree = function(req, res, callType) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = callType;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();
        appLogger.info(call.callType + ' ' + 'from' + ' ' + ip + '\n' + 'variables=' + JSON.stringify(call));

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
            return;
        }

        //this should be here if not we have a issue.
        if (!call.type) {
            throw new Error("BAD TYPE, TYPE is a required.");
            return;
        }

        //this should be here if not we have a issue.
        if (!call.id) {
            throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
            return;
        }

        //check for API KEY.
        if (req.query.apikey) {
            apikey = req.query.apikey;
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            appLogger.error('apikey = ' + apikey);
            throw new Error("BAD API KEY, APIKEY is required parameter.");
            return;
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        gModular.callType = call.callType;
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info(call.callType + ' ' + call.mod + ' ' + 'call completed.');
                    arr[0].time_stamp = this.timeStamp();
                    res.send(arr);
                } else {
                    gModular.cleanUp();
                    appLogger.error("Issue with returned data.");
                    throw new Error("Issue with returned data.");
                }
                gModular.cleanUp();
            });

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }
    };
};
