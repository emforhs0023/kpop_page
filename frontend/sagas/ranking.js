import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOAD_MAIN_RANKING_REQUEST,
	LOAD_MAIN_RANKING_SUCCESS,
	LOAD_MAIN_RANKING_FAILURE,
} from '../reducers/ranking';

function loadRankingAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get('/ranking/rankingInfo');
}

function* loadRanking() {
    try {
        const result = yield call(loadRankingAPI);
        
        yield put({ // put은 dispatch 동일
            type: LOAD_MAIN_RANKING_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_MAIN_RANKING_FAILURE,
            error: e,
        });
    }
}

function* watchLoadRanking() {
    yield takeEvery(LOAD_MAIN_RANKING_REQUEST, loadRanking);
}

export default function* userSaga() {
    yield all([
        fork(watchLoadRanking),
    ]);
}