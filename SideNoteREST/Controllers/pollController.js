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
//      close_on_vote: 5 
//      close_on_time: 5000
//      share_type_id: 1

//tabels:
// poll, poll_state


// - This controller has the ablility to create a poll.
// ------------------------------------------------------------
//pollController.js

module.exports = {
    //  defaults
    question: null,
    picture_01: null,
    picture_02: null,
    share_type_id: null,
    email: null,
    apikey: null,
    close_on_vote: null,
    close_on_time: null,
    uuid: null,

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
        if (call.share_type_id) {
            this.share_type_id = call.share_type_id;
        }
        if (call.close_on_vote) {
            this.close_on_vote = call.close_on_vote;
        }
        if (call.close_on_time) {
            this.close_on_time = call.close_on_time;
        }
        if (call.uuid) {
            this.uuid = call.uuid;
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
            error: this.CODE_POLL_CREATE_ERROR
        }]);
    },

    getResults: function(callback) {
        callback([{
            message: 'call is not set up for a get call.',
            success: 0,
            error: this.CODE_POLL_CREATE_ERROR
        }]);
    },

    deleteResults: function(callback) {
        callback([{
            message: 'call is not set up for a get delete.',
            success: 0,
            error: this.CODE_POLL_CREATE_ERROR
        }]);
    },
    calcCloseTime: function(close_on_time, date) {
        if (!close_on_time) {
            return null;
        }
        return new Date(date.getTime() + close_on_time * 60000);
    },
    postResults: function(callback) {
        //      error codes
        var CODE_POLL_CREATE_ERROR = this.CODE_POLL_CREATE_ERROR;
        var ERROR_NO_ERROR = this.ERROR_NO_ERROR;

        var data = {
            question: this.question,
            picture_01: this.picture_01,
            picture_02: this.picture_02,
            email: this.email,
            share_type_id: this.share_type_id,
            close_on_vote: this.close_on_vote,
            close_on_time: this.close_on_time,
            close_timestamp: this.calcCloseTime(this.close_on_time, new Date())
        };
        var isvalid = this.validate(data);
        if (isvalid !== true) {
            callback([{
                message: 'Failed poll create process.',
                error: CODE_POLL_CREATE_ERROR,
                errormsg: isvalid
            }]);
        } else {

            var model = require(MODELS + this.moduleName + 'Model');
            var m = new model();

            m.init();

            m.create(data, function(didFail, err) {
                if (didFail) {
                    callback([{
                        message: 'Failed to create poll.',
                        success: 00,
                        error: CODE_POLL_CREATE_ERROR,
                        errormsg: err
                    }]);
                } else {
                    callback([{
                        message: 'Poll created successfully',
                        success: 01,
                        error: ERROR_NO_ERROR,
                    }]);
                }
                m.cleanUp();
            });
        }
    },

    cleanUp: function() {
        this.question = null;
        this.picture_01 = null;
        this.picture_02 = null;
        this.email = null;
        this.apikey = null;
        this.votes_to_close = null;
        this.close_on_time = null;
        this.share_type_id = null;
        this.uuid = null;
    },
    //if fails should tell us why.
    validate: function(data) {
        if (!data.close_on_vote && !data.close_on_time) {
            return 'Close type is required.'
        }
        var validatorModel = getValidator();
        var v = new validatorModel(data.email);
        v.init();

        // if (v.isQuestion(data.question) !== true) {
        //     return v.isQuestion(data.question);
        // } else if (v.picture_01(data.picture_01) !== true) {
        //     return v.picture_01(data.picture_01);
        // } else if (v.picture_02(data.picture_02) !== true) {
        //     return v.picture_02(data.picture_02);
        // } else if (v.isEmail(data.email) !== true) {
        //     return v.isEmail(data.email);
        // } else if (v.isEmailInSystem(data.email) !== true) {
        //     return v.isEmailInSystem(data.email);
        // } else if (v.isVoteToClose(data.votes_to_close) !== true) {
        //     return v.isVoteToClose(data.votes_to_close);
        // } else if (v.isTimeToClose(data.close_on_time) !== true) {
        //     return v.isTimeToClose(data.close_on_time);
        // } else if (v.checkAPIKEY(apikey) !== true) {
        //     return v.checkAPIKEY(apikey);
        // }

        //if everything is good return clean.
        return true;
    }
};
