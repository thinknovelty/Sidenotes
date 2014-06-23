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

    this.getCallBack = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'GET';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('GET from ' + ip);

        if (getAppMode() === 'development' && !call.mod || call.mod === 'test') {
            appLogger.info('No mod provided, this is a error or test call.');
            return;
        }

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
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

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('GET ' + call.mod + ' complete..');
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

    this.getCallBackTwo = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'GET';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('GET from ' + ip);

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

        appLogger.info(JSON.stringify(call));

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('GET ' + call.mod + ' complete..');
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

    this.getCallBackThree = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'GET';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info('GET from ' + ip);
        appLogger.info(JSON.stringify(call));

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

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('GET ' + call.mod + ' complete..');
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

    this.postCallBack = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'POST';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('Post from ' + ip);

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('POST ' + call.mod + ' complete..');
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

    this.postCallBackTwo = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'POST';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('POST from ' + ip);

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //this should be here if not we have a issue.
        if (!call.id) {
            throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
            return;
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('POST ' + call.mod + ' complete..');
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

    this.postCallBackThree = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'POST';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('Post from ' + ip);

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
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

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('POST ' + call.mod + ' complete..');
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

    this.putCallBack = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'PUT';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('PUT from ' + ip);

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('PUT ' + call.mod + ' complete..');
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

    this.putCallBackTwo = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'PUT';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('PUT from ' + ip);

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //this should be here if not we have a issue.
        if (!call.id) {
            throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
            return;
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('PUT ' + call.mod + ' complete..');
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

    this.putCallBackThree = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'PUT';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('PUT from ' + ip);

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //this should be here if not we have a issue.
        if (!call.id) {
            throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
            return;
        }

        //this should be here if not we have a issue.
        if (!call.type) {
            throw new Error("BAD TYPE, TYPE is a required.");
            return;
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('PUT ' + call.mod + ' complete..');
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

    this.deleteCallBack = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'DELETE';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('DELETE from ' + ip);

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('DELETE ' + call.mod + ' complete..');
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

    this.deleteCallBackTwo = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'DELETE';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('DELETE from ' + ip);

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //this should be here if not we have a issue.
        if (!call.id) {
            throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
            return;
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('DELETE ' + call.mod + ' complete..');
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

    this.deleteCallBackThree = function(req, res) {
        //required parameters
        var apikey = null;
        var call = extend(true, req.params, req.body);
        call.callType = 'DELETE';
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var gModular = null;
        var validatorModel = getValidator();

        appLogger.info(JSON.stringify(call));
        appLogger.info('DELETE from ' + ip);

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //this should be here if not we have a issue.
        if (!call.id) {
            throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
            return;
        }

        //this should be here if not we have a issue.
        if (!call.type) {
            throw new Error("BAD TYPE, TYPE is a required.");
            return;
        }

        var v = new validatorModel();
        if (!v.checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        //creates main controller and mix in to our module:
        var bController = getControllerBase();
        var cb = new bController(call.mod);
        gModular = extend(true, cb, require(GLOBAL.CONTROLLERS + call.mod + 'Controller'));

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.mod + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }
        gModular.init(req, res, call);

        try {
            gModular.results(function(arr) {

                if (arr && Array.isArray(arr)) {
                    appLogger.info('DELETE ' + call.mod + ' complete..');
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
