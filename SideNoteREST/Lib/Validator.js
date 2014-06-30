// Validator.js

var util = require('util');

module.exports = function ValidatorModel(email) {
    this.moduleName = 'validator';
    this.passwordLimitProperty = 8;
    if (email) {
        this.email = null;
    }

    this.init = function() {

    };

    this.sanitize = function(value) {
        // Sanitize value and return it
        return value;
    };

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
        if (password == null || password == ' ') {
            return 'password is required';
        } else if (password.length < this.passwordLimitProperty) {
            return 'password is must be at less ' + this.passwordLimitProperty + ' charaters.';
        }

        if (this.email) {
            var picrConnection = getPicrConnection();
            if (picrConnection) {
                picrConnection.query('SELECT * FROM user_credentials where email =' + picrConnection.escape(this.email), function(err, rows) {
                    if (err) {
                        appLogger.error('SQL couldn\'t find password for ' + this.email + '\n' + err);
                        picrConnection.end();
                        callback(true, err);
                        return;
                    } else if (!rows.password) {
                        var str = 'SQL couldn\'t find password for ' + this.email;
                        appLogger.error('SQL couldn\'t find password for ' + this.email);
                        picrConnection.end();
                        callback(true, str);
                        return;
                    }
                    if (getDecrypter().compareSync(password, rows.password.replace(rows.salt, ''))) {
                        callback(false, 'Password is correct.');
                    } else {
                        callback(true, 'Password is incorrect.');
                    }
                    return;
                });
            } else {
                callback(true, 'Issue with connecting to database.');
                return;
            }
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
        }
        if (isNaN(apikey) || apikey == null) {
            return "Bad apikey";
        }
        return true;
    };

    this.isEmailInSystem = function(email) {
        return true;
    };

    this.isRegistrationKey = function(key, callback) {
        if (this.email) {
            var picrConnection = getPicrConnection();
            if (picrConnection) {
                picrConnection.query('SELECT _id FROM user_credentials WHERE email =' + picrConnection.escape(this.email), function(err, rows) {
                    if (err) {
                        var str = 'SQL error couldn\'t get _id for ' + this.email + ' ' + err;
                        appLogger.error(str);
                        picrConnection.end();
                        callback(true, str);
                        return;
                    } else if (!rows[0]._id) {
                        appLogger.error('SQL error couldn\'t find _id for ' + this.email);
                        picrConnection.end();
                        callback(true, 'User isn\'t found in user_credentials, they are not registered.');
                        return;
                    }

                    appLogger.info('FOUND _id for ' + this.email + ' = ' + rows[0]._id);
                    picrConnection.query('SELECT code FROM user_verification WHERE _id =' + rows[0]._id, function(err, rows) {
                        if (err) {
                            var str = 'SQL error couldn\'t get code for ' + this.email + ' from user_verification ' + err;
                            appLogger.error(str);
                            picrConnection.end();
                            callback(true, str);
                            return;
                        } else if (!rows[0]._id) {
                            appLogger.error('SQL error couldn\'t find _id for ' + this.email);
                            picrConnection.end();
                            callback(true, 'User isn\'t found in user_credentials, they are not registered.');
                            return;
                        }
                        appLogger.info('FOUND code for ' + this.email + ' = ' + rows[0].code);
                        if (key === rows[0].code) {
                            callback(false, 'Registration Key is correct.');
                        } else {
                            callback(true, 'Registration Key is incorrect.');
                        }
                    });
                });
            } else {
                callback(true, 'Issue with connecting to database.');
                return;
            }
        } else {
            callback(true, 'A email is needed to verify Registration Key.');
        }
    }
};
