import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOAD_MAIN_POPULAR_MUSIC_REQUEST,
	LOAD_MAIN_POPULAR_MUSIC_SUCCESS,
	LOAD_MAIN_POPULAR_MUSIC_FAILURE,
} from '../reducers/popularMusic';

function loadPopularAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get('/popularMusic/popularMusicList');
}

function* loadPopularMusic() {
    try {
        const result = yield call(loadPopularAPI);
        
        yield put({ // put은 dispatch 동일
            type: LOAD_MAIN_POPULAR_MUSIC_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_MAIN_POPULAR_MUSIC_FAILURE,
            error: e,
        });
    }
}

function* watchPopularMusic() {
    yield takeEvery(LOAD_MAIN_POPULAR_MUSIC_REQUEST, loadPopularMusic);
}

export default function* userSaga() {
    yield all([
        fork(watchPopularMusic),
    ]);
}