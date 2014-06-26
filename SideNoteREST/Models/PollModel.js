// PictureModel.js
// ----------------------------------------

//tables:
//settings
// ----------------------------------------

//if we need a event manager;
var eventManager = getEventManager();
var BaseModel = getModelBase();

function PictureModel() {
    this.moduleName = 'picture';
    this.init = function() {
        if (evt) {
            evt.once('err', this.delete);
        } else {
            evt = getEventManager();
            evt.once('err', this.delete);
        }
    };
    this.create = function(data, callback) {
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            appLogger.info('SELECT FROM user_verification WHERE email = ' + picrConnection.escape(email));
            picrConnection.query('SELECT _id FROM user_credentials WHERE email =' + picrConnection.escape(email), function(err, rows) {
                if (err) {
                    appLogger.error('SQL couldn\'t SELECT INTO user_credentials table\n' + err);
                    picrConnection.end();
                    callback(true, err);
                    return;
                } else if (!(rows[0])) {
                    appLogger.error('SQL error couldn\'t get _id for ' + email);
                    picrConnection.end();
                    callback(true, 'couldn\'t find _id in user_credentials' + ' ' + email + ' ' + 'did correctly register.');
                    return;
                } else {
                    data.user_id = rows[0]._id;
                    appLogger.info('_id for ' + email + ' = ' + data.user_id);
                    var pictureModel = require(MODELS + 'Picture' + 'Model');
                    var m = new pictureModel(data.user_id);
                    m.create([data.picture_1, data.picture_2], function(bool, ){



                    });



                }
            });
        }
    };
    this.delete = function(data, callback) {};
    this.read = function(data, callback) {};
    this.update = function(data, callback) {};
    this.removeListeners = function() {};
    this.cleanUp = function() {};
};

getUtil().inherits(PictureModel, BaseModel);
module.exports = PictureModel;
