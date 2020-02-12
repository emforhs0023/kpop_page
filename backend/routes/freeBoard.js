const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require("../db/freeBoardDB");

const router = express.Router();

router.get("/freeBoardInfo", function(req, res) {
	
	let seq = req.query.seq
	
	db.freeBoardInfo(seq, function(result){
         res.send(result);
    });
});


router.get("/noticeInfo", function(req, res) {
    db.noticeInfo(function(result){
        res.send(result);
    });
});

router.get("/freeBoard", function(req, res) {
    
	db.freeBoard(function(result){
        res.send(result);
    });
});

router.get("/nextInfo", function(req, res) {
    
    let regdate = req.query.regdate
    
    db.nextInfo(regdate, function(result){
        res.send(result);
    });
});

router.get("/comments", function(req, res) {
    
    let seq = req.query.seq
    
    db.comments(seq, function(result){
        res.send(result);
    });
});

router.post("/commentsInfo", function(req, res) {
    
    let content = req.body.text
    let seq = req.body.seq
    let user_id = req.body.user_id

    db.commentsInfo(seq, content, user_id, function(result){
        if(result == true){
            db.commentsList(content, function(result){
                res.send(result);
            })
        }
    });
});

router.post("/deleteData", function(req, res) {
    
    
    let seq = req.body.seq
    
    db.deleteData(seq, function(result){
        if(result == true){
            db.commentsList(seq, function(result){
                res.send(result);
            })
        }
    });
});
 

router.post("/editComment", function(req, res) {
    
    const seq = req.body.seq
    const user_id = req.body.user_id
    const content = req.body.content
    
    db.editComment(seq, user_id, content, function(result){
        if(result == true){
            db.editCommentList(seq, function(result){
                res.send(result);
            })
        }
    });
});

router.post("/commentObj", function(req, res) {
    
    let document_srl = req.body.document_srl
    let seq = req.body.seq
    let content = req.body.content
    let user_id = req.body.user_id
    let commentCount = req.body.commentCount

    db.commentObj(document_srl, seq, content, user_id, commentCount, function(result){
        if(result == true){
            db.commentObjList(content, function(result){
                res.send(result);
            })
        }
    });
});

// router.post("/subAddComment", function(req, res) {
    
//     let document_srl = req.body.document_srl
//     let seq = req.body.seq
//     let content = req.body.content
//     let user_id = req.body.user_id
//     let commentCount = req.body.commentCount
    
//     db.subAddComment(document_srl, seq, content, user_id, commentCount, function(result){
//         if(result == true){
//             db.subAddCommentList(content, function(result){
//                 res.send(result);
//             })
//         }
//     });
// });


module.exports = router;