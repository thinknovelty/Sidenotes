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
            //loop so we can form the query and save the image in out dir
            for (var i = 0; i < imageArr.length; i++) {
                var name = getGuid();
                outArr.push(name);
                queryStr += '(\'' + name + '\', now())';
                if (!(i + 1 == imageArr.length)) {
                    queryStr += ',';
                }
                //decodes the image into a Buffer.
                var decodedImage = new Buffer(imageArr[i], 'base64');

                //write image to dir orginal
                if (mode == 'development') {
                    require("fs").writeFile(getOriginalImgDir() + name + '.' + appConfig().image_format, decodedImage, function(err) {
                        if (err) {
                            appLogger.error('Issue with saving image to the file system.' + err);
                            callback(true, rows, err);
                            return;
                        }
                        appLogger.info('Save image' + ' ' + name + '.' + appConfig().image_format);
                    });
                }
                if (mode == 'production') {
                    require("fs").writeFile(getOriginalImgDir() + name + '.' + appConfig().image_format, decodedImage, function(err) {
                        if (err) {
                            appLogger.error('Issue with saving image to the file system.' + err);
                            throw Error(err);
                            callback(true, rows, err);
                            return;
                        }
                        appLogger.info('Save image' + ' ' + name + '.' + appConfig().image_format);
                    });
                }
            }
            //Writes to user_credentials Table
            picrConnection.query(queryStr, function(err, rows) {
                if (err) {
                    appLogger.error('SQL couldn\'t INSERT INTO picture table\n' + err);
                    
                    picrConnection.end();
                    callback(true, rows, err);
                    return;
                }
                appLogger.info('INSERT INTO picture ' + JSON.stringify(rows));
                picrConnection.end();
                callback(false, rows);
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
