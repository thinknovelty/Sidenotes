//this is the model which we will use to validate the API KEY.
var api = null;
var whoAmI = 'anonymous';

module.exports = {
    init: function(api) {

        if (api == null) {
            whoAmI = 'anonymous';
            return;
        }

        if (GLOBAL.getAppMode() == 'development') {
            whoAmI = '00000000';
        }

        //getting date and find the person who wons the API
        //set whoAmI to the person who owns this api key. db call
        appLogger().info('Checking who owns api = ' + api);

    },

    setAPI: function(api) {
        this.api = api;
    },

    getAPI: function() {
        return this.api;
    },

    validate: function() {
        if (whoAmI == 'anonymous') {
            return false;
        }

        return true;
    },
};
