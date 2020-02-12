const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require("../db/rankingDB");

const router = express.Router();

router.get('/rankingInfo', async (req, res, next) => {
	try {
		await db.rankingInfo((result) => { 
			return res.json(result);
		})
	} catch (e) {
		next(e);
	}
})

module.exports = router;