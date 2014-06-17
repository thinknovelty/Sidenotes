'use strict';
//adds GLOBAL.settings if needed.

//change to production when ready
var appMode = 'development';
// var appMode = 'production';

var fs = require('fs'); //node method call to get file system
var appRoot = __dirname; //The name of the directory that the currently executing script resides in.
var root = appRoot;
var DBCreateConnection = function(config) {
    var mysql = require('mysql');
    var connection = mysql.createConnection(config);
    return connection;
};

if (!GLOBAL.bootstrapped) {

    GLOBAL.extend = function() {
        if (arguments.length == 2) {
            //not deep mix
            return require('node.extend')(arguments[0], arguments[1]);

        } else if (arguments.length == 3) {
            //deep mix
            return require('node.extend')(arguments[0], arguments[1], arguments[2]);
        }
    };

    GLOBAL.getAppMode = function(property) {
        return appMode;
    };

    GLOBAL.appConfig = function() {
        return require(root + '/Config/' + getAppMode() + '.js');
    };


    GLOBAL.APP_ROOT = appRoot;
    GLOBAL.VIEW_ROOT = appRoot + '/Views/';
    GLOBAL.CONTROLLERS = appRoot + '/Controllers/';
    GLOBAL.MODELS = appRoot + '/Models/';
    GLOBAL.LIB = appRoot + '/Lib/';


    // Static objects
    GLOBAL.App = null;

    //These SMTP Connection should stay open 
    GLOBAL.PicrsmtpTransport = require("nodemailer").createTransport("SMTP", appConfig().picr.email);
    GLOBAL.Side_notesTransport = require("nodemailer").createTransport("SMTP", appConfig().side_notes.email);

    //Makes datebase connection for products.
    GLOBAL.side_notesConnection = DBCreateConnection(appConfig().side_notes.database);
    GLOBAL.PicrConnection = DBCreateConnection(appConfig().picr.database);

    GLOBAL.getModelBase = function() {
        return require(GLOBAL.MODELS + 'modelBase');
    };

    GLOBAL.getControllerBase = function() {
        return require(GLOBAL.CONTROLLERS + 'controllerBase');
    };

    GLOBAL.getDateFormat = function() {
        return require('dateformat');
    };

    GLOBAL.getApp = function() {
        return App;
    };

    GLOBAL.getMailer = function() {
        return require("nodemailer");
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

    appLogger().info('config mode ' + getAppMode());
    appLogger().info('bootstrap complete');
}

GLOBAL.bootstrapped = true;
