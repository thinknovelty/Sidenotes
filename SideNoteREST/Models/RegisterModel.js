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
//USER, USER_CREDENTIALS, USER_ACCOUNT, USER_VERIFICATION


// ----------------------------------------

var moduleName = 'register';

var evt = getEventManager();


module.exports = extend(getModelBase(), {

        init: function() {
            if (evt) {
                evt.once('sendConfirmationEmail', this.sendVerificationEmail);
                evt.once('err', this.delete);
            } else {
                evt = getEventManager();
                evt.once('sendConfirmationEmail', this.sendVerificationEmail);
                evt.once('err', this.delete);
            }
        },

        sendVerificationEmail: function(email, registrationKey) {

            appLogger().info('Attending to send email to: ' + email);

            //creates the link so we can verify the registration.
            var mylink = appConfig().host + '/' + moduleName + '/activation?registerKey=' + registrationKey + '&' + 'email=' + email;

            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: "Picr Registration <no-reply@picr.com>", // sender address
                to: email, // list of receivers
                subject: 'Registration Verification', // REQUIRED.
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
                        appLogger().error('Error: SQL couldn\'t INSERT INTO user table');
                        evt.emit('err', null);
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
                            appLogger().error('Error: SQL couldn\'t INSERT INTO user_credentials table');
                            evt.emit('err', secondPost._id);
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
                                appLogger().error('Error: SQL couldn\'t INSERT INTO user_account table');
                                evt.emit('err', thirdPost._id);
                                picrConnection.end();
                                return false;
                            }
                            appLogger().info(rows);

                            var fouthPost = {
                                _id: thirdPost._id,
                                code: data.registrationKey,
                                verified: 0,
                                timestamp: new Date()
                            };

                            picrConnection.query('INSERT INTO user_verification SET ?', fouthPost, function(err, rows, fields) {
                                if (err) {
                                    throw err;
                                    appLogger().error('Error: SQL couldn\'t INSERT INTO user_verification table');
                                    evt.emit('err', fouthPost._id);
                                    picrConnection.end();
                                    return false;
                                }

                                appLogger().info(rows);
                                evt.emit('sendConfirmationEmail', data.email, data.registrationKey);
                                picrConnection.end();
                            });
                        });
                    });
                });
            }
        },

        read: function() {

        },

        update: function(email) {
            //this will be used by activation to update the user_verifcation;
            //creates the DB connection;
            var picrConnection = getPicrConnection();

            if (picrConnection) {
                //open connection to db;
                picrConnection.connect();

                picrConnection.query('SELECT _id FROM user_credentials WHERE email =' + picrConnection.excute(email) + ' ', post, function(err, rows, fields) {
                    if (err) {
                        throw err;
                        appLogger().error('Error: SQL error couldn\'t get _id');
                        picrConnection.end();
                        return false;
                    }
                    appLogger().info(rows);

                    var post = {
                        verified: 1
                    };

                    //Writes to User Table
                    picrConnection.query('UPDATE user_verification SET ? WHERE _id =' + picrConnection.excute(rows.id) + ' ', post, function(err, rows, fields) {
                        if (err) {
                            throw err;
                            appLogger().error('Error: SQL couldn\'t update user_verification table ');
                            picrConnection.end();
                            return false;
                        }
                        appLogger().info(rows);
                        picrConnection.end();
                    });
                });
            },

            delete: function(id) {
                if (!id) {
                    return;
                }
                appLogger().warning('Deleting ID = ' + id + ' from the system!');




            },

            cleanUp: function() {
                //TODO: lets look into removing the listener;
                // evt.removeAllListeners(['sendConfirmationEmail']);
            }

        });
