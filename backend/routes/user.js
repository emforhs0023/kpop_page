const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require("../db/loginDB");

const router = express.Router();

router.get('/', (req, res) => { // /api/user/
    if (!req.user) {
        return res.status(401).send('로그인이 필요합니다.');
    }
    let id = req.user.user_id
    let auth = req.user.auth
    let approve_state = req.user.approve_state
    let role = req.user.role
    
    let user = { "id": id, "auth": auth, "approve_state": approve_state, "role": role}

    return res.json(user);
});
// 404 -> 페이지에러  못함  403->  금지 400 -> 요청 이상 401->  권한
router.post('/', async (req, res, next) => { // POST /api/user 회원가입
   
});

router.get('/:id', (req, res) => { // 남의 정보 가져오는 것 ex) /api/user/123

});

router.post('/logout', (req, res) => { // /api/user/logout
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
    passport.authenticate('local', (err, user, info) => { // LocalStrategy를 사용 해서 local을 사용 , 카카오를 사용 하면 kakao, navar를 사용 하면 naver
        if (err) { 
            console.error(err);
            return next(err);
        }
        if (info) { // 로직상의 에러가 있는 경우
            return res.status(401).send(info.reason);
        } 
        return req.login(user, async (loginErr) => { 
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.json(user); 

            } catch (e) {
                next(e);
            }
        })
    })(req, res, next);
});

router.get('/:id/follow', (req, res) => { // /api/user/:id/follow

});
router.post('/:id/follow', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

module.exports = router;