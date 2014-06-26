//base for all controllers!

module.exports = function BaseController(moduleName) {
    this.moduleName = 'base';

    this.CODE_NO_ERROR = 00; //- no error is present.
    this.CODE_LOGIN_ERROR = 01; //- failed to login.
    this.CODE_REGISTER_ERROR = 02; //- failed to register patron.
    this.CODE_VERIFCATION_ERROR = 03; //- failed the verifcation process.
    this.CODE_CONFIGURATION_ERROR = 04; //- failed to save configurations.
    this.CODE_POLL_CREATE_ERROR = 05; //- failed to create a poll.


    if (moduleName) {
        this.moduleName = moduleName;
    }
    this.get = function(str) {
        if (this[str] != null) {
            return this[str];
        }
    };

    this.set = function(str, value) {
        this[str] = value;
    };

    //generates a random 32 digit key;
    this.generateKey = function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    this.init = function(req, res, call) {
        appLogger.info('Init from Base Controller');
    };

    this.results = function() {
        appLogger.info('Default from Base Controller');
    };

    this.cleanUp = function() {
        appLogger.info('Default from Base Controller');
    };
};
