'use strict';
// RegisterModel.js
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
//USER, PICTURE

//EXAMPLE testdata:
//  INSERT INTO picture( name, timestamp) VALUES ('Female', NOW());
//  INSERT INTO picture( name, timestamp) VALUES ('Male', NOW());
//  INSERT INTO user(first_name, last_name, sex, birthday, avatar_id) VALUES ('John', 'Doe', '0', STR_TO_DATE('1-09-1982', '%d-%m-%Y'), 1);
//  INSERT INTO user(first_name, last_name, sex, birthday, avatar_id) VALUES ('Mary', 'Doe', '0', STR_TO_DATE('20-01-1990', '%d-%m-%Y'), 2);

// ----------------------------------------

var moduleName = 'register';

//generates a random 30 digit key;
var generateRegistrationKey = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 30; i++) {

        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var sendVerificationEmail = function(registrationKey, email) {

    //creates the link so we can verify the registration.
    var mylink = appConfig().host + '/' + moduleName + '/activation?registerKey=' + registrationKey;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Fred Foo <foo@blurdybloop.com>", // sender address
        to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
        subject: 'no-reply - Registration picr', // REQUIRED.
        text: "Hello world", // plaintext body
        html: "<b>Hello world</b>" // html body
    }

    // send mail with defined transport object
    PicrsmtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            appLogger().error(error);
        } else {
            appLogger().info('Email Sent ' + response.message);
        }
    });
};

var writeToDB = function(data) {

    if (PicrConnection) {
        PicrConnection.connect();
        console.log(data);

        //Writes to User Table
        PicrConnection.query("INSERT INTO user(first_name, last_name, sex, birthday, avatar_id) 
            VALUES ('" + data.frist + "', '" + data.last + "', '" + date.gender + "', STR_TO_DATE('" + data.dob.toString("dd-MM-yyyy") + "',
             '%d-%m-%Y'), 2)",
            function(err, rows, fields) {
                if (err) {
                    throw err;
                    return;
                }
                appLogger().info(rows);

                if (rows.insertID) {
                    PicrConnection.query("INSERT INTO user_credentials(_id, email, password, salt) VALUES(" + rows.insertID + ",'" + data.email + "', '" + data.password + "', '" + getSalt() + "')", function(err, rows, fields) {
                            if (err) {
                                throw err;
                                return;
                            }
                            appLogger().info(rows);

                        }
                    }
                });


            PicrConnection.end();
        }
    };

    var getSalt = function(){
        return '1231dwedasd233324';
    }

    module.exports = extend(getModelBase(), {
        registrationKey: null,

        init: function() {
            if (!this.registrationKey) {
                this.registrationKey = generateRegistrationKey();
            }
        },

        create: function(userData) {

            //sends the registration email we need.
            sendVerificationEmail(this.registrationKey, userData.email);

            //writes to DB
            writeToDB(userData);
        },

        read: function() {

        },

        update: function() {

        },

        delete: function() {

        },

        cleanUp: function() {
            this.registrationKey = null;
        },

    });
