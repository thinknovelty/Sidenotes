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
var gender = null;

//if fails should tell us why.
var validate = function() {

    var validator = getValidator();

    if (validator.checkAPIKEY(apikey) !== true) {
        return validator.checkAPIKEY(apikey);
    } 
    else if (validator.isEmail(email) !== true) {
        return validator.isEmail(email);
    }  
    else if (validator.isPassword(pw) !== true) {
        return validator.isPassword(pw);
    }
    else if (validator.isFirstname(firstname) !== true) {
        return validator.isFirstname(firstname);
    } 
    else if (validator.isLastname(lastname) !== true) {
        return validator.isLastname(lastname);
    } 
    else if (validator.isDateofbirth(dob) !== true) {
        return validator.isDateofbirth(dob);
    }
    else if (validator.isGender(gender) !== true) {
        return validator.isGender(gender);
    }

    //TODO: check if email,username, are not used in DB
    return true;
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
        //this get turned into a date obj 
        if (call.dob) {
            dob = new Date(call.dob);
        }
        if (call.lastname) {
            lastname = call.lastname;
        }
        //1 = male , 0 = female
        if (call.gender) {
            gender = Boolean(call.gender);
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

        if (validate() == true) {
            // bundle the obj and adds salt and registrationKey;
            var userData = {
                email: email,
                first_name: firstname,
                last_name: lastname,
                birthday: dob,
                password: pw,
                sex: gender,
                salt: this.generateKey(),
                registrationKey: this.generateKey()
            };

            model.create(userData);

            

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
