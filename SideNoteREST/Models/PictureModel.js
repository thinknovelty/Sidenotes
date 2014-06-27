// PictureModel.js
// ----------------------------------------

//tables:
//picture
// ----------------------------------------

//if we need a event manager;
var eventManager = getEventManager();
var BaseModel = getModelBase();

function PictureModel(user_id) {
    this.moduleName = 'picture';
    this.user_id = null;
    if (user_id) {
        this.user_id = user_id;
    }
    this.init = function() {};

    this.create = function(imageArr, callback) {
        var outArr = [];
        var mode = getAppMode();
        //creates the DB connection;
        var picrConnection = getPicrConnection();
        if (picrConnection) {
            var queryStr = 'INSERT INTO picture(name, timestamp) values';
            for (i = 0; i > imageArr.length; i++) {
                var name = new Date().getTime().toString() + this.user_id;
                outArr.push(name);
                query += '(' + name + ', now())';
                if (!(i == imageArr.length)) {
                    query += ',';
                }
                console.log(name);
                
                // require("fs").writeFile("out.png", imageArr[i], 'base64', function(writeError) {
                //     if(writeError){


                //         callback(true, writeError);
                //         return;
                //     }
                // });
            }
            //Writes to user_credentials Table
            picrConnection.query(queryStr, function(err, rows) {
                if (err) {
                    appLogger.error('SQL couldn\'t INSERT INTO picture table\n' + err);
                    picrConnection.end();
                    callback(true, err);
                    return;
                }
                appLogger.info('INSERT INTO picture ' + JSON.stringify(rows));
                // wirte to the image to fileSystem.







                picrConnection.end();
                callback(false);
            });
        }
    };

    this.delete = function(con, callback) {};
    this.read = function(con, callback) {};
    this.update = function(con, callback) {};
    this.removeListeners = function() {};
    this.cleanUp = function() {
        this.user_id = null;
    };
};

getUtil().inherits(PictureModel, BaseModel);
module.exports = PictureModel;
