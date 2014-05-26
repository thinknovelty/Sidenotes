'use strict';
// RegisterModel.js
// ----------------------------------------
// CRUD








// ----------------------------------------

var moduleName = 'register';

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
        var mylink = appConfig().host + '/' + moduleName + '/activation?registerKey=' + this.registrationKey;
        getApp().mailer.send('email', {
            to: email, // REQUIRED.
            subject: 'Registration Side Notes', // REQUIRED.
            mylink: mylink,
            ip:  appConfig().host,
            port:  appConfig().restPort
        }, function(err) {
            if (err) {
                // handle error
                console.log(err);
                return;
            }
            appLogger().info('Email Sent');
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
