'use strict';
//adds GLOBAL.settings if needed.

//change to production when ready
var appMode = 'development';
// var appMode = 'production';

var fs = require('fs'); //node method call to get file system
var appRoot = __dirname; //The name of the directory that the currently executing script resides in.
var root = appRoot;

if (!GLOBAL.bootstrapped) {

    GLOBAL.APP_ROOT = appRoot;
    GLOBAL.VIEW_ROOT = appRoot + '/Views/';
    GLOBAL.CONTROLLERS = appRoot + '/Controllers/';
    GLOBAL.MODELS = appRoot + '/Models/';
    GLOBAL.LIB = appRoot + '/Lib/';

    // static objects
    GLOBAL.app = null;


    GLOBAL.extend = function() {
        if (arguments.length == 2) {
            //not deep mix
            return require('node.extend')(arguments[0], arguments[1]);

        } else if (arguments.length == 3) {
            //deep mix
            return require('node.extend')(arguments[0], arguments[1], arguments[2]);
        }
    };


    GLOBAL.appConfig = function() {
        return require(root + '/Config/' + getAppMode() + '.js');
    };

    GLOBAL.getModelBase = function() {
        return require(GLOBAL.MODELS + 'modelBase');
    },

    GLOBAL.getControllerBase = function() {
        return require(GLOBAL.CONTROLLERS + 'controllerBase');
    },

    GLOBAL.getAppMode = function(property) {
        return appMode;
    };

    //this lib offers a great deal of good features.
    GLOBAL.getUtil = function() {
        return require('util');
    };

    GLOBAL.getApp = function() {
        return app;
    };

    GLOBAL.getMailer = function() {
        return mailer;
    };

    GLOBAL.getRequest = function() {
        return require(GLOBAL.LIB + 'Request');
    };

    GLOBAL.getValidator = function() {
        return require(GLOBAL.LIB + 'Validator');
    };

    GLOBAL.getDecrypter = function() {
        return require(GLOBAL.LIB + 'Decrypter');
    };

    GLOBAL.appLogger = function() {
        return require(GLOBAL.LIB + 'Logger.js');
    };

    GLOBAL.appRequire = function(module) {
        return require(root + module);
    };

    GLOBAL.loadView = function(view) {
        return fs.readFileSync(VIEW_ROOT + view, 'utf-8');
    };

    GLOBAL.loadTemplate = function(template) {
        return fs.readFileSync(TEMPLATE_ROOT + template, 'utf-8');
    };

    GLOBAL.requireController = function(route) {
        return require(root + '/Controllers' + route);
    };

    appConfig();
    appLogger().info('config mode ' + getAppMode());
    appLogger().info('bootstrap complete');
}

GLOBAL.bootstrapped = true;
