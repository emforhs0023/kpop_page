import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
} from '../reducers/user';

function logInAPI(loginData) {
  // 서버에 요청을 보내는 부분
    return axios.post('/user/login', loginData, {
        withCredentials: true,
    });
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}

function* watchLogIn() {
    yield takeEvery(LOG_IN_REQUEST, logIn);
}

function logOutAPI() {
  // 서버에 요청을 보내는 부분
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });
}

function* logOut() {
    try {
        // yield call(logOutAPI);
        yield call(logOutAPI);
        yield put({ // put은 dispatch 동일
            type: LOG_OUT_SUCCESS,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e,
        });
    }
}

function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function loadUserAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get('/user/', {
        withCredentials: true, // 서로 쿠키를 주고 받을 수 있다.
    });
}

function* loadUser() {
    try {
        const result = yield call(loadUserAPI);
        // console.log(result)
        yield put({ // put은 dispatch 동일
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}

function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLoadUser),
        fork(watchLogOut),
    ]);
}