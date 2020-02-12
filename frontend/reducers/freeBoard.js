import produce from 'immer';

export const initialState = {
    listCategories:[],
    user_id: "",
    youtubeUrl:"",
    lastdate:"",
    freeBoardInfo:[],
    pagingData:[],
    next:"",
    prev:"",
    commentArray:[],
    arrayCommentsData:[],
    subArrayCommentsData:[],
    insertComments: false,
    loading: false,
    addCommentBool: false,
    commentArrayBool: false,
    subCommentArrayBool: false,
    commentBoolData: false,
};

export const LOAD_FREE_BOARD_LIST_REQUEST = "LOAD_FREE_BOARD_LIST_REQUEST"
export const LOAD_FREE_BOARD_LIST_SUCCESS = "LOAD_FREE_BOARD_LIST_SUCCESS"
export const LOAD_FREE_BOARD_LIST_FAILURE = "LOAD_FREE_BOARD_LIST_FAILURE"

export const LOAD_FREE_BOARD_REQUEST = "LOAD_FREE_BOARD_REQUEST"
export const LOAD_FREE_BOARD_SUCCESS = "LOAD_FREE_BOARD_SUCCESS"
export const LOAD_FREE_BOARD_FAILURE = "LOAD_FREE_BOARD_FAILURE"

export const PAGING_REQUEST = "PAGING_REQUEST"
export const PAGING_SUCCESS = "PAGING_SUCCESS"
export const PAGING_FAILURE = "PAGING_FAILURE"

export const LOAD_FREE_BOARD_COMMENTS_REQUEST = "LOAD_FREE_BOARD_COMMENTS_REQUEST"
export const LOAD_FREE_BOARD_COMMENTS_SUCCESS = "LOAD_FREE_BOARD_COMMENTS_SUCCESS"
export const LOAD_FREE_BOARD_COMMENTS_FAILURE = "LOAD_FREE_BOARD_COMMENTS_FAILURE"

export const SAVE_COMMENT_REQUEST = "SAVE_COMMENT_REQUEST"
export const SAVE_COMMENT_SUCCESS = "SAVE_COMMENT_SUCCESS"
export const SAVE_COMMENT_FAILURE = "SAVE_COMMENT_FAILURE"

export const COMMENT_DELETE_DATA_REQUEST = "COMMENT_DELETE_DATA_REQUEST"
export const COMMENT_DELETE_DATA_SUCCESS = "COMMENT_DELETE_DATA_SUCCESS"
export const COMMENT_DELETE_DATA_FAILURE = "COMMENT_DELETE_DATA_FAILURE"

export const EDIT_COMMENT_REQUEST = "EDIT_COMMENT_REQUEST"
export const EDIT_COMMENT_SUCCESS = "EDIT_COMMENT_SUCCESS"
export const EDIT_COMMENT_FAILURE = "EDIT_COMMENT_FAILURE"

export const ADD_COMMENTS_DATA_REQUEST = "ADD_COMMENTS_DATA_REQUEST"
export const ADD_COMMENTS_DATA_SUCCESS = "ADD_COMMENTS_DATA_SUCCESS"
export const ADD_COMMENTS_DATA_FAILURE = "ADD_COMMENTS_DATA_FAILURE"

export const SUB_COMMENT_DELETE_DATA_REQUEST = "SUB_COMMENT_DELETE_DATA_REQUEST"
export const SUB_COMMENT_DELETE_DATA_SUCCESS = "SUB_COMMENT_DELETE_DATA_SUCCESS"
export const SUB_COMMENT_DELETE_DATA_FAILURE = "SUB_COMMENT_DELETE_DATA_FAILURE"

