
// ConfigurationModel.js
// ----------------------------------------

//tables:
//settings
// ----------------------------------------

//if we need a event manager;
var eventManager = getEventManager();
var BaseModel = getModelBase();

function ConfigurationModel() {
    this.moduleName = 'configuration';

    this.init = function() {};
    this.create = function(con, callback) {};
    this.delete = function(con, callback) {

    };

    this.read = function(con, callback) {

    };

    this.update = function(con, callback) {
        if (!con) {
            appLogger.error('failed to pass in configurations in ConfigurationModel.update()');
            return;
        }
        var arr = Object.keys(con);
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            picrConnection.query('UPDATE SETTINGS SET ? WHERE setting_name =' + picrConnection.escape(arr[0]), {
                value: con[arr[0]]
            }, function(err, rows) {
                if (err) {
                    appLogger.error('SQL couldn\'t UPDATE SETTINGS table\n' + err);
                    picrConnection.end();
                    callback(false, err);
                    return;
                } else if (rows.affectedRows > 0) {
                    appLogger.info('UPDATE value in SETTINGS for ' + arr[0] + ' ' + JSON.stringify(rows));
                    picrConnection.end();
                    callback(true);
                    return;
                }
                picrConnection.end();
                callback(true, 'Setting not found');
            });
        }
    };

    this.removeListeners = function() {

    };

    this.cleanUp = function() {

    };
};

getUtil().inherits(ConfigurationModel, BaseModel);
module.exports = ConfigurationModel;
