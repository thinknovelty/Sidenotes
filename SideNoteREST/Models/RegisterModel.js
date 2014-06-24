
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

var evt = getEventManager();
var BaseModel = getModelBase();
var util = require('util');

function RegisterModel() {
    BaseModel.apply(this, arguments);
    this.moduleName = 'register';
    this.init = function() {
        if (evt) {
            evt.once('sendConfirmationEmail', this.sendVerificationEmail);
            evt.once('err', this.delete);
        } else {
            evt = getEventManager();
            evt.once('sendConfirmationEmail', this.sendVerificationEmail);
            evt.once('err', this.delete);
        }
    };

    this.sendVerificationEmail = function(email, registrationKey) {

        appLogger.info('Attending to send email to: ' + email);

        //creates the link so we can verify the registration.
        var mylink = appConfig().host + '/activation?registerKey=' + registrationKey + '&' + 'email=' + email;

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
                appLogger.error(error);
            } else {
                appLogger.info('Email Sent ' + response.message);
            }
        });
    };

    this.create = function(data, callback) {

        //creates the DB connection;
        var picrConnection = getPicrConnection();

        if (picrConnection) {

            //Writes to User Table
            picrConnection.query('INSERT INTO user SET ?', {
                first_name: data.first_name,
                last_name: data.last_name,
                sex: data.sex + 0,
                birthday: data.birthday,
                avatar_id: 1
            }, function(err, rows) {
                if (err) {
                    appLogger.error('SQL couldn\'t INSERT INTO user table\n' + err);
                    evt.emit('err', null);
                    picrConnection.end();
                    if (callback) {
                        callback(false, err);
                    }
                    return;
                } else if (rows.affectedRows > 0) {
                    appLogger.info('INSERT INTO user ' + JSON.stringify(rows));
                }
                var user_id = rows.insertId;

                //Writes to user_credentials Table
                picrConnection.query('INSERT INTO user_credentials SET ?', {
                    _id: user_id,
                    email: data.email,
                    password: data.password,
                    salt: data.salt
                }, function(err, rows) {
                    if (err) {
                        appLogger.error('SQL couldn\'t INSERT INTO user_credentials table\n' + err);
                        evt.emit('err', user_id);
                        picrConnection.end();
                        if (callback) {
                            callback(false, err);
                        }
                        return;
                    } else if (rows.affectedRows > 0) {
                        appLogger.info('INSERT INTO user_credentials ' + JSON.stringify(rows));
                    }

                    //Writes to user_account Table
                    picrConnection.query('INSERT INTO user_account SET ?', {
                        _id: user_id,
                        locked: 0,
                        closed: 0,
                        created_timestamp: new Date(),
                        locked_timestamp: null,
                        closed_timestamp: null
                    }, function(err, rows) {
                        if (err) {
                            appLogger.error('SQL couldn\'t INSERT INTO user_account table\n' + err);
                            evt.emit('err', user_id);
                            picrConnection.end();
                            if (callback) {
                                callback(false, err);
                            }
                            return;
                        } else if (rows.affectedRows > 0) {
                            appLogger.info('INSERT INTO user_account ' + JSON.stringify(rows));
                        }

                        //Writes to user_verification Table
                        picrConnection.query('INSERT INTO user_verification SET ?', {
                            _id: user_id,
                            code: data.registrationKey,
                            verified: 0,
                            timestamp: new Date()
                        }, function(err, rows) {
                            if (err) {
                                appLogger.error('SQL couldn\'t INSERT INTO user_verification table\n' + err);
                                evt.emit('err', user_id);
                                picrConnection.end();
                                if (callback) {
                                    callback(false, err);
                                }
                                return;
                            } else if (rows.affectedRows > 0) {
                                appLogger.info('INSERT INTO user_verification ' + JSON.stringify(rows));
                            }
                            evt.emit('sendConfirmationEmail', data.email, data.registrationKey);
                            picrConnection.end();
                            if (callback) {
                                callback(true);
                            }
                        });
                    });
                });
            });
        }
    };

    this.read = function() {
        appLogger.info('RegisterModel read();');
    };

    this.delete = function(_id) {
        if (!_id) {
            appLogger.error('_id is needed for DELETEING patron.');
            return;
        }
        appLogger.warn('Atending to delete ID = ' + _id + ' from the database!');
        //creates the DB connection;
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            //DELETE in user_verification
            picrConnection.query('DELETE FROM user_verification WHERE _id = ' + picrConnection.escape(_id), function(err, rows) {
                if (err) {
                    //their is a issue if we can not delete from this table.
                    appLogger.error('SQL couldn\'t DELETE FROM user_verification\n' + err);
                } else if (rows.affectedRows > 0) {
                    appLogger.info('DELETE FROM user_verification ' + JSON.stringify(rows));
                }

                //DELETE in user_account
                picrConnection.query('DELETE FROM user_account WHERE _id = ' + picrConnection.escape(_id), function(err, rows) {
                    if (err) {
                        //their is a issue if we can not delete from this table.
                        appLogger.error('SQL couldn\'t DELETE FROM user_account\n' + err);
                    } else if (rows.affectedRows > 0) {
                        appLogger.info('DELETE FROM user_account ' + JSON.stringify(rows));
                    }

                    //DELETE in user_credentials
                    picrConnection.query('DELETE FROM user_credentials WHERE _id = ' + picrConnection.escape(_id), function(err, rows) {
                        if (err) {
                            //their is a issue if we can not delete from this table.
                            appLogger.error('SQL couldn\'t DELETE FROM user_credentials\n' + err);
                        } else if (rows.affectedRows > 0) {
                            appLogger.info('DELETE FROM user_credentials ' + JSON.stringify(rows));
                        }

                        //DELETE in user
                        picrConnection.query('DELETE FROM user WHERE _id = ' + picrConnection.escape(_id), function(err, rows) {
                            if (err) {
                                //their is a issue if we can not delete from this table.
                                appLogger.error('SQL couldn\'t DELETE FROM user\n' + err);
                            } else if (rows.affectedRows > 0) {
                                appLogger.info('DELETE FROM user ' + JSON.stringify(rows));
                            }

                            picrConnection.end();
                        });
                    });
                });
            });
        }
    };

    this.cleanUp = function() {
        //TODO: lets look into removing the listener;
        this.removeListeners();
    };
    this.removeListeners = function() {
        if (evt) {
            evt.removeAllListeners(['sendConfirmationEmail']);
            evt.removeAllListeners(['err']);
        }
    }

    this.update = function(email, callback) {
        //this will be used by activation to update the user_verifcation;
        //creates the DB connection;
        var picrConnection = getPicrConnection();

        if (picrConnection) {
            //add check so they cannot double register.
            picrConnection.query('SELECT _id FROM user_credentials WHERE email =' + picrConnection.escape(email), function(err, rows, fields) {
                if (err || !(rows[0])) {
                    appLogger.error('SQL error couldn\'t get _id for ' + email);
                    picrConnection.end();
                    if (callback) {
                        callback(false, err);
                    }
                    return;
                }
                appLogger.info('_id for ' + email + ' = ' + rows[0]._id);

                var post = {
                    verified: 1
                };

                //Writes to User Table
                picrConnection.query('UPDATE user_verification SET ? WHERE _id =' + picrConnection.escape(rows[0]._id) + ' ', post, function(err, rows, fields) {
                    if (err) {
                        appLogger.error('SQL couldn\'t update user_verification table\n' + err);
                        picrConnection.end();
                        if (callback) {
                            callback(false, err);
                        }
                        return;
                    } else if (rows.affectedRows > 0) {
                        appLogger.info('UPDATE user_verification ' + JSON.stringify(rows));
                    }

                    picrConnection.end();
                    if (callback) {
                        callback(true);
                    }

                    //TODO: this will login the user. I may need to make a global trigger for this process.
                    var loginModel = require(MODELS + 'Login' + 'Model');
                    var m = new loginModel();
                    m.init();
                    m.create(email, false, function(bool, err) {
                        if (bool) {
                            appLogger.info('Login process completed for ' + email);
                        } else {
                            if (err) {
                                appLogger.error('Login process failed for ' + email + '\n' + err);
                            } else {
                                appLogger.error('Login process failed for ' + email);
                            }
                        }
                    });
                });
            });
        }
    };
};

util.inherits(RegisterModel, BaseModel);
module.exports = RegisterModel;
