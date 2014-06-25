// -----------------------------------------------------------
//pollController.js


//Call Types:
// POST:
// localhost/poll/

// POST Variables:
//      question : 'what should i wear today.'
//      picture01 : <image>
//      picture02 : <image>
//      email: hubbertj@gmail.com
//      apikey: adssaddsa
//      votes_to_close: 5 <one or both>
//      time_to_close: 5000 <in mins>

// - This controller has the ablility to create a poll.
// ------------------------------------------------------------
//pollController.js

module.exports = {
    //defaults
    question: null,
    picture_01: null,
    picture_02: null,
    email: null,
    apikey: null,
    votes_to_close: null,
    time_to_close: null,

    init: function(req, res, call) {
        if (call.question) {
            this.question = call.question;
        }
        if (call.picture_01) {
            this.picture_01 = call.picture_01;
        }
        if (call.picture_02) {
            this.picture_02 = call.picture_02;
        }
        if (call.email) {
            this.email = call.email;
        }
        if (call.apikey) {
            this.apikey = call.apikey;
        }
        if (call.votes_to_close) {
            this.votes_to_close = call.votes_to_close;
        }
        if (call.time_to_close) {
            this.time_to_close = call.time_to_close;
        }
    },

    results: function(callback) {
        if (this.callType === 'GET') {
            this.getResults(callback)
        } else if (this.callType === 'POST') {
            this.postResults(callback);
        } else if (this.callType === 'PUT') {
            this.putResults(callback);
        } else if (this.callType === 'DELETE') {
            this.deleteResults(callback);
        }
    },

    putResults: function(callback) {
        callback([{
            message: 'call is not set up for a get put.',
            success: 0,
            error: 05
        }]);
    },

    getResults: function(callback) {
        callback([{
            message: 'call is not set up for a get call.',
            success: 0,
            error: 05
        }]);
    },

    deleteResults: function(callback) {
        callback([{
            message: 'call is not set up for a get delete.',
            success: 0,
            error: 05
        }]);
    },

    postResults: function(callback) {
        callback([{
            message: 'call is not set up for a get post.',
            success: 0,
            error: 05
        }]);
    },

    cleanUp: function() {
        this.question = null;
        this.picture_01 = null;
        this.picture_02 = null;
        this.email = null;
        this.apikey = null;
        this.votes_to_close = null;
        this.time_to_close = null;
    },
    //if fails should tell us why.
    validate: function(data) {
        var validatorModel = getValidator();
        var v = new validatorModel(data.email);
        v.init();

        if (v.isQuestion(data.question) !== true) {
            return v.isQuestion(data.question);
        } else if (v.picture_01(data.picture_01) !== true) {
            return v.picture_01(data.picture_01);
        } else if (v.picture_02(data.picture_02) !== true) {
            return v.picture_02(data.picture_02);
        } else if (v.isEmail(data.email) !== true) {
            return v.isEmail(data.email);
        } else if (v.isEmailInSystem(data.email) !== true) {
            return v.isEmailInSystem(data.email);
        } else if (v.isVoteToClose(data.votes_to_close) !== true) {
            return v.isVoteToClose(data.votes_to_close);
        } else if (v.isTimeToClose(data.time_to_close) !== true) {
            return v.isTimeToClose(data.time_to_close);
        } else if (v.checkAPIKEY(apikey) !== true) {
            return v.checkAPIKEY(apikey);
        }

        //if everything is good return clean.
        return true;
    }
};
