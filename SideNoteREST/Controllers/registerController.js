'use strict';
// -----------------------------------------------------------
//registerController.js

// -required variables
// firstname
// lastname
// username
// apikey
// email
// pw
// dob









// ------------------------------------------------------------

var moduleName = 'register';

//defaults
var apikey = null;
var email = null;
var pw = null;
var firstname = null;
var lastname = null;
var dob = null;
var username = null;

//if fails should tell us why.
var validate = function() {

    var validator = getValidator();

    if (validator.checkAPIKEY(apikey) !== true) {
        return 'BAD apikey';
    } else if (validator.isEmail(email) !== true) {
        return validator.isEmail(email);
    } else if (validator.isUsername(username) !== true) {
        return validator.isUsername(username);
    } else if (validator.isPassword(pw) !== true) {
        return validator.isPassword(pw);
    } else if (validator.isFirstname(firstname) !== true) {
        return validator.isFirstname(firstname);
    } else if (validator.isLastname(lastname) !== true) {
        return validator.isLastname(lastname);
    } else if (validator.isDateofbirth(dob) !== true) {
        return validator.isDateofbirth(dob);
    }

    //TODO: check if email,username, are not used in DB
    return true;
};

var writeToDB = function(model) {

    var writeInto = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        pw: pw,
        dob: dob,
    };

    // console.log('Writing  to DB ' + JSON.stringify(writeInto));
    //call my model and the model should do CRUD 
};


module.exports = extend(getControllerBase(), {
    callType: 'POST',

    init: function(req, res, call) {

        if (call.apikey) {
            apikey = call.apikey;
        }
        if (call.email) {
            email = call.email;
        }
        if (call.pw) {
            pw = call.pw;
        }
        if (call.firstname) {
            firstname = call.firstname;
        }
        if (call.lastname) {
            lastname = call.lastname;
        }
        if (call.dob) {
            dob = call.dob;
        }
        if (call.username) {
            username = call.username;
        }
    },

    setApikey: function(apikey) {
        apikey = apikey;
    },

    getApikey: function() {
        return apikey;
    },
    setEmail: function(par) {
        email = par;
    },
    getEmail: function() {
        return email;

    },
    setPw: function(par) {
        pw = par;
    },
    getPw: function() {
        return pw;

    },
    setFirstname: function(par) {
        firstname = par;
    },
    getFirsname: function() {
        return firstname;

    },
    setLastname: function(par) {
        lastname = par;
    },
    getLastname: function() {
        return lastname;

    },
    getDob: function() {
        return dob;

    },
    setDob: function(par) {
        dob = par;
    },

    results: function() {
        var model = require(MODELS + moduleName + 'Model');
        model.init();
        model.create();

        if (validate() == true) {
            writeToDB();
            model.cleanUp();
            return [{
                Message: 'Successfully registered'
            }];
        }

        model.cleanUp();
        return [{
            Error: validate()
        }];
    },

    cleanUp: function() {
        apikey = null;
        email = null;
        pw = null;
        firstname = null;
        lastname = null;
        dob = null;
    }
});
