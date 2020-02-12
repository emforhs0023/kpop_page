import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOAD_FREE_BOARD_LIST_REQUEST,
    LOAD_FREE_BOARD_LIST_SUCCESS,
    LOAD_FREE_BOARD_LIST_FAILURE,
    LOAD_FREE_BOARD_REQUEST,
    LOAD_FREE_BOARD_SUCCESS,
    LOAD_FREE_BOARD_FAILURE,
    PAGING_REQUEST,
    PAGING_SUCCESS,
    PAGING_FAILURE,
    LOAD_FREE_BOARD_COMMENTS_REQUEST,
    LOAD_FREE_BOARD_COMMENTS_SUCCESS,
    LOAD_FREE_BOARD_COMMENTS_FAILURE,
    SAVE_COMMENT_REQUEST,
    SAVE_COMMENT_SUCCESS,
    SAVE_COMMENT_FAILURE,
    COMMENT_DELETE_DATA_REQUEST,
    COMMENT_DELETE_DATA_SUCCESS,
    COMMENT_DELETE_DATA_FAILURE,
    EDIT_COMMENT_REQUEST,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,
    ADD_COMMENTS_DATA_REQUEST,
    ADD_COMMENTS_DATA_SUCCESS,
    ADD_COMMENTS_DATA_FAILURE,
    SUB_COMMENT_DELETE_DATA_REQUEST,
    SUB_COMMENT_DELETE_DATA_SUCCESS,
    SUB_COMMENT_DELETE_DATA_FAILURE,
    SUB_EDIT_COMMENT_REQUEST,
    SUB_EDIT_COMMENT_SUCCESS,
    SUB_EDIT_COMMENT_FAILURE,
} from '../reducers/freeBoard';

function loadFreeBoardAPI(queryData) {
    // 서버에 요청을 보내는 부분
    
    return axios.get('/youtubeNotice/freeBoardInfo?seq='+queryData, {
        withCredentials: true,
    });
}

function* loadFreeBoard(action) {
    try {
        const result = yield call(loadFreeBoardAPI, action.data);
        
        yield put({ // put은 dispatch 동일
            type: LOAD_FREE_BOARD_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_FREE_BOARD_FAILURE,
            error: e,
        });
    }
}

function* watchLoadFreeBoard() {
    yield takeEvery(LOAD_FREE_BOARD_REQUEST, loadFreeBoard);
}

function loadListFreeBoardAPI() {
    // 서버에 요청을 보내는 부분
    return axios.get('/notice/freeBoard');
}

function* loadListFreeBoard() {
    try {
        const result = yield call(loadListFreeBoardAPI);
       
        yield put({ // put은 dispatch 동일
            type: LOAD_FREE_BOARD_LIST_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_FREE_BOARD_LIST_FAILURE,
            error: e,
        });
    }
}

function* watchLoadListFreeBoard() {
    yield takeEvery(LOAD_FREE_BOARD_LIST_REQUEST, loadListFreeBoard);
}

// function pagingAPI(value) {
//     // 서버에 요청을 보내는 부분
//     return axios.get("/youtubeNotice/nextInfo?regdate=" + value);
// }

// function* paging(action) {
//     try {
//         const result = yield call(pagingAPI, action.data);
       
//         yield put({ // put은 dispatch 동일
//             type: PAGING_SUCCESS,
//             data: result.data,
//         });
//     } catch (e) { // loginAPI 실패
//         console.error(e);
//         yield put({
//             type: PAGING_FAILURE,
//             error: e,
//         });
//     }
// }

// function* watchPaging() {
//     yield takeEvery(PAGING_REQUEST, paging);
// }

function commentsDataInfoAPI(value) {
    // 서버에 요청을 보내는 부분
    return axios.get("/youtubeNotice/comments?seq=" + value);
}

function* commentsDataInfo(action) {
    try {

        const result = yield call(commentsDataInfoAPI, action.data);
        
        yield put({ // put은 dispatch 동일
            type: LOAD_FREE_BOARD_COMMENTS_SUCCESS,
            data: result.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_FREE_BOARD_COMMENTS_FAILURE,
            error: e,
        });
    }
}

function* watchComments() {
    yield takeEvery(LOAD_FREE_BOARD_COMMENTS_REQUEST, commentsDataInfo);
}

