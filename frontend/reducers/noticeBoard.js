import produce from 'immer';

export const initialState = {
    noticeInfo: [],
    pageNoticeInfo: [],
    next: [],
    prev: [],
    noticeInfoError:"",
    isLoading:""
};

export const LOAD_MAIN_NOTICES_REQUEST = "LOAD_MAIN_NOTICES_REQUEST"
export const LOAD_MAIN_NOTICES_SUCCESS = "LOAD_MAIN_NOTICES_SUCCESS"
export const LOAD_MAIN_NOTICES_FAILURE = "LOAD_MAIN_NOTICES_FAILURE"

export const LOAD_NOTICE_BOARD_REQUEST = "LOAD_NOTICE_BOARD_REQUEST"
export const LOAD_NOTICE_BOARD_SUCCESS = "LOAD_NOTICE_BOARD_SUCCESS"
export const LOAD_NOTICE_BOARD_FAILURE = "LOAD_NOTICE_BOARD_FAILURE"

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_MAIN_NOTICES_REQUEST: {
                break;
            }
            case LOAD_MAIN_NOTICES_SUCCESS: {
                draft.noticeInfo = action.data;
                break;
            }
            case LOAD_MAIN_NOTICES_FAILURE: {
                draft.noticeInfoError = action.error;
                break;
            }
            case LOAD_NOTICE_BOARD_REQUEST: {
                break;
            }
            case LOAD_NOTICE_BOARD_SUCCESS: {
                
                draft.pageNoticeInfo = action.data[0];
                draft.next = action.data[1];
                draft.prev = action.data[2];
                break;
                break;
            }
            default: {
                break;
            }
        }
    })
}

export default reducer