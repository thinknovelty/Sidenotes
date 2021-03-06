// LoginModel.js
// ----------------------------------------
//  CRUD
//  all models should have a:
//  init()
//  create()
//  delete()
//  read()
//  update()
//  cleanUp()

//tables:
//user_login
// ----------------------------------------

//if we need a event manager;
var eventManager = getEventManager();
var BaseModel = getModelBase();

function LoginModel() {
    this.moduleName = 'login';

    this.init = function() {
        if (eventManager) {
            eventManager.once('readLoginAndLock', this.readLoginAttemptsAndLockUser);
        } else {
            eventManager = getEventManager();
            eventManager.once('readLoginAndLock', this.readLoginAttemptsAndLockUser);
        };
    };

    //      usage: 
    //      email = the login name; 
    //      didfailLogin = (true) if we already falsed validation (false) if we passed validzation;
    //      callback = used to trigger the calling object (optional);
    this.create = function(email, didfailLogin, callback) {
        if (!email) {
            appLogger.error('email is required for loginModel create()');
            return;
        }
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            var uuid = getuuid().v1();
            var post = {};
            if (didfailLogin) {
                post.success = 0;
                post.uuid = null;
            } else {
                post.success = 1;
                post.uuid = uuid;
            }
            post.timestamp = new Date();
            post.isExpired = 0;
            picrConnection.query('INSERT INTO user_login(uuid,user_id,success,timestamp) SELECT ' + picrConnection.escape(post.uuid) + ', user_credentials._id , ' +
                picrConnection.escape(post.success) + ', ' + picrConnection.escape(post.timestamp) + '  FROM user_credentials WHERE email = ' + picrConnection.escape(email),
                function(err, rows) {
                    if (err) {
                        appLogger.error('SQL couldn\'t INSERT INTO user_login table\n' + err);
                        picrConnection.end();
                        if (callback) {
                            callback(false, err);
                        }
                        return;
                    } else if (rows.affectedRows > 0) {
                        appLogger.info('INSERT INTO user_login ' + JSON.stringify(rows));
                    }
                    picrConnection.end();
                    if (didfailLogin && callback) {
                        callback(true, null);
                    } else {
                        callback(true, post.uuid);
                    }
                    //if we failed we are going to read how many times they failed the login process.
                    if (didfailLogin) {
                        eventManager.emit('readLoginAndLock', rows[0]._id);
                    }
                });
        } else {
            appLogger.error('Issue getting DB object.');
        }
    };

    this.delete = function() {

    };

    //      usage: 
    //      user_id = the user ID which you want to read
    //      callback = used to trigger the calling object with the amount of times the user attempted to login (optional);
    this.readLoginAttemptsAndLockUser = function(user_id, callback) {
        if (!user_id) {
            appLogger.error('user_id is required for loginModel readLoginAttemptsAndLockUser()');
            return;
        }
        appLogger.info('Checking user = ' + user_id + ' for failed login attempts.');
    };
    //reads if the user is locked or not.
    this.read = function(email, callback) {
        if (!email) {
            appLogger.error('email is required for loginModel read()');
            return;
        }
        var picrConnection = getPicrConnection();




    };

    this.update = function() {

    };

    this.removeListeners = function() {
        if (eventManager) {
            eventManager.removeAllListeners(['readLoginAndLock']);
        }
    };

    this.cleanUp = function() {
        this.removeListeners();
    };
};

getUtil().inherits(LoginModel, BaseModel);
module.exports = LoginModel;
