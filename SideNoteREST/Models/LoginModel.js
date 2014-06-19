'use strict';
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
var util = require('util');

function LoginModel() {
    this.moduleName = 'login';
    this.init = function() {

    };
    this.create = function(email, didfailLogin) {
        var picrConnection = getPicrConnection();

        if (picrConnection) {
            picrConnection.connect();
            picrConnection.query('SELECT _id FROM user_credentials WHERE email =' + picrConnection.escape(email), function(err, rows, fields) {
                if (err || !(rows[0])) {
                    appLogger().error('SQL error couldn\'t get _id\n' + rows);
                    picrConnection.end();
                    return false;
                }
                appLogger().info('FOUND _id for ' + email + ' = ' + rows[0]._id);

                var post = {
                    user_id: rows[0]._id,
                    success: 1,
                    timestamp: new Date()
                }
                //if we failed login me are going to mark it so.
                if (didfailLogin) {
                    post.success = 0;
                }

                //Writes to user_login table
                picrConnection.query('INSERT INTO user_login SET ?', post, function(err, rows, fields) {
                    if (err) {
                        appLogger().error('SQL couldn\'t INSERT INTO user_login table\n' + err);
                        picrConnection.end();
                        return false;
                    } else if (rows.affectedRows > 0) {
                        appLogger().info('INSERT INTO user_login ' + JSON.stringify(rows));
                    }
                    picrConnection.end();
                    //if we failed we are going to read how many times he failed login.
                    if (didfailLogin) {
                        this.read(post.user_id);
                    }
                    return true;
                });
            });
        } else {
            appLogger().error('Issue getting DB object.');
        }
    };

    this.delete = function() {

    };

    this.read = function(user_id) {

    };

    this.update = function() {

    };

    this.cleanUp = function() {

    };
};

util.inherits(LoginModel, BaseModel);
module.exports = LoginModel;
