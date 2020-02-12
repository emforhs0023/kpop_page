import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOAD_MAIN_NEWMUSIC_REQUEST,
	LOAD_MAIN_NEWMUSIC_SUCCESS,
	LOAD_MAIN_NEWMUSIC_FAILURE,
    NEXT_PAGING_REQUEST,
    NEXT_PAGING_SUCCESS,
    NEXT_PAGING_FAILURE,
    PREV_PAGING_REQUEST,
    PREV_PAGING_SUCCESS,
    PREV_PAGING_FAILURE,

} from '../reducers/newMusic';

function loadNewMusicAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get('/newMusic/listInfo');
}

function* loadNewMusic() {
    try {
        const result = yield call(loadNewMusicAPI);
        
        yield put({ // put은 dispatch 동일
            type: LOAD_MAIN_NEWMUSIC_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_MAIN_NEWMUSIC_FAILURE,
            error: e,
        });
    }
}

function* watchLoadNewMusic() {
    yield takeEvery(LOAD_MAIN_NEWMUSIC_REQUEST, loadNewMusic);
}

function nextPageAPI(pageData) {
    // console.log(pageData)
    // 서버에 요청을 보내는 부분
    return axios.get('/newMusic/nextPaging?pageData=' + pageData);
}

function* nextPage(action) {
    try {
        const result = yield call(nextPageAPI, action.data);
        
        yield put({ // put은 dispatch 동일
            type: NEXT_PAGING_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: NEXT_PAGING_FAILURE,
            error: e,
        });
    }
}

function* watchNextPage() {
    yield takeEvery(NEXT_PAGING_REQUEST, nextPage);
}

function prevPageAPI(pageData) {
    // console.log(pageData)
    // 서버에 요청을 보내는 부분
    return axios.get('/newMusic/nextPaging?pageData=' + pageData);
}

function* prevPage(action) {
    try {
        const result = yield call(prevPageAPI, action.data);
        
        yield put({ // put은 dispatch 동일
            type: PREV_PAGING_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: PREV_PAGING_FAILURE,
            error: e,
        });
    }
}

function* watchPrevPage() {
    yield takeEvery(PREV_PAGING_REQUEST, prevPage);
}






export default function* userSaga() {
    yield all([
        fork(watchLoadNewMusic),
        fork(watchNextPage),
        fork(watchPrevPage),
    ]);
}