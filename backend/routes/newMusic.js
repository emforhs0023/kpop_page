const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require("../db/newMusicDB");

const router = express.Router();

router.get('/listInfo', async (req, res, next) => {
	try {
		await db.listInfo((result) => { 
			return res.json(result);
		})
	} catch (e) {
		next(e);
	}
})

router.get('/nextPaging', async (req, res, next) => {
	try {
		let pageData = req.query.pageData
	
		await db.nextPaging(pageData, (result) => { 
			return res.json(result);
		})
	} catch (e) {
		next(e);
	}
})

module.exports = router;