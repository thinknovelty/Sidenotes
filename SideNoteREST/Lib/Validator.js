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
    // Validate dateofbirth string
    isDateofbirth: function(dateofbirth) {

        if (dateofbirth == null) {
            return 'BAD dateofbirth';
        }

        return true;
    },
    // we currently just check for a number.
    checkAPIKEY: function(apikey) {

        if (GLOBAL.getAppMode() == 'development') {
            return true;
        }

        if (isNaN(apikey) || apikey == null) {
            return false;
        }
        return true;
    }
};
