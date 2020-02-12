var pool = require("../services/database").pool;

module.exports.freeBoardInfo = function(seq, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_documents WHERE seq = ?";
        //다음 글 
        var query1 = "SELECT * FROM tbl_documents WHERE seq > ? and pageNumber = 2 ORDER BY regdate ASC LIMIT 1";
        //이전 글 
        var query2 = "SELECT * FROM tbl_documents WHERE seq < ? and pageNumber = 2 ORDER BY regdate DESC LIMIT 1";     

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

module.exports.nextInfo = function(regdate, callback) {
    pool.getConnection(function(err, connection) {

        if(err) {
            console.log(err);
            callback(false);
            return;
        }
        // 다음글
        var query = "SELECT * FROM tbl_documents WHERE regdate > ? and pageNumber = 2 ORDER BY regdate ASC LIMIT 1";
        // 이전글 
        var query1 = "SELECT * FROM tbl_documents WHERE regdate < ? and pageNumber = 2 ORDER BY regdate DESC LIMIT 1";        
         
        connection.query(query + ";" + query1, [regdate, regdate], function(err, result) {
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

module.exports.comments = function(seq, callback) {
    pool.getConnection(function(err, connection) {

        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_comments WHERE parent = 0 AND document_srl = ?";
        var query1 = "SELECT * FROM tbl_comments WHERE parent > 0 AND document_srl = ?";
        
        connection.query(query + ";" + query1, [seq, seq], function(err, result) {
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

module.exports.commentsInfo = function(seq, content, user_id, callback) {
    pool.getConnection(function(err, connection) {

        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "INSERT INTO tbl_comments (document_srl, parent, content, user_id, commentCount) VALUES (?, 0, ?, ?, 1)";

        connection.query(query, [seq, content, user_id], function(err, result) {
            connection.release();

            if(err) {
                console.log(err);
                callback(false);
                return;
            }

            // callback(result);
            callback(true);
        });
    });
}

module.exports.commentsList = function(content, callback) {
    pool.getConnection(function(err, connection) {

        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_comments WHERE content = ?";

        connection.query(query, [content], function(err, result) {
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


module.exports.deleteData = function(seq, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "DELETE FROM tbl_comments WHERE seq = ? OR parent = ?";
        // console.log(query)
        connection.query(query, [seq, seq], function(err, result) {
            connection.release();

            if(err) {
                console.log(err);
                callback(false);
                return;
            }

            // callback(result);
            callback(true);
        });
    });
}

module.exports.deleteData = function(seq, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "DELETE FROM tbl_comments WHERE seq = ? OR parent = ?";
        // console.log(query)
        connection.query(query, [seq, seq], function(err, result) {
            connection.release();

            if(err) {
                console.log(err);
                callback(false);
                return;
            }

            // callback(result);
            callback(true);
        });
    });
}

module.exports.editComment = function(seq, user_id, content, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "UPDATE tbl_comments SET content = ? WHERE seq = ?";
        // console.log(query)
        connection.query(query, [content, seq], function(err, result) {
            connection.release();

            if(err) {
                console.log(err);
                callback(false);
                return;
            }

            // callback(result);
            callback(true);
        });
    });
}

module.exports.editCommentList = function(seq, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_comments WHERE seq = ?";
        // console.log(query)
        connection.query(query, [seq], function(err, result) {
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

module.exports.commentObj = function(document_srl, seq, content, user_id, commentCount, callback) {
    pool.getConnection(function(err, connection) {
        plus = commentCount + 1
        console.log(plus)
        // console.log(document_srl)
        // console.log(seq)
        // console.log(content)
        // console.log(user_id)
        // console.log(commentCount)
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "INSERT INTO tbl_comments(document_srl, parent, content, user_id, commentCount) VALUES (?, ?, ?, ?, ?)";

        connection.query(query, [document_srl, seq, content, user_id, plus], function(err, result) {
            connection.release();

            if(err) {
                console.log(err);
                callback(false);
                return;
            }

            // callback(result);
            callback(true);
        });
    });
}

module.exports.commentObjList = function(content, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_comments WHERE content = ?";
        // console.log(query)
        connection.query(query, [content], function(err, result) {
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

module.exports.subAddComment = function(document_srl, seq, content, user_id, commentCount, callback) {
    pool.getConnection(function(err, connection) {
        plus = commentCount + 1
        console.log(plus)
        // console.log(document_srl)
        // console.log(seq)
        // console.log(content)
        // console.log(user_id)
        // console.log(commentCount)
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "INSERT INTO tbl_subtable(document_srl, parent, content, user_id, commentCount) VALUES (?, ?, ?, ?, ?)";

        connection.query(query, [document_srl, seq, content, user_id, plus], function(err, result) {
            connection.release();

            if(err) {
                console.log(err);
                callback(false);
                return;
            }

            // callback(result);
            callback(true);
        });
    });
}

module.exports.subAddCommentList = function(content, callback) {
    pool.getConnection(function(err, connection) {
        
        if(err) {
            console.log(err);
            callback(false);
            return;
        }

        var query = "SELECT * FROM tbl_subtable WHERE content = ?";
        // console.log(query)
        connection.query(query, [content], function(err, result) {
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
