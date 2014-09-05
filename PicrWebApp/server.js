'use strict';
var path = require('path');
var express = require('express');
var logger = appLogger();
var config = appConfig();
var app = express();

app.configure(function() {
    app.set('port', config.port || 80); //DEFAULT = 80 if nothing is set.
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);

    // static assets
    app.use(express.static(path.join(__dirname, config.serverRoot)));
    app.use(express.static(config.serverRoot));
});

//adds some dump stuff if we are in development
if (config.mode == 'development') {
    app.configure('development', function() {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });
}

if (config.mode == 'production') {
    app.configure('production', function() {
        app.use(express.errorHandler());
    });
}

app.listen(app.get('port'));
logger.info('Serving ' + config.serverRoot + ' on port ' + config.port || 80);