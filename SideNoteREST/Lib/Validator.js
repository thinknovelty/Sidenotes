// Credential Validator
// Validator.js

var moduleName = 'Validator';
var util = require('util');

module.exports = {

    sanitize: function(value) {
        // Sanitize value and return it
        return value;
    },
    // Validate e-mail string
    isEmail: function(email) {
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        if (email == null || atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
            return 'email address is required please check your format';
        }
        return true;
    },
    // Validate username string
    isUsername: function(username) {

        if (username == null) {
            return 'BAD username';
        }

        return true;
    },
    // Validate password string
    isPassword: function(password) {

        if (password == null || password == ' ') {
            return 'password is required';
        }

        var decryptor = getDecrypter();
        return true;
    },
    // Validate firstname string
    isFirstname: function(firstname) {

        if (firstname == null) {
            return 'first_name is required';
        }

        return true;
    },
    // Validate lastname string
    isLastname: function(lastname) {

        if (lastname == null) {
            return 'last_name is required';
        }

        return true;
    },
    // Validate Date Of Birth date object
    isDateofbirth: function(brithday) {
        if (!brithday || !(util.isDate(brithday)) || brithday.toString() === 'Invalid Date') {
            return 'Bad brithday format should be MM/DD/YYYY';
        }
        return true;
    },

    // Validate Sex boolean
    isSex: function(sex) {

        if (sex == null || typeof sex != 'boolean') {
            return 'Bad Sex 0 = Female; 1 = Male;';
        }

        return true;
    },

    // we currently just check for a number.
    checkAPIKEY: function(apikey) {

        if (GLOBAL.getAppMode() == 'development') {
            return true;
        }

        if (isNaN(apikey) || apikey == null) {
            return "Bad apikey";
        }

        return true;
    },
    isEmailInSystem: function(email) {

        return true;
    },
    isRegistrationKey: function(key) {

        return true;
    }
};
