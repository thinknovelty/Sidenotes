// Request.js
var moduleName = 'Request';

var timeStamp = function() {
    var currentdate = new Date();
    var timeStamped = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return timeStamped;
};

module.exports = {

    getCallBack: function(req, res) {
        //required parameters
        var apikey = null;
        var call = {
            module: null,
            callType: 'GET',
            type: null,
            id: null
        };

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Get call from ' + ip);

        if(!req.params.mod || req.params.mod  === 'test'){
            appLogger().info('No mod provided, this is a error or test call.');
            return;
        }

        //this should be here if not we have a issue.
        call.module = req.params.mod;

        //check for API KEY.
        if (req.query.apikey) {
            apikey = req.query.apikey;
        }

        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            appLogger().error('apikey = ' + apikey);
            throw new Error("BAD API KEY, APIKEY is required parameter.");
            return;
        }

        appLogger().info(JSON.stringify(call));

        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');
        gModular.init(req, res);

        finalObj = gModular.results();
        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Get call ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
        gModular.cleanUp();
    },
    getCallBackTwo: function(req, res) {
        //required parameters
        var apikey = null;
        var call = {
            module: null,
            callType: 'GET',
            type: null,
            id: null
        };

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Get call from ' + ip);

        //this should be here if not we have a issue.
        if (req.params.mod) {
            call.module = req.params.mod;
        } else {
            throw new Error("BAD MODULAR, MODULAR is a required.");
            return;
        }

        //this should be here if not we have a issue.
        if (req.params.id) {
            call.id = req.params.id;
        } else {
            throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
            return;
        }

        //check for API KEY.
        if (req.query.apikey) {
            apikey = req.query.apikey;
        }

        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            appLogger().error('apikey = ' + apikey);
            throw new Error("BAD API KEY, APIKEY is required parameter.");
            return;
        }

        appLogger().info(JSON.stringify(call));

        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');
        gModular.init(req, res);

        finalObj = gModular.results();
        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Get call ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
        gModular.cleanUp();
    },
    getCallBackThree: function(req, res) {
        //required parameters
        var apikey = null;
        var call = {
            module: null,
            callType: 'GET',
            type: null,
            id: null
        };

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Get call from ' + ip);

        //this should be here if not we have a issue.
        if (req.params.mod) {
            call.module = req.params.mod;
        } else {
            throw new Error("BAD MODULAR, MODULAR is a required.");
            return;
        }

        //this should be here if not we have a issue.
        if (req.params.type) {
            call.type = req.params.type;
        } else {
            throw new Error("BAD TYPE, TYPE is a required.");
            return;
        }

        //this should be here if not we have a issue.
        if (req.params.id) {
            call.id = req.params.id;
        } else {
            throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
            return;
        }

        //check for API KEY.
        if (req.query.apikey) {
            apikey = req.query.apikey;
        }

        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            appLogger().error('apikey = ' + apikey);
            throw new Error("BAD API KEY, APIKEY is required parameter.");
            return;
        }

        appLogger().info(JSON.stringify(call));

        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');
        gModular.init(req, res);

        finalObj = gModular.results();
        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Get call ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
        gModular.cleanUp();
    },

    postCallBack: function(req, res) {

        var apikey = null;

        var call = extend(true, req.params, req.body);
        call.callType = 'POST';

        appLogger().info(JSON.stringify(call));


        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Post from ' + ip);

        //this should be here if not we have a issue.
        if (!call.mod) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //check for API KEY.
        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        gModular = require(GLOBAL.CONTROLLERS + call.mod + 'Controller');

        if (!gModular) {
            throw new Error("Cannot find " + call.mod + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.module + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }

        try {
            gModular.init(req, res, call);
            finalObj = gModular.results();

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }

        gModular.cleanUp();

        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Post ' + call.mod + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
    },
    postCallBackTwo: function(req, res) {

        var apikey = null;
        var call = {
            module: req.params.mod,
            callType: 'POST'
        };

        call = extend(true, req.body, call);

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Post from ' + ip);

        //this should be here if not we have a issue.
        if (!call.module) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //check for API KEY.
        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        appLogger().info(JSON.stringify(call));
        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');

        if (!gModular) {
            throw new Error("Cannot find " + call.module + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error("A POST call is required for " + call.module + 'Controller.js');
        }

        try {
            gModular.init(req, res, call);
            finalObj = gModular.results();

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }

        gModular.cleanUp();

        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Post ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
    },
    postCallBackThree: function(req, res) {

        var apikey = null;
        var call = {
            module: req.params.mod,
            callType: 'POST'
        };

        call = extend(true, req.body, call);

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Post from ' + ip);

        //this should be here if not we have a issue.
        if (!call.module) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //check for API KEY.
        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        appLogger().info(JSON.stringify(call));
        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');

        if (!gModular) {
            throw new Error("Cannot find " + call.module + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error("A POST call is required for " + call.module + 'Controller.js');
        }

        try {
            gModular.init(req, res, call);
            finalObj = gModular.results();

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }

        gModular.cleanUp();

        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Post ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
    },

    putCallBack: function(req, res) {

        var apikey = null;
        var call = {
            module: req.params.mod,
            callType: 'PUT'
        };

        call = extend(true, req.body, call);

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('PUT from ' + ip);

        //this should be here if not we have a issue.
        if (!call.module) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //check for API KEY.
        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        appLogger().info(JSON.stringify(call));
        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');

        if (!gModular) {
            throw new Error("Cannot find " + call.module + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error(call.module + 'Controller.js' + ' is desgined for a ' + gModular.callType + ' call.');
        }

        try {
            gModular.init(req, res, call);
            finalObj = gModular.results();

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }
        gModular.cleanUp();

        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('PUT ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
    },
    putCallBackTwo: function(req, res) {

        var apikey = null;
        var call = {
            module: req.params.mod,
            callType: 'PUT'
        };

        call = extend(true, req.body, call);

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Post from ' + ip);

        //this should be here if not we have a issue.
        if (!call.module) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //check for API KEY.
        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        appLogger().info(JSON.stringify(call));
        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');

        if (!gModular) {
            throw new Error("Cannot find " + call.module + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error("A POST call is required for " + call.module + 'Controller.js');
        }

        try {
            gModular.init(req, res, call);
            finalObj = gModular.results();

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }

        gModular.cleanUp();

        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Post ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
    },
    putCallBackThree: function(req, res) {

        var apikey = null;
        var call = {
            module: req.params.mod,
            callType: 'PUT'
        };

        call = extend(true, req.body, call);

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Post from ' + ip);

        //this should be here if not we have a issue.
        if (!call.module) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //check for API KEY.
        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        appLogger().info(JSON.stringify(call));
        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');

        if (!gModular) {
            throw new Error("Cannot find " + call.module + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error("A POST call is required for " + call.module + 'Controller.js');
        }

        try {
            gModular.init(req, res, call);
            finalObj = gModular.results();

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }

        gModular.cleanUp();

        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Post ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
    },

    deleteCallBack: function(req, res) {

        var apikey = null;
        var call = {
            module: req.params.mod,
            callType: 'DELETE'
        };

        call = extend(true, req.body, call);

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Post from ' + ip);

        //this should be here if not we have a issue.
        if (!call.module) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //check for API KEY.
        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        appLogger().info(JSON.stringify(call));
        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');

        if (!gModular) {
            throw new Error("Cannot find " + call.module + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error("A POST call is required for " + call.module + 'Controller.js');
        }

        try {
            gModular.init(req, res, call);
            finalObj = gModular.results();

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }

        gModular.cleanUp();

        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Post ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
    },
    deleteCallBackTwo: function(req, res) {

        var apikey = null;
        var call = {
            module: req.params.mod,
            callType: 'DELETE'
        };

        call = extend(true, req.body, call);

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Post from ' + ip);

        //this should be here if not we have a issue.
        if (!call.module) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //check for API KEY.
        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        appLogger().info(JSON.stringify(call));
        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');

        if (!gModular) {
            throw new Error("Cannot find " + call.module + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error("A POST call is required for " + call.module + 'Controller.js');
        }

        try {
            gModular.init(req, res, call);
            finalObj = gModular.results();

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }

        gModular.cleanUp();

        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Post ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
    },
    deleteCallBackThree: function(req, res) {

        var apikey = null;
        var call = {
            module: req.params.mod,
            callType: 'DELETE'
        };

        call = extend(true, req.body, call);

        var gModular = null;
        var finalObj = null;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        appLogger().info('Post from ' + ip);

        //this should be here if not we have a issue.
        if (!call.module) {
            throw new Error("BAD MODULAR, MODULAR is a required.");
        }

        //check for API KEY.
        if (!GLOBAL.getValidator().checkAPIKEY(apikey)) {
            throw new Error("BAD API KEY, APIKEY is required parameter.");
        }

        appLogger().info(JSON.stringify(call));
        gModular = require(GLOBAL.CONTROLLERS + call.module + 'Controller');

        if (!gModular) {
            throw new Error("Cannot find " + call.module + 'Controller.js');
        }

        if (gModular.callType !== call.callType) {
            throw new Error("A POST call is required for " + call.module + 'Controller.js');
        }

        try {
            gModular.init(req, res, call);
            finalObj = gModular.results();

        } catch (err) {
            gModular.cleanUp();
            throw new Error(err);
        }

        gModular.cleanUp();

        if (finalObj && Array.isArray(finalObj)) {
            appLogger().info('Post ' + call.module + ' complete..');
            finalObj.push({
                timeStamp: timeStamp()
            });
            res.send(finalObj);
        } else {
            throw new Error("Issue with returned data.");
        }
    },
}
