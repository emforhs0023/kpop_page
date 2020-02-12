const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /api/post  => 게시글 작성 라우터
    try{
    	const hashtags = req.body.content.match(/#[^\s]+/g);
		const newPost = await db.Post.create({
			content: req.body.content, // ex) 병진아 힘내 #힘내 #파이팅! 눌러주세요 
			UserId: req.user.id,
		})
		if (hashtags) {
			const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({ // findOrCreate 없으면 만들고 있으면 찾고 , 각각 다 저장 하려면 Promise.all을 사용 
				where: { name: tag.slice(1).toLowerCase() }, // slice(1)은 앞에 #을 떄는 거고 toLowerCase()는 영어 해쉬 태그는 소문자로 통일
			})));
			console.log(result);
			await newPost.addHashtags(result.map(r => r[0]));
		}
		// const User = await newPost.getUser();
		// newPost.User = User
		// res.json(newPost)
		const fullPost = await db.Post.findOne({ 
			where: {id: newPost.id},
			include: [{
				model: db.User
			}],
		})
		res.json(fullPost)
    } catch(e){
    	console.error(e)
    	next(e)
    }
});

router.post('/images', (req, res) => {

});

module.exports = router;