'use strict';
//adds GLOBAL.settings if needed.

//change to production when ready
var appMode = 'development'; 
// var appMode = 'production';

var fs = require('fs'); //node method call to get file system
var appRoot = __dirname; //The name of the directory that the currently executing script resides in.
var root = appRoot;

if ( !GLOBAL.bootstrapped ) {

	GLOBAL.APP_ROOT      = appRoot;
	GLOBAL.VIEW_ROOT     = appRoot + '/Views/';
	GLOBAL.CONTROLLERS   = appRoot + '/Controllers/';
	GLOBAL.MODELS      	 = appRoot + '/Models/';
	GLOBAL.LIB      	 = appRoot + '/Lib/';


	GLOBAL.appConfig = function() {
		return require(root + '/Config/'+getAppMode()+'.js');
	};

	GLOBAL.getAppMode = function(property) {
		return appMode;
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

