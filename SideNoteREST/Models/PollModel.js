// PictureModel.js
// ----------------------------------------

//tables:
//settings
// ----------------------------------------

//if we need a event manager;
var eventManager = getEventManager();
var BaseModel = getModelBase();

function PictureModel() {
    this.moduleName = 'picture';
    this.init = function() {
        if (evt) {
            evt.once('err', this.delete);
        } else {
            evt = getEventManager();
            evt.once('err', this.delete);
        }
    };
    this.create = function(data, callback) {
        var picrConnection = getPicrConnection();
        if (picrConnection) {}
    };
    this.delete = function(data, callback) {};
    this.read = function(data, callback) {};
    this.update = function(data, callback) {};
    this.removeListeners = function() {};
    this.cleanUp = function() {};
};

getUtil().inherits(PictureModel, BaseModel);
module.exports = PictureModel;
