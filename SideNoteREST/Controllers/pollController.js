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
    id: null,

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
        if (call.id) {
            this.id = call.id;
        }
        if (call.poll_id) {
            this.poll_id = parseInt(call.poll_id);
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
        //      error codes
        var CODE_POLL_UPDATE_ERROR = this.CODE_POLL_UPDATE_ERROR;
        var ERROR_NO_ERROR = this.ERROR_NO_ERROR;
        var data = {
            email: this.email,
            uuid: this.uuid,
            id: this.id,
            poll_id: this.poll_id
        };
        var isvalid = this.validate(data);
        if (isvalid !== true) {
            callback([{
                message: 'Failed to close poll.',
                error: CODE_POLL_UPDATE_ERROR,
                errormsg: isvalid
            }]);
            return;
        } else if (data.id && data.id === 'close') {
            this.closePoll(data, function(arr) {
                callback(arr);
            });
            return;
        }
        callback([{
            message: 'Failed to close poll.',
            error: CODE_POLL_UPDATE_ERROR,
            errormsg: 'ID required for PUT call.'
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
            close_timestamp: this.calcCloseTime(this.close_on_time, new Date()),
            id: this.id,
            uuid: this.uuid
        };
        this.validate(isvalid, function() {
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
        });
    },

    closePoll: function(data, callback) {
        //      error codes
        var CODE_POLL_UPDATE_ERROR = this.CODE_POLL_UPDATE_ERROR;
        var ERROR_NO_ERROR = this.ERROR_NO_ERROR;
        var model = require(MODELS + this.moduleName + 'Model');
        var m = new model();
        m.init();
        m.update(data, function(didFail, err) {
            if (didFail) {
                callback([{
                    message: 'Failed to udpate poll.',
                    success: 00,
                    error: CODE_POLL_UPDATE_ERROR,
                    errormsg: err
                }]);
            } else {
                callback([{
                    message: 'Poll update successfully',
                    success: 01,
                    error: ERROR_NO_ERROR,
                }]);
            }
            m.cleanUp();
        });
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
        this.id = null;
    },
    //if fails should tell us why. TODO: add check for share_id
    validate: function(data, callback) {
        var validatorModel = getValidator();
        var v = new validatorModel(data.email);
        if (v.isEmail(data.email) !== true) {
            callback(v.isEmail(data.email));
        } else if (v.isPicture(data.picture_01) !== true) {
            callback('Error: Issue with picture_01');
        } else if (v.isPicture(data.picture_02) !== true) {
            callback('Error: Issue with picture_02');
        } else if (v.isEmail(data.email) !== true) {
            callback(v.isEmail(data.email));
        } else if (v.isVoteToClose(data.votes_to_close) !== true) {
            callback(v.isVoteToClose(data.votes_to_close));
        } else if (v.isTimeToClose(data.close_on_time) !== true) {
            callback(v.isTimeToClose(data.close_on_time));
        } else {
            v.isEmailInSystem(data.email, function(didfail, err) {
                if (didfail) {
                    callback(err);
                } else {
                    v.isUUID(data.uuid, function(didfail, err) {
                        if (didfail) {
                            callback(err);
                        } else {
                            callback(true);
                        }
                    });
                }
            });
        }
    },
};