export const SUB_EDIT_COMMENT_REQUEST = "SUB_EDIT_COMMENT_REQUEST"
export const SUB_EDIT_COMMENT_SUCCESS = "SUB_EDIT_COMMENT_SUCCESS"
export const SUB_EDIT_COMMENT_FAILURE = "SUB_EDIT_COMMENT_FAILURE"

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_FREE_BOARD_LIST_REQUEST: {
                break;
            }
            case LOAD_FREE_BOARD_LIST_SUCCESS: {
                draft.listCategories = action.data;
                break;
            }
            case LOAD_FREE_BOARD_LIST_FAILURE: {
                break;
            }
            case LOAD_FREE_BOARD_REQUEST: {
                break;
            }
            case LOAD_FREE_BOARD_SUCCESS: {
                draft.freeBoardInfo = action.data[0];
                draft.next = action.data[1];
                draft.prev = action.data[2];
                break;
            }
            case LOAD_FREE_BOARD_FAILURE: {
                break;
            }

            // case PAGING_REQUEST: {
            //     break;
            // }
            // case PAGING_SUCCESS: {
            //     const nextData = action.data[0]
            //     const previousData = action.data[1]
            //     if(nextData == "") {
            //         state.nextTitle = ""
            //         let previousSeq = previousData[0].seq
            //         let previousTitle = previousData[0].title
            //         let previousDay = previousData[0].regdate
            //         state.previousTitle = previousTitle
            //         state.previousSeq = previousSeq
            //         state.previousRegdate = previousDay
            //         return {
            //             ...state,
            //             nextTitle: "",
            //             previousTitle: previousTitle,
            //             previousSeq: previousSeq,
            //             previousRegdate: previousDay,
            //         };
            //     }
            //     // return {
            //     //     ...state,
            //     //     pagingData: action.data,
            //     // };
            // }
            // case PAGING_FAILURE: {
            //     return {
            //         ...state,
            //         nextTitle:""
            //     };
            // }
            

            case LOAD_FREE_BOARD_COMMENTS_REQUEST: {
                break;
            }
            case LOAD_FREE_BOARD_COMMENTS_SUCCESS: {
                draft.commentArray = action.data[0];
                draft.arrayCommentsData = action.data[1];
                break;
            }
            
            case SAVE_COMMENT_REQUEST: {
                draft.insertComments = false; 
                break;
            }
            case SAVE_COMMENT_SUCCESS: {
                
                draft.insertComments = true;
                draft.commentArray.unshift(action.data[0]);
                
                break;
            }
        
            case COMMENT_DELETE_DATA_REQUEST: {
                break;
            }
            case COMMENT_DELETE_DATA_SUCCESS: {
                const index = draft.commentArray.findIndex((v, i) => v.seq === action.data.seq);
                draft.commentArray.splice(index, 1);
                break;
            }
            

            case SUB_COMMENT_DELETE_DATA_REQUEST: {
                break;
            }
            case SUB_COMMENT_DELETE_DATA_SUCCESS: {

                const index = draft.arrayCommentsData.findIndex((v, i) => v.seq === action.data.seq);
                // console.log(index)
                draft.arrayCommentsData.splice(index, 1);
                break;
            }
            



            case EDIT_COMMENT_REQUEST: {
                draft.commentArrayBool = false;
                draft.commentBoolData = true;
                break;
            }
            case EDIT_COMMENT_SUCCESS: {
                draft.commentArrayBool = true;
                draft.commentBoolData = false;
                let index = draft.commentArray.findIndex((v, i) => v.seq === action.data.seq);

                draft.commentArray.splice(index, 1);
                draft.commentArray.unshift(action.data.result[0]);

                break;
            }
            

            case SUB_EDIT_COMMENT_REQUEST: {
                draft.subCommentArrayBool = false;
                draft.commentBoolData = true;
                break;
            }
            case SUB_EDIT_COMMENT_SUCCESS: {
                // console.log(state.commentArray)
                draft.subCommentArrayBool = true
                draft.commentBoolData = false;
                let index = draft.arrayCommentsData.findIndex((v, i) => v.seq === action.data.seq);
                draft.arrayCommentsData.splice(index, 1);
                draft.arrayCommentsData.push(action.data.result[0]);
                break;
            }

            case ADD_COMMENTS_DATA_REQUEST: {
                draft.addCommentBool = false;
                draft.commentBoolData = true;
                break;
            }
            case ADD_COMMENTS_DATA_SUCCESS: {
                draft.addCommentBool = true;
                draft.commentBoolData = false;
                draft.arrayCommentsData.unshift(action.data[0]);
                break;
            }
            default: {
                break;
            }
        }
    })
}

export default reducer