var pool = require("../services/database").pool;

module.exports.rankingInfo = function(callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT user_id, count FROM tbl_documents ORDER BY count DESC LIMIT 5";

        connection.query(query, [], function(err, result) {
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
