
// Decrypter.js

//this obj is used to dencryption a password / hashing / other stuff.

module.exports = function DecrypterModel() {
    this.modularName = 'Decrypter';
    this.init = function(argument) {
        applogger.info('init of the Decrypter');
    };

    this.cleanUp = function() {
        applogger.info('clean up for Decrypter');
    };
};
