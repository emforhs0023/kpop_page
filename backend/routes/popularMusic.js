const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require("../db/popularMusicDB");

const router = express.Router();

router.get('/popularMusicList', async (req, res, next) => {
	try {
		
		await db.popularMusicList((result) => { 
			return res.json(result);
		})
	} catch (e) {
		next(e);
	}
})

module.exports = router;