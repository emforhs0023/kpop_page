const passport = require('passport');
const db = require("../db/loginDB");
const local = require('./local');

module.exports = () => {
    passport.serializeUser((user, done) => { // 서버쪽에 [{ id: 3, cookie: 'asdfgh' }]
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            await db.loginInfo(id, (result) => { 
                const user = result[0]
                return done(null, user);
                
            })
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });
    local();
};