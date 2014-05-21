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
}
