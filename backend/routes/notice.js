const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require("../db/noticeDB");

const router = express.Router();

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

router.get("/pageNoticeInfo", function(req, res) {
	
	let seq = req.query.seq
	
	db.pageNoticeInfo(seq, function(result){
         res.send(result);
    });
});

module.exports = router;