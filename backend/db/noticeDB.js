var pool = require("../services/database").pool;

module.exports.noticeInfo = function(callback) {
    pool.getConnection(function(err, connection) {

        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_documents WHERE pageNumber = 1 ORDER BY regdate DESC LIMIT 5";

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

module.exports.freeBoard = function(callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_documents WHERE pageNumber = '2' ORDER BY regdate DESC";

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

module.exports.pageNoticeInfo = function(seq, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_documents WHERE seq = ?";
        //다음 글 
        var query1 = "SELECT * FROM tbl_documents WHERE seq > ? and pageNumber = 1 ORDER BY regdate ASC LIMIT 1";
        //이전 글 
        var query2 = "SELECT * FROM tbl_documents WHERE seq < ? and pageNumber = 1 ORDER BY regdate DESC LIMIT 1";     

        connection.query(query + ";" + query1 + ";" + query2, [seq, seq, seq], function(err, result) {
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