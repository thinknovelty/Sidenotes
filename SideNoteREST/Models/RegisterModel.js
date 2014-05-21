'use strict';
// RegisterModel.js
// ----------------------------------------
// CRUD








// ----------------------------------------

var moduleName = 'registerModel';

//generates a random 30 digit key;
var generateRegistrationKey = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 30; i++) {

        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

module.exports = extend(getModelBase(), {
    registrationKey: null,

    init: function() {
        if (!this.registrationKey) {
            this.registrationKey = generateRegistrationKey();
        }
    },

    create: function(email) {
        //write it to database;
        console.log(getMailer());
        getApp().mailer.send('email', {
            to: email, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
            subject: 'Test Email', // REQUIRED.
            otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
        }, function(err) {
            if (err) {
                // handle error
                console.log(err);
                return;
            }
        });
    },

    read: function() {

    },

    update: function() {

    },

    delete: function() {

    },

    cleanUp: function() {
        this.registrationKey = null;
    },

});
