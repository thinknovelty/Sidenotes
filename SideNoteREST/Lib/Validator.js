// Credential Validator
// Validator.js

var moduleName = 'Validator';

module.exports = {

    sanitize: function(value) {
        // Sanitize value and return it
        return value;
    },
    // Validate e-mail string
    isEmail: function(email) {

        if (email == null) {
            return 'BAD email address';
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
            return 'BAD password';
        }

        var decryptor = getDecrypter();
        return true;
    },
    // Validate firstname string
    isFirstname: function(firstname) {

        if (firstname == null) {
            return 'BAD firstname';
        }

        return true;
    },
    // Validate lastname string
    isLastname: function(lastname) {

        if (lastname == null) {
            return 'BAD lastname';
        }

        return true;
    },
    // Validate dateofbirth date object
    isDateofbirth: function(date) {

        if (isNaN(date.getTime())) {
            return 'BAD dateofbirth';
        }

        return true;
    },

    // Validate Gender boolean
    isGender: function(gender) {

        if (gender == null || typeof gender != 'boolean') {
            return 'BAD gender';
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
    }
};
