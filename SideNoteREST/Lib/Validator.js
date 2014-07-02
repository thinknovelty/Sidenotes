// Validator.js

var util = require('util');

module.exports = function ValidatorModel(email) {
    this.moduleName = 'validator';
    //settings;
    this.password_length = AppSettings.password_length;
    this.registration_api_key = AppSettings.registration_api_key;
    this.session_timeout = AppSettings.session_timeout;

    this.email = null;

    if (email) {
        this.email = email;
    }
    this.init = function() {};

    // Validate e-mail string
    this.isEmail = function(email) {
        if (!email) {
            return 'BAD email address'
        }
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        if (email == null || atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
            return 'email address is required please check your format';
        }
        return true;
    };

    // Validate username string
    this.isUsername = function(username) {
        if (username == null || username.length < 7) {
            return 'BAD username';
        }
        return true;
    };

    // Validate password string
    this.isPassword = function(password, callback) {
        if (this.email) {
            var picrConnection = getPicrConnection();
            if (picrConnection) {
                var email = this.email;
                picrConnection.query('SELECT * FROM user_credentials where email =' + picrConnection.escape(email), function(err, rows) {
                    if (err) {
                        appLogger.error('SQL couldn\'t find password for ' + email + '\n' + err);
                        picrConnection.end();
                        callback(true, err);
                        return;
                    } else if (!rows[0].password) {
                        appLogger.error('SQL couldn\'t find password for ' + email);
                        picrConnection.end();
                        callback(true, 'SQL couldn\'t find password for ' + email);
                        return;
                    }
                    try {
                        if (getDecrypter().compareSync(password, rows[0].password.replace(rows[0].salt, ''))) {
                            callback(false, 'Password is correct.');
                        } else {
                            callback(true, 'Password is incorrect.');
                        }

                    } catch (err) {
                        appLogger.error('Issue with Decrypting password. ' + err);
                        callback(true, 'Password is incorrect.');
                    }
                    return;
                });
            } else {
                callback(true, 'Issue with connecting to database.');
                return;
            }
            return true;
        }


        if (password == null || password == ' ') {
            return 'password is required';
        } else if (password.length < this.password_length) {
            return 'password must be at less ' + this.password_length + ' charaters.';
        }
        return true;
    };

    // Validate firstname string TODO: check for string
    this.isFirstname = function(firstname) {
        if (firstname == null) {
            return 'first_name is required';
        }
        return true;
    };

    // Validate lastname string TODO: check for string
    this.isLastname = function(lastname) {
        if (lastname == null) {
            return 'last_name is required';
        }
        return true;
    };

    // Validate Date Of Birth date object
    this.isDateofbirth = function(birthday) {
        if (!birthday || !(util.isDate(birthday)) || birthday.toString() === 'Invalid Date') {
            return 'birthday is required format should be MM/DD/YYYY';
        }
        return true;
    };

    // Validate Sex boolean
    this.isSex = function(sex) {
        if (sex == null || typeof sex != 'boolean') {
            return 'sex is required 0 = Female; 1 = Male;';
        }
        return true;
    };

    // we currently just check for a number.
    this.checkAPIKEY = function(apikey) {
        if (GLOBAL.getAppMode() == 'development') {
            return true;
        } else if (!apikey) {
            return 'Bad apikey';
        } else if (this.registration_api_key === apikey) {
            return true;
        } else {
            return 'Bad apikey';
        }
    };

    this.isQuestion = function(question) {
        if(!question){
            return 'Question (question) is a required paramerter.';
        }
        return true;
    };

    this.isPicture = function(picture) {
         if(!picture){
            return 'Picture (either picture_01 or picture_02) is a required paramerter.';
        }
        return true;
    };

    this.isVoteToClose = function(close) {
         if(!close){
            return 'Close vote (close_on_vote) is a required paramerter.';
        }
        return true;
    };

    this.isTimeToClose = function(time) {
        if(!time){
            return 'Close time (close_on_time) is a required paramerter.';
        }
        return true;
    };
        //checks the uuid if its good and not expired.
    this.isUUID = function(uuid, callback) {
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            appLogger.info('Checking for uuid = ' + picrConnection.escape(uuid));
            var session_timeout = this.session_timeout;
            picrConnection.query('SELECT * FROM user_login WHERE uuid =' + picrConnection.escape(uuid), function(err, rows) {
                if (err) {
                    appLogger.error('SQL couldn\'t SELECT INTO user_login ' + err);
                    picrConnection.end();
                    callback(true, err);
                    return;
                } else if (!rows[0]) {
                    appLogger.error('SQL error couldn\'t find uuid in system.');
                    picrConnection.end();
                    callback(true, 'Bad uuid');
                    return;
                } else if (rows[0].isExpired) {
                    picrConnection.end();
                    callback(true, 'uuid session has expired.');
                    return;
                }
                var mins = ((Math.floor(new Date() - new Date(rows[0].timestamp))) / 1000) / 60;
                if (mins > session_timeout) {
                    callback(true, 'uuid session has expired.');
                    //marks the session expired.
                    appLogger.info('Expiring uuid = ' + picrConnection.escape(uuid));
                    picrConnection.query('UPDATE user_login set ? WHERE uuid =' + picrConnection.escape(uuid), {
                        isExpired: 1
                    }, function(err, rows) {
                        if (err) {
                            appLogger.error('SQL couldn\'t UPDATE user_login ' + err);
                            appLogger.error('Issue with trying to expire uuid ' + picrConnection.escape(uuid) + ' ' + err);
                            picrConnection.end();
                            return;
                        }
                        //nothing more to do so we return;
                        picrConnection.end();
                        return;
                    });
                } else {
                    picrConnection.end();
                    callback(false, 'uuid session has not expired.');
                    return;
                }
            });
        }
    };

    this.isEmailInSystem = function(email, callback) {
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            appLogger.info('Checking for email = ' + email);
            picrConnection.query('SELECT email FROM user_credentials WHERE email =' + picrConnection.escape(email), function(err, rows) {
                if (err) {
                    appLogger.error('SQL couldn\'t SELECT INTO user_credentials ' + err);
                    picrConnection.end();
                    callback(true, err);
                    return;
                } else if (!rows[0]) {
                    appLogger.error('SQL error couldn\'t find email in system.');
                    picrConnection.end();
                    callback(true, 'Email not found in the system.');
                    return;
                }
                callback(false, 'Email found in the system.');
            });
        }
    };

    this.isShardID = function(sID, callback){
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            appLogger.info('Checking for database for shard type = ' + sID);
            picrConnection.query('SELECT * FROM share_type WHERE _id =' + picrConnection.escape(sID), function(err, rows) {
                if (err) {
                    appLogger.error('SQL couldn\'t SELECT INTO share_type ' + err);
                    picrConnection.end();
                    callback(true, err);
                    return;
                } else if (!rows[0]) {
                    appLogger.error('Couldn\'t find share_type in database.');
                    picrConnection.end();
                    callback(true, 'share_type_id not found in the database.');
                    return;
                }
                callback(false, 'share_type_id found in the system.');
            });
        }
    };

    this.isRegistrationKey = function(key, callback) {
        if (this.email) {
            var picrConnection = getPicrConnection();
            if (picrConnection) {
                var email = this.email;
                picrConnection.query('SELECT _id FROM user_credentials WHERE email =' + picrConnection.escape(email), function(err, rows) {
                    if (err) {
                        appLogger.error('SQL couldn\'t SELECT INTO user_credentials ' + err);
                        picrConnection.end();
                        callback(true, 'SQL error couldn\'t get _id for ' + email + ' ' + err);
                        return;
                    } else if (!rows[0]._id) {
                        appLogger.error('SQL error couldn\'t find _id for ' + email);
                        picrConnection.end();
                        callback(true, 'User isn\'t found in user_credentials, they are not registered.');
                        return;
                    }

                    appLogger.info('FOUND _id for ' + email + ' = ' + rows[0]._id);
                    picrConnection.query('SELECT code FROM user_verification WHERE _id =' + rows[0]._id, function(err, rows) {
                        if (err) {
                            appLogger.error('SQL couldn\'t SELECT INTO user_verification ' + err);
                            picrConnection.end();
                            callback(true, 'SQL error couldn\'t get code for ' + email + ' from user_verification ' + err);
                            return;
                        } else if (!rows[0].code) {
                            appLogger.error('SQL error couldn\'t find _id for ' + email);
                            picrConnection.end();
                            callback(true, 'User isn\'t found in user_verification, they are not registered.');
                            return;
                        }
                        appLogger.info('FOUND code for ' + email + ' = ' + rows[0].code);
                        try {
                            if (key === rows[0].code) {
                                callback(false, 'Registration Key is correct.');
                            } else {
                                callback(true, 'Registration Key is incorrect.');
                            }
                        } catch (err) {
                            appLogger.error('Issue with checking registration Key. ' + err);
                            callback(true, 'Registration Key is incorrect.');
                        }
                        return;
                    });
                });
            } else {
                callback(true, 'Issue with connecting to database.');
                return;
            }
        } else {
            callback(true, 'A email is needed to verify Registration Key.');
            return;
        }
    }
};
