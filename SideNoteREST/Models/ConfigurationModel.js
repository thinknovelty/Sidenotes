'use strict';
// ConfigurationModel.js
// ----------------------------------------

//tables:
//settings
// ----------------------------------------

//if we need a event manager;
var eventManager = getEventManager();
var BaseModel = getModelBase();
var util = require('util');

function ConfigurationModel() {
    this.moduleName = 'configuration';

    this.init = function() {
    };


    this.create = function(arr, callback) {
    };

    this.delete = function(arr, callback) {

    };

    this.read = function(arr, callback){

    };

    this.update = function(arr, callback) {
        if(!arr ){
           return;
        }

        if(Array.isArray(arr)){
            arr.foreach(function(e) {
                
            });
        }else{


        }
    };

    this.removeListeners = function(){

    };

    this.cleanUp = function() {

    };
};

util.inherits(ConfigurationModel, BaseModel);
module.exports = ConfigurationModel;
