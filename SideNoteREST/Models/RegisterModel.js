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

//tables:
//USER, USER_CREDENTIALS, 


// ----------------------------------------

var moduleName = 'register';

module.exports = extend(getModelBase(), {
    registrationKey: null,
    eventEmitter: null,

    init: function() {
        if (!this.registrationKey) {
            this.registrationKey = this.generateRegistrationKey();
        }

        var events = require('events');
        this.eventEmitter = new events.EventEmitter();
        this.eventEmitter.on('closeDB', function(msg){
            console.log(msg);
        });
    },

    create: function(userData) {
        //writes to DB returns true if all its good.
        var didDataSave = this.writeToDB(userData, this.generateRegistrationKey());

        //sends the registration email we need.
        this.sendVerificationEmail(this.registrationKey, userData.email);


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

    sendVerificationEmail: function(registrationKey, email) {

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
    },

    writeToDB: function(data, salt) {

        if (PicrConnection) {
            PicrConnection.connect();

            var post = {
                first_name: data.firstname,
                last_name: data.lastname,
                sex: data.gender + 0,
                birthday: data.dob,
                avatar_id: 1
            };

             // this.eventEmitter.emit('closeDB', 'firstClose');

            //Writes to User Table
            PicrConnection.query('INSERT INTO user SET ?', post, function(err, rows, fields) {
                if (err) {
                    throw err;
                    PicrConnection.end();
                    return;
                }
                appLogger().info(rows);

                var secondPost = {
                    _id: rows.insertId,
                    email: data.email,
                    password: data.pw,
                    salt: salt
                };

               // eventEmitter.emit('closeDB', 'secondClose');

                PicrConnection.query('INSERT INTO user_credentials SET ?', secondPost, function(err, rows, fields) {
                    if (err) {
                        throw err;
                        PicrConnection.end();
                        return;
                    }
                    appLogger().info(rows);

                    var thirdPost = {
                        _id: secondPost.insertId,
                        locked: 0,
                        closed: 0,
                        created_timestamp: new Date(),
                        locked_timestamp: null,
                        closed_timestamp: null
                    };

                    // this.eventEmitter.emit('closeDB', 'secondClose');

                    // PicrConnection.query('INSERT INTO user_account SET ?', thirdPost, function(err, rows, fields) {
                    //     if (err) {
                    //         throw err;
                    //         PicrConnection.end();
                    //         return;
                    //     }

                    //     appLogger().info(rows);
                    // });


                });


            });

            // PicrConnection.end();
        }
    }

});
