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

var evt = getEventManager();


module.exports = extend(getModelBase(), {

    init: function() {

        if (evt) {
            evt.on('sendConfirmationEmail', this.sendVerificationEmail);
        } else {
            evt = getEventManager();
            evt.on('sendConfirmationEmail', this.sendVerificationEmail);
        }


    },

    read: function() {

    },

    update: function() {

    },

    delete: function() {

    },

    cleanUp: function() {
        //TODO: lets look into removing the listener;
        // evt.removeAllListeners(['sendConfirmationEmail']);
    },

    sendVerificationEmail: function(email, registrationKey) {

        console.log('sending email ' + registrationKey );

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

    create: function(data) {

        //creates the DB connection;
        var picrConnection = getPicrConnection();

        if (picrConnection) {
            picrConnection.connect();

            var post = {
                first_name: data.first_name,
                last_name: data.last_name,
                sex: data.sex + 0,
                birthday: data.birthday,
                avatar_id: 1
            };

            //Writes to User Table
            picrConnection.query('INSERT INTO user SET ?', post, function(err, rows, fields) {
                if (err) {
                    throw err;
                    picrConnection.end();
                    return false;
                }
                appLogger().info(rows);

                var secondPost = {
                    _id: rows.insertId,
                    email: data.email,
                    password: data.password,
                    salt: data.salt
                };

                //Writes to user_credentials Table
                picrConnection.query('INSERT INTO user_credentials SET ?', secondPost, function(err, rows, fields) {
                    if (err) {
                        throw err;
                        picrConnection.end();
                        return false;
                    }
                    appLogger().info(rows);

                    var thirdPost = {
                        _id: secondPost._id,
                        locked: 0,
                        closed: 0,
                        created_timestamp: new Date(),
                        locked_timestamp: null,
                        closed_timestamp: null
                    };

                    //Writes to user_account Table
                    picrConnection.query('INSERT INTO user_account SET ?', thirdPost, function(err, rows, fields) {
                        if (err) {
                            throw err;
                            picrConnection.end();
                            return false;
                        }
                        appLogger().info(rows);
                        evt.emit('sendConfirmationEmail', data.email, data.registrationKey);
                        picrConnection.end();
                    });


                });


            });
        }
    }

});
