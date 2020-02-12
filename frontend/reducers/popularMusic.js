export const initialState = {
    popularMusicData: [],
    popularMusicError:"",
    isLoading:""
};

export const LOAD_MAIN_POPULAR_MUSIC_REQUEST = "LOAD_MAIN_POPULAR_MUSIC_REQUEST"
export const LOAD_MAIN_POPULAR_MUSIC_SUCCESS = "LOAD_MAIN_POPULAR_MUSIC_SUCCESS"
export const LOAD_MAIN_POPULAR_MUSIC_FAILURE = "LOAD_MAIN_POPULAR_MUSIC_FAILURE"

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_MAIN_POPULAR_MUSIC_REQUEST: {
            return {
                ...state,
            };
        }
        case LOAD_MAIN_POPULAR_MUSIC_SUCCESS: {
            return {
                ...state,
                popularMusicData: action.data,
            };
        }
        case LOAD_MAIN_POPULAR_MUSIC_FAILURE: {
            return {
                ...state,
                popularMusicError: action.error,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}

export default reducer