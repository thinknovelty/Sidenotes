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

var moduleName = 'login';

module.exports = extend(getModelBase(), {

    init: function() {

    },
    create: function(email) {
        var picrConnection = getPicrConnection();

        if (picrConnection) {
            picrConnection.connect();
            picrConnection.query('SELECT _id FROM user_credentials WHERE email =' + picrConnection.escape(email), function(err, rows, fields) {
                if (err || !(rows[0])) {
                    appLogger().error('SQL error couldn\'t get _id\n' + rows);
                    picrConnection.end();
                    return false;
                }
                appLogger().info('_id for ' + email + ' = ' + rows[0]._id);

                //Writes to user_login table
                picrConnection.query('INSERT INTO user_login SET ?', {
                    user_id: rows[0]._id,
                    success: 1,
                    timestamp: new Date()
                }, function(err, rows, fields) {
                    if (err) {
                        appLogger().error('SQL couldn\'t INSERT INTO user_login table\n' + err);
                        picrConnection.end();
                        return false;
                    }
                    appLogger().info(rows);
                    picrConnection.end();
                });
            });
        } else {
            appLogger().error('Issue getting DB object.');
        }
    },

    delete: function() {

    },

    read: function() {

    },

    update: function() {

    },

    cleanUp: function() {

    }

});
