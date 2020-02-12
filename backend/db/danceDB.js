var pool = require("../services/database").pool;

module.exports.danceInfo = function(callback){
    pool.getConnection(function(err, connection){

        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_list";
        var query1 = "SELECT count(*) as count FROM tbl_list"
        
        connection.query(query + ";"+ query1,[],
            function(err, result){
                connection.release()
                
                if(err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                callback(result);
            })
    })
}

module.exports.userDanceInfo = function(user_id, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = " SELECT * FROM tbl_list";
        var query1 = "SELECT count(*) as count FROM tbl_list"
        // const query2 = "SELECT `LIST`.*, "
        //                 +"`USER`.user_id AS `userUser_id`, `USER`.auth AS `userAuth`, "
        //                 +"`LOG`.seq AS `logSeq`, `LOG`.user_id AS `logUser_id`, `LOG`.document_srl AS `logDocument_srl` "
        //                 +"FROM tbl_list AS `LIST` LEFT OUTER JOIN tbl_user AS `USER` ON `LIST`.user_Id = `USER`.user_id "
        //                 +"LEFT OUTER JOIN (tbl_voted_log AS `LOG` INNER JOIN tbl_list AS `test` ON `LOG`.document_srl = `test`.seq) ON `LIST`.seq = `LOG`.document_srl "
        // var query2 = "SELECT `LIST`.*, GROUP_CONCAT(`LOG`.user_id) AS `Like` FROM tbl_list AS `LIST` LEFT OUTER JOIN tbl_user AS `USER` ON `LIST`.user_Id = `USER`.user_id "
        //              + "LEFT OUTER JOIN (tbl_voted_log AS `LOG` INNER JOIN tbl_list AS `test` ON `LOG`.document_srl = `test`.seq) ON `LIST`.seq = `LOG`.document_srl GROUP BY `LIST`.seq "
        var query2 = "SELECT * FROM tbl_list t1 JOIN tbl_voted_log t2 ON t1.seq = t2.document_srl WHERE t2.user_id = ?"                     
        
        connection.query(query + ";"+ query1 + ";" + query2, [user_id], function(err, result) {
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

module.exports.on = function(user_id, seq, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }
// UPDATE tbl_voted_log SET user_id = ?, document_srl = ? WHERE seq = ?
        var query = "UPDATE tbl_list SET active = 1, count = count + 1 WHERE seq = ?";
        var query1 = "INSERT INTO tbl_voted_log (user_id, document_srl) VALUES (?, ?)"
        var query2 = "SELECT * FROM tbl_list"
        var query3 = "select * from tbl_voted_log WHERE user_id = ? and document_srl = ?"

        connection.query(query +";"+ query1+";"+ query2+";"+ query3, [seq, user_id, seq, user_id, seq], function(err, result) {
            connection.release();

            if(err) {
                console.log(err);
                callback(false);
                return;
            }

            callback(result);
            // callback(true);
        });
    });
}

module.exports.off = function(user_id, seq, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "UPDATE tbl_list SET active = 0, count = count - 1 WHERE seq = ?";
        var query1 = "DELETE FROM tbl_voted_log WHERE user_id = ? AND document_srl = ?"
        var query2 = "SELECT * FROM tbl_list"
        
        connection.query(query +";"+ query1+";"+ query2, [seq, user_id, seq], function(err, result) {
            connection.release();

            if(err) {
                console.log(err);
                callback(false);
                return;
            }

            callback(result);
            // callback(true);
        });
    });
}