function saveCommentAPI(value) {
    return axios.post("/youtubeNotice/commentsInfo", value, {});
}

function* saveComment(action) {
    try {
        const result = yield call(saveCommentAPI, action.data);
        // console.log(result.data) 
        yield put({ 
            type: SAVE_COMMENT_SUCCESS,
            data: result.data,
        });
        
    } catch (e) { 
        console.error(e);
        yield put({
            type: SAVE_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchSaveComments() {
    yield takeEvery(SAVE_COMMENT_REQUEST, saveComment);
}

function removeCommentAPI(value) {
    return axios.post("/youtubeNotice/deleteData", value, {});
}

function* removeComment(action) {
    try {
        const result = yield call(removeCommentAPI, action.data);
        
        yield put({ 
            type: COMMENT_DELETE_DATA_SUCCESS,
            data: { 
                result: result.data,
                seq: action.data.seq
            }
        });
    } catch (e) { 
        console.error(e);
        yield put({
            type: COMMENT_DELETE_DATA_FAILURE,
            error: e,
        });
    }
}

function* watchRemoveComment() {
    yield takeEvery(COMMENT_DELETE_DATA_REQUEST, removeComment);
}

function editCommentAPI(value) {
    return axios.post("/youtubeNotice/editComment", value, {});
}

function* editComment(action) {
    try {
        const result = yield call(editCommentAPI, action.data);
        
        yield put({ 
            type:EDIT_COMMENT_SUCCESS,
            data: { 
                result: result.data,
                seq: action.data.seq
            }
        });
    } catch (e) { 
        console.error(e);
        yield put({
            type: EDIT_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchEditComment() {
    yield takeEvery(EDIT_COMMENT_REQUEST, editComment);
}

function addCommentsAPI(value) {
    return axios.post("/youtubeNotice/commentObj", value, {});
}

function* addComments(action) {
    try {
        const result = yield call(addCommentsAPI, action.data);

        yield put({ 
            type:ADD_COMMENTS_DATA_SUCCESS,
            data: result.data,
        });
    } catch (e) { 
        console.error(e);
        yield put({
            type: ADD_COMMENTS_DATA_FAILURE,
            error: e,
        });
    }
}

function* watchAddComments() {
    yield takeEvery(ADD_COMMENTS_DATA_REQUEST, addComments);
}



function subRemoveCommentAPI(value) {
    return axios.post("/youtubeNotice/deleteData", value, {});
}

function* subRemoveComment(action) {
    try {
        const result = yield call(subRemoveCommentAPI, action.data);
        
        yield put({ 
            type: SUB_COMMENT_DELETE_DATA_SUCCESS,
            data: { 
                result: result.data,
                seq: action.data.seq
            }
        });
    } catch (e) { 
        console.error(e);
        yield put({
            type: SUB_COMMENT_DELETE_DATA_FAILURE,
            error: e,
        });
    }
}

function* watchSubRemoveComment() {
    yield takeEvery(SUB_COMMENT_DELETE_DATA_REQUEST, subRemoveComment);
}

// function subEditCommentAPI(value) {
//     return axios.post("/youtubeNotice/subAddComment", value, {});
// }

function subEditCommentAPI(value) {
    return axios.post("/youtubeNotice/editComment", value, {});
}

function* subEditComment(action) {
    try {
        const result = yield call(subEditCommentAPI, action.data);
        
        yield put({ 
            type:SUB_EDIT_COMMENT_SUCCESS,
            data: { 
                result: result.data,
                seq: action.data.seq
            }
        });
    } catch (e) { 
        console.error(e);
        yield put({
            type: SUB_EDIT_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchSubEditComment() {
    yield takeEvery(SUB_EDIT_COMMENT_REQUEST, subEditComment);
}


export default function* freeBoardSaga() {
    yield all([
        fork(watchLoadListFreeBoard),
        fork(watchLoadFreeBoard),
        // fork(watchPaging),
        fork(watchComments),
        fork(watchSaveComments), // 글쓰기
        fork(watchRemoveComment),
        fork(watchEditComment),
        fork(watchAddComments), // 댓글
        fork(watchSubRemoveComment),
        fork(watchSubEditComment),
    ]);
}