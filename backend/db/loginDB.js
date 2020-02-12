var pool = require("../services/database").pool;

module.exports.signinAdmin = function(id, pwd, callback){
    pool.getConnection(function(err, connection){

        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_user WHERE user_id = ? AND password= ?"
        connection.query(query,[id, pwd],
            function(err, result){
                connection.release()
                
                if(err){
                    console.log(err);
                    callback(false, null, null)
                }
                        
                callback(result);
            })
    })
}

module.exports.loginInfo = function(user_id, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT user_id, role, auth, approve_state FROM tbl_user WHERE user_id = ?";

        connection.query(query, [user_id], function(err, result) {
            connection.release();

            if(err) {
                console.log(err);
                callback(false);
                return;
            }

            callback(result);
        });
    });
}

module.exports.save = function(saveName, singer, songTitle, album, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return;
        }
        var query ="INSERT INTO tbl_list (thumbnail, artist, songTitle, album, date) VALUE (?, ?, ?, ?, now())"
        connection.query(query, [saveName, singer, songTitle, album],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }

                callback(true);
                // callback(result);
            })
    })
}

module.exports.saveMovie = function(saveName, addMovieThumbnail, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return;
        }
        var query ="UPDATE tbl_list SET movieUrl = ?, date = now()  WHERE thumbnail = ? "
        connection.query(query, [saveName, addMovieThumbnail],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }

                callback(true);
                // callback(result);
            })
    })
}