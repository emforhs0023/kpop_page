import produce from 'immer';

export const initialState = {
    loding: false,
    newMusicData: [],
    newMusicDataError:"",
    isLoading:"",
    clickBool:false,
    musicPageData: [],
    widthInfo:"",
    listNum:0,
    maxNumberInfo:0,
    newMusicDataCount: 0
};

export const LOAD_MAIN_NEWMUSIC_REQUEST = "LOAD_MAIN_NEWMUSIC_REQUEST"
export const LOAD_MAIN_NEWMUSIC_SUCCESS = "LOAD_MAIN_NEWMUSIC_SUCCESS"
export const LOAD_MAIN_NEWMUSIC_FAILURE = "LOAD_MAIN_NEWMUSIC_FAILURE"
export const MUSCI_PAGE_DATA = "MUSCI_PAGE_DATA"
export const WIDTH_DATA_INFO = "WIDTH_DATA_INFO"
export const NEXT_PAGING_REQUEST = "NEXT_PAGING_REQUEST"
export const NEXT_PAGING_SUCCESS = "NEXT_PAGING_SUCCESS"
export const NEXT_PAGING_FAILURE = "NEXT_PAGING_FAILURE"
export const PREV_PAGING_REQUEST = "PREV_PAGING_REQUEST"
export const PREV_PAGING_SUCCESS = "PREV_PAGING_SUCCESS"
export const PREV_PAGING_FAILURE = "PREV_PAGING_FAILURE"



const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_MAIN_NEWMUSIC_REQUEST: {
                draft.loding = true;
                break;
            }
            case LOAD_MAIN_NEWMUSIC_SUCCESS: {
                draft.loding = false;
                draft.newMusicData = action.data[0];
                draft.newMusicDataCount = action.data[1];
                break;
            }
            case MUSCI_PAGE_DATA: {
                
                draft.musicPageData = action.data;
                break;
            }
            case WIDTH_DATA_INFO: {
                
                draft.widthInfo = action.data;
                break;
            }
            case NEXT_PAGING_REQUEST: {
                draft.newMusicData =  [];
                break;
            }
            case NEXT_PAGING_SUCCESS: {
                draft.newMusicData = action.data;
                break;
            }
            case NEXT_PAGING_FAILURE: {
                break;
            }
            case PREV_PAGING_REQUEST: {
                draft.newMusicData = [];
                break;
            }
            case PREV_PAGING_SUCCESS: {
                draft.newMusicData = action.data;
                break;
            }
            case PREV_PAGING_FAILURE: {
                break;
            }
            default: {
                break;
            }
        }
    })
}

export default reducer