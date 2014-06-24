
// Validator.js

var util = require('util');

module.exports = function ValidatorModel(email) {
    this.moduleName = 'validator';
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
        if (username == null) {
            return 'BAD username';
        }
        return true;
    };

    // Validate password string
    this.isPassword = function(password) {
        if (password == null || password == ' ') {
            return 'password is required';
        }
        if (this.email) {
            //we need to check the password with the decrypter
            var decrypterModel = getDecrypter();
            var d = new decrypterModel();
            d.cleanUp();
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

    this.isRegistrationKey = function(key) {
        return true;
    }
};
