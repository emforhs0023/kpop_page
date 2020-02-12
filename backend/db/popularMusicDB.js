var pool = require("../services/database").pool;

module.exports.popularMusicList = function(callback){
    pool.getConnection(function(err, connection){

        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT thumbnail, movieUrl, artist, songTitle, count FROM tbl_ranking_log ORDER BY count DESC LIMIT 2"
        connection.query(query,[],
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