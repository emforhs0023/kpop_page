import produce from 'immer';

export const initialState = {
    rankingData: [],
    rankingDataError:"",
    isLoading:""
};

export const LOAD_MAIN_RANKING_REQUEST = "LOAD_MAIN_RANKING_REQUEST"
export const LOAD_MAIN_RANKING_SUCCESS = "LOAD_MAIN_RANKING_SUCCESS"
export const LOAD_MAIN_RANKING_FAILURE = "LOAD_MAIN_RANKING_FAILURE"

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_MAIN_RANKING_REQUEST: {
                break;
            }
            case LOAD_MAIN_RANKING_SUCCESS: {
                
                draft.rankingData = action.data;
                break;
            }
            case LOAD_MAIN_RANKING_FAILURE: {
                draft.rankingDataError = action.error;
                break;
            }
            default: {
                break;
            }
        }
    })
}

export default reducer