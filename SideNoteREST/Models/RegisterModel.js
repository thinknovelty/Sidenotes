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

    create: function(userData) {
        //write it to database;
        //userData
        var mylink = appConfig().host + '/' + moduleName + '/activation?registerKey=' + this.registrationKey;
        
        //set the template we would like to use
        app.set('view engine', 'jade');
        var mailer = getSNMailer();

        mailer.send('register_email', {
            to: userData.email, // REQUIRED.
            subject: 'no-reply - Registration Side Notes', // REQUIRED.
            mylink: mylink
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
