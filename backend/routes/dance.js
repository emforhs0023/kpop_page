const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require("../db/danceDB");

const router = express.Router();

router.get('/danceInfo', async (req, res, next) => {
	try {
		await db.danceInfo((result) => { 
			return res.json(result);
		})
	} catch (e) {
		next(e);
	}
})

router.get('/userDanceInfo', async (req, res, next) => {
	try {

		const user_id = req.query.user_id
		// console.log(user_id)
	    await db.userDanceInfo(user_id, (result) => { 
	    	return res.json(result);
		})
	} catch (e) {
		next(e);
	}
})

router.get("/on", function(req, res) {

    let user_id = req.query.user_id
    let seq = req.query.seq
	
	db.on(user_id, seq, function(result){
        res.send(result);
    });
});

router.get("/off", function(req, res) {

    let user_id = req.query.user_id
    let seq = req.query.seq
    
    db.off(user_id, seq, function(result){
        res.send(result);
    });
});

module.exports = router;