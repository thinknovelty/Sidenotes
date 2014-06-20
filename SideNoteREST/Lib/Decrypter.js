'use strict';
// Decrypter.js

//this obj is used to dencryption a password / hashing / other stuff.

module.exports = function DecrypterModel() {
    this.modularName = 'Decrypter';
    this.init = function(argument) {
        console.log('init of the Decrypter');
    };

    this.cleanUp = function() {
        console.log('clean up for Decrypter');
    };

};
