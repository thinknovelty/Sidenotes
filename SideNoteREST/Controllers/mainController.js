'use strict';
//--------------------------------------------------------------------------
// Post - 	Create 
// Get - 	Read 
// Put - 	Update
// Delete - Delete

//Get call example.			/<mod> 
//							/<mod>/variable
//							/<mod>/<type>/variable

//Post call example.   		/<mod> 
//							/<mod>/variable
//							/<mod>/<type>/variable

//Put call example.			/<mod> 
//							/<mod>/variable
//							/<mod>/<type>/variable

//Delete call example.   	/<mod> 
//							/<mod>/variable
//							/<mod>/<type>/variable
//--------------------------------------------------------------------------

//mainController.js
var moduleName = 'main';

var addTestResponds = function(app) {

    var tcall = function(req) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        appLogger().info(ip + ' is testing the server.');
        return {
            respondBack: 'Yes, the server is alive and kicking',
            Error: 'No error yet!...'
        }
    };

    app.route('/test')
        .all(function(req, res) {
            res.send([tcall(req)]);
            appLogger().info('Testing completed.');
        });

    app.route('/')
        .all(function(req, res) {
            res.send([tcall(req)]);
            appLogger().info('Testing completed.');
        });
};

var checkAPI = function(apikey) {
    var modelAPI = require(GLOBAL.MODELS + 'ValidateAPIKEY');
    modelAPI.init(apikey);
    return modelAPI.validate();
};

var startExpress = function() {
    var express = require('express');
    var compress = require('compression');
    var bodyParser = require('body-parser');

    var app = express();

    //express settings.
    app.use(compress());
    app.use(bodyParser());
    app.set('views', GLOBAL.APP_ROOT + '/Views');
    app.set('title', 'SideNote_REST');

    //error handling...
    app.use(function(err, req, res, next) {
        res.send(500, err.toString());
        appLogger().error(err.stack);
    });

    app.listen(appConfig().restPort);

    if (app) {
        addTestResponds(app);
        // addMailer(app);
        appLogger().info('Listening on port ' + appConfig().restPort);
        return app;
    } else {
        appLogger().info('Failed to start server on port ' + appConfig().restPort);
        return false;
    }
};
//starts express obj
var app = startExpress();

if (app) {
    var request = GLOBAL.getRequest();

    app.route('/:mod')
        .get(function(req, res, next) {
            console.log("GET");
            request.getCallBack(req, res);
        })
        .post(function(req, res, next) {
            console.log("POST");
            request.postCallBack(req, res);
        })
        .put(function(req, res, next) {
            console.log("PUT");
            request.putCallBack(req, res);
        })
        .delete(function(req, res, next) {
            console.log("DELTE");
            request.deleteCallBack(req, res);
        });

    app.route('/:mod/:id')
        .get(function(req, res, next) {
            request.getCallBackTwo(req, res);
        })
        .post(function(req, res, next) {
            request.postCallBackTwo(req, res);
        })
        .put(function(req, res, next) {
            request.putCallBackTwo(req, res);
        })
        .delete(function(req, res, next) {
            request.deleteCallBackTwo(req, res);
        });

    app.route('/:mod/:type/:id')
        .get(function(req, res, next) {
            request.getCallBackThree(req, res);
        })
        .post(function(req, res, next) {
            request.postCallBackThree(req, res);
        })
        .put(function(req, res, next) {
            request.putCallBackThree(req, res);
        })
        .delete(function(req, res, next) {
            request.deleteCallBackThree(req, res);
        });

    //Makes the App obj static.
    GLOBAL.App = app;
};

module.exports = extend(getControllerBase(),{
    didLoadWithoutError: function() {
        if (app) {
            return true;
        } else {
            return false;
        }
    },
});
