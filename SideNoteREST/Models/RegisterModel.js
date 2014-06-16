'use strict';
// RegisterModel.js
// ----------------------------------------
//  CRUD
//  all models should have a:
//  init()
//  create()
//  delete()
//  read()
//  update()
//  cleanUp()



// mailer.send('register_email', {
//     to: userData.email, // REQUIRED.
//     subject: 'no-reply - Registration Side Notes', // REQUIRED.
//     mylink: mylink
// }, function(err) {
//     if (err) {
//         // handle error
//         console.log(err);
//         return;
//     }
//     appLogger().info('Email Sent');
// });

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

var sendVerificationEmail = function(registrationKey, email) {

    //creates the link so we can verify the registration.
    var mylink = appConfig().host + '/' + moduleName + '/activation?registerKey=' + registrationKey;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Fred Foo <foo@blurdybloop.com>", // sender address
        to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
        subject: 'no-reply - Registration picr', // REQUIRED.
        text: "Hello world", // plaintext body
        html: "<b>Hello world</b>" // html body
    }

    // send mail with defined transport object
    PicrsmtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            appLogger().error(error);
        } else {
            appLogger().info('Email Sent ' + response.message);
        }
    });
};

module.exports = extend(getModelBase(), {
    registrationKey: null,

    init: function() {
        if (!this.registrationKey) {
            this.registrationKey = generateRegistrationKey();
        }
    },

    create: function(userData) {

        //sends the registration email we need.
        sendVerificationEmail(this.registrationKey, userData.email);


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
