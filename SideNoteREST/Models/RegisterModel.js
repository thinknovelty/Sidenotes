// RegisterModel.js
// ----------------------------------------
// CRUD








// ----------------------------------------

var moduleName = 'registerModel';

//generates a random 10 digit key;
var generateRegistrationKey = function() {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++) {

        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

module.exports = {
   registrationKey : null,

    init: function() {
        if (!registrationKey) {
            registrationKey = generateRegistrationKey();
        }
    },

    getRegistrationKey: function() {
        return registrationKey;
    },

    create: function() {

    },

    read: function() {

    },

    update: function() {

    },

    delete: function() {

    },

};
