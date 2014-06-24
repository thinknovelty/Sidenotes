
//base for all models!

function BaseModel() {
    this.get = function(str) {
        if (this[str] != null) {
            return this[str];
        }
    };
    this.set = function(str, value) {
        this[str] = value;
    };

    this.init = function() {
        appLogger.info('init from base');
    };

    this.create = function() {
        appLogger.info('create from base');
    };

    this.delete = function() {
        appLogger.info('delete from base');
    };

    this.read = function() {
        appLogger.info('read from base');
    };

    this.update = function() {
        appLogger.info('update from base');
    };

    this.cleanUp = function() {
        appLogger.info('cleanUp from base');
    };
};

// BaseModel.prototype.fromID = function() { };

module.exports = BaseModel;
