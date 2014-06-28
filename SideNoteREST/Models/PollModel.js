// PictureModel.js
// ----------------------------------------

//tables:
//poll, poll_state
// ----------------------------------------

//if we need a event manager;
var eventManager = getEventManager();
var BaseModel = getModelBase();

function PictureModel() {
    this.moduleName = 'picture';
    this.init = function() {
        if (eventManager) {
            eventManager.once('err', this.delete);
        } else {
            eventManager = getEventManager();
            eventManager.once('err', this.delete);
        }
    };
    this.create = function(data, callback) {
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            appLogger.info('SELECT FROM user_credentials WHERE email = ' + picrConnection.escape(data.email));
            picrConnection.query('SELECT _id FROM user_credentials WHERE email =' + picrConnection.escape(data.email), function(err, rows) {
                if (err) {
                    appLogger.error('SQL couldn\'t SELECT INTO user_credentials table\n' + err);
                    picrConnection.end();
                    callback(true, err);
                    return;
                } else if (!(rows[0])) {
                    appLogger.error('SQL error couldn\'t get _id for ' + data.email);
                    picrConnection.end();
                    callback(true, 'couldn\'t find _id in user_credentials' + ' ' + data.email + ' ' + 'didn\'t correctly register.');
                    return;
                }
                data.user_id = rows[0]._id;
                appLogger.info('FOUND user_id for ' + data.email + ' = ' + data.user_id);
                var pictureModel = require(MODELS + 'Picture' + 'Model');
                var p = new pictureModel(data.user_id);
                p.create([data.picture_01, data.picture_02], function(bool, rows, err) {
                    if (err) {
                        appLogger.error('failed to save image to picture table.');
                        picrConnection.end();
                        callback(bool, err);
                        p.cleanUp();
                        return;
                    }
                    data.picture_1_id = rows.insertId;
                    data.picture_2_id = rows.insertId + 1;
                    var post = {
                        user_id: data.user_id,
                        question: data.question,
                        picture_1_id: data.picture_1_id,
                        picture_2_id: data.picture_2_id
                    };
                    p.cleanUp();
                    appLogger.info('INSERT INTO poll for' + ' ' + picrConnection.escape(data.email));
                    picrConnection.query('INSERT INTO poll SET ?', post, function(err, rows) {
                        if (err) {
                            appLogger.error('SQL couldn\'t INSERT INTO poll table\n' + err);
                            picrConnection.end();
                            callback(true, err);
                            return;
                        } else if (rows.affectedRows > 0) {
                            appLogger.info('INSERT INTO poll ' + JSON.stringify(rows));
                        }
                        var secondPost = {
                            _id: rows.insertId,
                            closed: 0,
                            vote_1: 0,
                            vote_2: 0,
                            close_on_vote: data.close_on_vote,
                            close_on_time: data.close_on_time,
                            share_type_id: data.share_type_id,
                            open_timestamp: new Date(),
                            close_timestamp: data.close_timestamp
                        };
                        appLogger.info('INSERT INTO poll_state for' + ' ' + picrConnection.escape(data.email));
                        picrConnection.query('INSERT INTO poll_state SET ?', secondPost, function(err, rows) {
                            if (err) {
                                appLogger.error('SQL couldn\'t INSERT INTO poll_state table\n' + err);
                                eventManager.emit('err', secondPost._id);
                                picrConnection.end();
                                callback(true, err);
                                return;
                            } else if (rows.affectedRows > 0) {
                                appLogger.info('INSERT INTO poll_state ' + JSON.stringify(rows));
                            }
                            picrConnection.end();
                            callback(false);
                        });
                    });
                });
            });
        }
    };

    this.delete = function(_id) {
        if (!_id) {
            appLogger.error('_id is needed for DELETEING.');
            return;
        }
        appLogger.warn('Atending to delete poll_id = ' + _id + ' from the poll table!');
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            picrConnection.query('DELETE FROM poll WHERE _id = ' + picrConnection.escape(_id), function(err, rows) {
                if (err) {
                    //their is a issue if we can not delete from this table.
                    appLogger.error('SQL couldn\'t DELETE FROM poll table\n' + err);
                } else if (rows.affectedRows > 0) {
                    appLogger.info('DELETE FROM poll ' + JSON.stringify(rows));
                }
            });
        }
    };

    this.read = function(data, callback) {};
    this.update = function(data, callback) {};
    this.removeListeners = function() {
        if (eventManager) {
            eventManager.removeAllListeners(['err']);
        }
    };

    this.cleanUp = function() {
        this.removeListeners();
    };

};
getUtil().inherits(PictureModel, BaseModel);
module.exports = PictureModel;
