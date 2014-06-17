'use strict';
//base for all models!

module.exports = {

    get: function(str) {
        if (this[str] != null) {
            return this[str];
        }
    },

    set: function(str, value) {
        this[str] = value;
    },

    //generates a random 32 digit key;
    generateRegistrationKey : function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 32; i++) {

            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
