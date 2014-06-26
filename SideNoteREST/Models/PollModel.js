// PollModel.js
// ----------------------------------------

//tables:
//settings
// ----------------------------------------

//if we need a event manager;
var eventManager = getEventManager();
var BaseModel = getModelBase();

function PollModel() {
    this.moduleName = 'poll';
    this.init = function() {};
    this.create = function(data, callback) {
        //  take the email and get the user _id;

        //  insert all data into poll;

        //  insert all data into poll_state;







    };
    this.delete = function(data, callback) {};
    this.read = function(data, callback) {};
    this.update = function(data, callback) {};
    this.removeListeners = function() {};
    this.cleanUp = function() {};
};

getUtil().inherits(PollModel, BaseModel);
module.exports = PollModel;
