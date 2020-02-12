import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOAD_MAIN_NOTICES_REQUEST,
	LOAD_MAIN_NOTICES_SUCCESS,
	LOAD_MAIN_NOTICES_FAILURE,
    LOAD_NOTICE_BOARD_REQUEST,
    LOAD_NOTICE_BOARD_SUCCESS,
    LOAD_NOTICE_BOARD_FAILURE,
} from '../reducers/noticeBoard';

function loadNoticesAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get('/notice/noticeInfo');
}

function* loadNotices() {
    try {
        
        const result = yield call(loadNoticesAPI);
        
        yield put({ // put은 dispatch 동일
            type: LOAD_MAIN_NOTICES_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_MAIN_NOTICES_FAILURE,
            error: e,
        });
    }
}

function* watchLoadNotices() {
    yield takeEvery(LOAD_MAIN_NOTICES_REQUEST, loadNotices);
}

function pageLoadNoticesAPI(queryData) {
    // 서버에 요청을 보내는 부분
    
    return axios.get('/notice/pageNoticeInfo?seq='+queryData, {
        withCredentials: true,
    });
}

function* pageLoadNotices(action) {
    try {
        
        const result = yield call(pageLoadNoticesAPI, action.data);
        
        yield put({ // put은 dispatch 동일
            type: LOAD_NOTICE_BOARD_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_NOTICE_BOARD_FAILURE,
            error: e,
        });
    }
}

function* watchPageLoadNotices() {
    yield takeEvery(LOAD_NOTICE_BOARD_REQUEST, pageLoadNotices);
}


export default function* userSaga() {
    yield all([
        fork(watchLoadNotices),
        fork(watchPageLoadNotices),

    ]);
}