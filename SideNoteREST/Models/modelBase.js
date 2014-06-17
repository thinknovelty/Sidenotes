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
    
    init: function() {
        appLogger().info('init ' + moduleName);
    },

    create: function() {
        appLogger().info('create ' + moduleName);
    },

    delete: function() {
        appLogger().info('delete ' + moduleName);
    },

    read: function() {
        appLogger().info('read ' + moduleName);
    },

    update: function() {
        appLogger().info('update ' + moduleName);
    },
    
    cleanUp: function() {
        appLogger().info('cleanUp ' + moduleName);
    }
}
