
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
        appLogger.info(ip + ' is testing the server.');
        return {
            respondBack: 'Yes, the server is alive and kicking',
            Error: 'No error yet!...'
        }
    };

    app.route('/test')
        .all(function(req, res) {
            res.send([tcall(req)]);
            appLogger.info('Testing completed.');
        });

    app.route('/')
        .all(function(req, res) {
            res.send([tcall(req)]);
            appLogger.info('Testing completed.');
        });
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
        appLogger.error(err.stack);
    });

    if(getAppMode() === 'development'){
        app.listen(appConfig().restPort);
    }else{
        //get server port setting.
        app.listen(AppSettings.server_port);
    }

    if (app) {
        addTestResponds(app);
        appLogger.info('Listening on port ' + appConfig().restPort);
        return app;
    } else {
        appLogger.info('Failed to start server on port ' + appConfig().restPort);
        return false;
    }
};

//starts express obj
var app = startExpress();

if (app) {
    var requestModel = GLOBAL.getRequest();
    var r = new requestModel();

    app.route('/:mod')
        .get(function(req, res, next) {
            r.callBackOne(req, res, 'GET');
        })
        .post(function(req, res, next) {
            r.callBackOne(req, res, 'POST');
        })
        .put(function(req, res, next) {
            r.callBackOne(req, res, 'PUT');
        })
        .delete(function(req, res, next) {
            r.callBackOne(req, res, 'DELETE');
        });

    app.route('/:mod/:id')
        .get(function(req, res, next) {
            r.callBackTwo(req, res, 'GET');
        })
        .post(function(req, res, next) {
            r.callBackTwo(req, res, 'POST');
        })
        .put(function(req, res, next) {
            r.callBackTwo(req, res, 'PUT');
        })
        .delete(function(req, res, next) {
            r.callBackTwo(req, res, 'DELETE');
        });

    app.route('/:mod/:type/:id')
        .get(function(req, res, next) {
            r.callBackThree(req, res, 'GET');
        })
        .post(function(req, res, next) {
            r.callBackThree(req, res, 'POST');
        })
        .put(function(req, res, next) {
            r.callBackThree(req, res, 'PUT');
        })
        .delete(function(req, res, next) {
            r.callBackThree(req, res, 'DELETE');
        });
    //Makes the App obj static.
    GLOBAL.App = app;
};

module.exports = {
    didLoadWithoutError: function() {
        if (app) {
            return true;
        } else {
            return false;
        }
    },
};
