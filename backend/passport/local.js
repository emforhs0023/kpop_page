//로그인 전략 
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require("../db/loginDB");

module.exports = () => {
	passport.use(new LocalStrategy({
		usernameField: 'userId',
		passwordField: 'password',
	}, async (userId, password, done) => {
		try {

			if(userId == undefined || userId == "" || password == undefined || password == ""){
				return done(null, false, { reason: '존재하지 않는 사용자입니다!' });
			}
			await db.signinAdmin(userId, password, (result) => { 
				const data = result[0]
				if (!data) {
					return done(null, false, { reason: '존재하지 않는 사용자입니다!' }); // 첫번째 부분은 서버쪽 에러, 두번째는 성공 했을때, 세번째는 로직 에러 
				}
				const seq = result[0].seq
				const id = result[0].user_id
				const auth = result[0].auth
				const approve_state = result[0].approve_state
				const role = result[0].role
				const bcryptPassword = bcrypt.compare(password, result[0].password);

				let user = { "seq": seq, "id": id, "auth": auth, "approve_state": approve_state, "role": role}
				if (bcryptPassword) {
					return done(null, user);
				}

				return done(null, false, { reason: '비밀번호가 틀립니다.' });
			})
			
		} catch (e) {
			console.error(e);
			return done(e);
		}
	}));
};