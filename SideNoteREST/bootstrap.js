
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

    GLOBAL.getAppMode = function() {
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
    GLOBAL.AppSettings = {};


    // Static objects
    GLOBAL.App = null;

    //These SMTP Connection should stay open STATIC
    GLOBAL.PicrsmtpTransport = require("nodemailer").createTransport("SMTP", appConfig().picr.email);
    GLOBAL.Side_notesTransport = require("nodemailer").createTransport("SMTP", appConfig().side_notes.email);

    //setup Logger
    GLOBAL.appLogger = require(GLOBAL.LIB + 'Logger.js');

    //Makes datebase connection for products. Call them then close your connection with .end();
    GLOBAL.getSide_notesConnection = function() {
        return new DBCreateConnection(appConfig().side_notes.database);
    };
    GLOBAL.getPicrConnection = function() {
        return new DBCreateConnection(appConfig().picr.database);
    };

    GLOBAL.getSettingsFromDB = function(callback) {
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            picrConnection.query('SELECT setting_name, value FROM SETTINGS', function(err, rows) {
                if (err || !(rows[0])) {
                    appLogger.error('SQL error couldn\'t get settings');
                    if(err){
                        appLogger.error(err);
                    }
                    picrConnection.end();
                    callback(false);
                    return;
                }
                rows.forEach(function(e) {
                    AppSettings[e.setting_name] = e.value;
                });
                appLogger.info('Settings = ' + JSON.stringify(AppSettings));
                callback(true);
            });
        }
    };

    GLOBAL.getModelBase = function() {
        return require(GLOBAL.MODELS + 'modelBase');
    };

    GLOBAL.getControllerBase = function() {
        return require(GLOBAL.CONTROLLERS + 'controllerBase');
    };

    GLOBAL.getDateFormat = function() {
        return require('dateformat');
    };

    GLOBAL.getEventManager = function() {
        var events = require('events');
        return new events.EventEmitter();
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

    GLOBAL.getUtil = function(){
        return require('util');
    };

    GLOBAL.appRequire = function(module) {
        return require(root + module);
    };

    GLOBAL.loadView = function(view) {
        return fs.readFileSync(VIEW_ROOT + view, 'utf-8');
    };
    appLogger.info('Config mode = ' + getAppMode());
    appLogger.info('GLOBAL Object and functions loaded.');
}
GLOBAL.bootstrapped = true;
