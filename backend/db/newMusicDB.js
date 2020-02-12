var pool = require("../services/database").pool;

module.exports.listInfo = function(callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_test ORDER BY date DESC LIMIT 7";
        const query1 = "SELECT count(*) AS count FROM tbl_test"
        connection.query(query + ";" + query1, [], function(err, result) {
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

module.exports.nextPaging = function(pageData, callback) {
    
    let number =  Number(pageData)
    
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_test ORDER BY date DESC LIMIT ?, 7";

        connection.query(query, [number], function(err, result) {
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