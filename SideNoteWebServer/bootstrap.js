'use strict';

var appMode = 'development'; //change to production when ready

var fs = require('fs'); //node method call to get file system
var appRoot = __dirname; //The name of the directory that the currently executing script resides in.
var root = appRoot;

if ( !GLOBAL.bootstrapped )
{

GLOBAL.APP_ROOT      = appRoot;
GLOBAL.VIEW_ROOT     = appRoot + '/views';
GLOBAL.CONTROLLERS   = appRoot + '/controllers';
GLOBAL.SASS_DIR      = appRoot + '/style';
GLOBAL.TEMPLATE_ROOT = appRoot + '/templates';


GLOBAL.appConfig = function() {
	return require(root + '/config/'+getAppMode()+'.js');
};

GLOBAL.getAppMode = function(property) {
	return appMode;
};

GLOBAL.appLogger = function() {
	return require(root + '/lib/logger.js');
};

GLOBAL.appRequire = function(module) {
	return require(root + module);
}

GLOBAL.loadView = function(view) {
	return fs.readFileSync(VIEW_ROOT + view, 'utf-8');
};

GLOBAL.loadTemplate = function(template) {
	return fs.readFileSync(TEMPLATE_ROOT + template, 'utf-8');
};

GLOBAL.requireController = function(route) {
	return require(root + '/controllers' + route);
};

appConfig();
appLogger().info('config mode ' + getAppMode());
appLogger().info('bootstrap complete');
}

GLOBAL.bootstrapped = true;

