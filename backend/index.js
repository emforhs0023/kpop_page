const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');

const danceAPIRouter = require('./routes/dance');
const userAPIRouter = require('./routes/user');
const noticeAPIRouter = require('./routes/notice');
const rankingAPIRouter = require('./routes/ranking');
const newMusicAPIRouter = require('./routes/newMusic');
const popularMusicAPIRouter = require('./routes/popularMusic');
const youtubeNoticeAPIRouter = require('./routes/freeBoard');


dotenv.config();
const app = express();
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false, // https를 쓸 때 true
    },
    name: 'rnbck',
}));
app.use(passport.initialize());
app.use(passport.session());

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/dance', danceAPIRouter);
app.use('/api/user', userAPIRouter);
app.use('/api/notice', noticeAPIRouter);
app.use('/api/ranking', rankingAPIRouter);
app.use('/api/newMusic', newMusicAPIRouter);
app.use('/api/popularMusic', popularMusicAPIRouter);
app.use('/api/youtubeNotice', youtubeNoticeAPIRouter);



app.listen(3065, () => {
    console.log('server is running on http://localhost:3065');
});