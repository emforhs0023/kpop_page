import produce from 'immer';

export const initialState = {
    danceInfo: [],
    userDanceInfo: [],
    userDancecount: 0,
    userIdDate: [],
    emptyIconDataNum: [],
    fullIconDataNum: [],
};

export const LOAD_DANCE_REQUEST = "LOAD_DANCE_REQUEST"
export const LOAD_DANCE_SUCCESS = "LOAD_DANCE_SUCCESS"
export const LOAD_DANCE_FAILURE = "LOAD_DANCE_FAILURE"

export const LOAD_USER_DANCE_REQUEST = "LOAD_USER_DANCE_REQUEST"
export const LOAD_USER_DANCE_SUCCESS = "LOAD_USER_DANCE_SUCCESS"
export const LOAD_USER_DANCE_FAILURE = "LOAD_USER_DANCE_FAILURE"

export const LIKE_REQUEST = "LIKE_REQUEST"
export const LIKE_SUCCESS = "LIKE_SUCCESS"
export const LIKE_FAILURE = "LIKE_FAILURE"

export const UN_LIKE_REQUEST = "UN_LIKE_REQUEST"
export const UN_LIKE_SUCCESS = "UN_LIKE_SUCCESS"
export const UN_LIKE_FAILURE = "UN_LIKE_FAILURE"

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_DANCE_REQUEST: {
                break;
            }
            case LOAD_DANCE_SUCCESS: {
                draft.danceInfo = action.data[0]
                break;
            }
            case LOAD_USER_DANCE_REQUEST: {
                break;
            }
            case LOAD_USER_DANCE_SUCCESS: {
                let emptyIcon = []
                let fullIcon = []
                draft.danceInfo = action.data[0]
                draft.userIdDate = action.data[2]
                
                const fullIconList = action.data[2]

                fullIconList.forEach(user => {
                    let full = user.document_srl
                    fullIcon.push(full)
                })      
                action.data[0].forEach(user1 => {
                    let empty = user1.seq
                    emptyIcon.push(empty)
                })      
                emptyIcon = emptyIcon.filter(function(val) {
                      return fullIcon.indexOf(val) == -1;
                });
                draft.emptyIconDataNum = emptyIcon
                draft.fullIconDataNum = fullIcon
                // emptyIcon = emptyIconList.filter(function(val) {
                //       return fullIcon.indexOf(val) == -1;
                // });

                // const overlapDataList = data2.filter((item, pos) => (item.seq) == item.seq);
                // console.log(overlapDataList)
                // const unique_user = data2.reduce((prev, now) => {
                //    return console.log(prev)
                // }, {});
                // data.forEach((v) => {
                    
                // })
                
                //  const data1 = action.data[0]
                // const data2 = action.data[2]
                // var data = {"cells": [...data2]}
                // data2.forEach((v,i) => {
                //     // const seq = {
                //     //         data2.filter(function(o) {
                //     //         return o.seq === v.seq;
                //     //         }).reduce(function(sum, o) {
                //     //         return o.seq;
                //     //     }, 0)
                //     // }
                //     const dataList = {
                //         "seq": data2.filter((item, pos, cc) => console.log(item))
                //     }
                //     console.log(dataList)
                // })
                // console.log(overlapDataList)
                // overlapDataList.forEach((v, i) => {
                //     const dataList = {
                //         "seq": v.seq,
                //         "user_id": v.user_id,
                //         "thumbnail": v.thumbnail,
                //         "artist": v.artist,
                //         "songTitle": v.songTitle,
                //         "movieUrl": v.movieUrl,
                //         "album": v.album,
                //         "active": v.active,
                //         "count": v.count,
                //         "downloadCount": v.downloadCount,
                //         "date": v.date,
                //         "user": {"user_id": v.userUser_id, "auth": v.userAuth},
                //         "log": {"seq": v.logSeq, "user_id": v.logUser_id, "document_srl": v.logDocument_srl},
                //     }
                //     draft.userIdDate.push(dataList)
                // })
                break;
            }
            case LIKE_REQUEST: {
                break;
            }
            case LIKE_SUCCESS: {
                
                const dataLike = action.data[3]
                // console.log(action.data[3][0].document_srl)
                let index = draft.emptyIconDataNum.findIndex((v, i) => v === action.data[3][0].document_srl);
                
                draft.emptyIconDataNum.splice(index, 1);
                draft.fullIconDataNum.push(dataLike[0].document_srl)
                // console.log("aaaa", dataLike[0].document_srl)

                // console.log(index)
                // console.log("cc", dataLike[0].document_srl)
                // console.log("aaaaa", index)
                
                break;
            }
            case UN_LIKE_REQUEST: {
                break;
            }
            case UN_LIKE_SUCCESS: {
                console.log(action.data.seq)
                let index = draft.fullIconDataNum.findIndex((v, i) => v === action.data.seq);
                draft.fullIconDataNum.splice(index, 1);

                draft.emptyIconDataNum.push(action.data.seq);
                


                break;
            }
            default: {
                break;
            }
        }
    })
}

export default reducer
