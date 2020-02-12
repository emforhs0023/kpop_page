import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOAD_DANCE_REQUEST,
    LOAD_DANCE_SUCCESS,
    LOAD_DANCE_FAILURE,
    LOAD_USER_DANCE_REQUEST,
    LOAD_USER_DANCE_SUCCESS,
    LOAD_USER_DANCE_FAILURE,
    LIKE_REQUEST,
    LIKE_SUCCESS,
    LIKE_FAILURE,
    UN_LIKE_REQUEST,
    UN_LIKE_SUCCESS,
    UN_LIKE_FAILURE,
} from '../reducers/dance';

function danceInfoAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get('/dance/danceInfo');
}

function* danceInfo() {
    try {
        // console.log("사가야!")
        const result = yield call(danceInfoAPI);
        
        yield put({ // put은 dispatch 동일
            type: LOAD_DANCE_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_DANCE_FAILURE,
            error: e,
        });
    }
}

function* watchDanceInfo() {
    yield takeEvery(LOAD_DANCE_REQUEST, danceInfo);
}


function userDanceInfoAPI(queryData) {
    // 서버에 요청을 보내는 부분
    return axios.get('/dance/userDanceInfo?user_id='+queryData);
}

function* userDanceInfo(action) {
    try {
        // console.log("사가야!")
        const result = yield call(userDanceInfoAPI, action.data);
        // console.log(result)
        yield put({ // put은 dispatch 동일
            type: LOAD_USER_DANCE_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_USER_DANCE_FAILURE,
            error: e,
        });
    }
}

function* watchUserDanceInfo() {
    yield takeEvery(LOAD_USER_DANCE_REQUEST, userDanceInfo);
}
function likeInfoAPI(queryData) {
    // 서버에 요청을 보내는 부분
    return axios.get('/dance/on?user_id='+ queryData.user_id +'&seq='+ queryData.seq);
}

function* likeInfo(action) {
    try {
        // console.log("사가야!")
        const result = yield call(likeInfoAPI, action.data);
        console.log(result)
        yield put({ // put은 dispatch 동일
            type: LIKE_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LIKE_FAILURE,
            error: e,
        });
    }
}

function* watchLike() {
    yield takeEvery(LIKE_REQUEST, likeInfo);
}

function unLikeInfoAPI(queryData) {
    // 서버에 요청을 보내는 부분
    return axios.get('/dance/off?user_id='+ queryData.user_id +'&seq='+ queryData.seq);
}

function* unLikeInfo(action) {
    try {
        // console.log("사가야!")
        const result = yield call(unLikeInfoAPI, action.data);
        // console.log(result)
        yield put({ // put은 dispatch 동일
            type: UN_LIKE_SUCCESS,
            data: {
                result: result.data, // 글 seq
                seq:action.data.seq,
            }
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: UN_LIKE_FAILURE,
            error: e,
        });
    }
}

function* watchUnLike() {
    yield takeEvery(UN_LIKE_REQUEST, unLikeInfo);
}

export default function* danceSaga() {
    yield all([
        fork(watchDanceInfo),
        fork(watchUserDanceInfo),
        fork(watchLike),
        fork(watchUnLike),
    ]);
}