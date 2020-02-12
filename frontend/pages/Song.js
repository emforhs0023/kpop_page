import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Divider, Tag } from 'antd';
import Link from 'next/link';
import { LOAD_MAIN_NEWMUSIC_REQUEST, NEXT_PAGING_REQUEST, PREV_PAGING_REQUEST, WIDTH_DATA_INFO } from '../reducers/newMusic';
import NewMusicList from '../components/NewMusic';


const Song = () => {
	const { newMusicData, musicPageData, widthInfo, newMusicDataCount, loding } = useSelector(state => state.newMusic);
	const [listNum, setListNum ] = useState(0)
	const dispatch = useDispatch();
	
	useEffect(() => {
		let width = document.getElementById('video1').offsetWidth; 
    	 dispatch({
			type: WIDTH_DATA_INFO,
    	    data: width
        })
    },[])
	const videoMeun = () => {
        
        const el = document.getElementById("introduce");
        el.style.display ="none"
    }
    const videoMeunOut = () => {
        
        const el = document.getElementById("introduce");
        el.style.display ="block"   
    }
    const musicPrev = useCallback((e) => {
        e.preventDefault()
        let minus = listNum
		
        minus = (Number(minus)-7)
        if(minus <= 0){
            minus = 0
        } 

        setListNum(minus)
        
        dispatch({
            type: PREV_PAGING_REQUEST,
            data: minus
        })
    },[])

    const musicNext = useCallback((e) => {
        e.preventDefault()
		
        let aa = newMusicDataCount[0].count/7 // 전체 나누기 7
        let maxNumber = 0
		/******* 정수 판단 ********/
        if(Number.isInteger(aa)){
            maxNumber = aa
        } else {
            let bb = Math.ceil(aa)
            maxNumber = bb
        }
		/************************/
		
        let numLength = (maxNumber * 7) - 7
		
        let expense = listNum 
        
        expense = (Number(expense) + 7)
		
		// if(numLength > 0) {
		// 	dispatch({
  //               type: NEXT_PAGING_REQUEST,
  //               data: expense
  //           })
		// } else {
		// 	return
		// }
        if(numLength < listNum){
            setListNum(numLength)
        } else {
            	dispatch({
	                type: NEXT_PAGING_REQUEST,
	                data: expense
	            })
        }
        
    },[listNum])
    
	return (
        <>	
        	<div style={{paddingRight: "10px"}}>
        		<div className = "newMusicBody">
        			{ musicPageData.movieUrl != undefined ?
						
						<div id="introduce">
		                    <div id="message" style={{width:`${widthInfo}px`}}>
		                    	{musicPageData.songTitle + "-" + musicPageData.artist}
		                        <br/>
		                        <span>지금 다운로드해서 플레이 해보세요!</span>
		                    </div>
		                </div>
					:  <div id="introduce">
	                        <div id="messageNull" style={{width:`${widthInfo}px`}}>

	                            <span>▼ 아래의 썸네일을 클릭 해주세요. ▼ </span>
	                        </div>
	                    </div>
					}
					{musicPageData.movieUrl ?
	                    <video id="video1" src={require(`../assets/movie/${musicPageData.movieUrl}`)} controls className="mainVideoData"
	                    onMouseOver={(event) =>{ videoMeun() } }
	                    onMouseOut={(event) => { videoMeunOut() } }
	                    /> 
	                    :
	                    <video id="video1" src="" controls className="mainVideoData"
	                    onMouseOver={(event) =>{ videoMeun() } }
	                    onMouseOut={(event) => { videoMeunOut() } }
	                    /> 
	                }
	                <div style={{clear:"both", height: "162px", marginBottom: "10px"}}>
	                    <div style={{borderBottom:"1px solid gray", marginTop: "10px", clear:"both"}}>
	                        <h2 style={{marginleft: "10px"}}>최신 음악</h2>
	                    </div>
	                    <div style={{clear: "both", marginTop: "15px"}}>
	                        <ul style={{padding: "0px", position: "relative"}}>
	                            <div  id="musicPrev" onClick={musicPrev}>
	                                <Icon type="caret-left" id="prevIcon" />
	                            </div>
	                            <div>
	                                {newMusicData.map((c, i) => {
	                                    return (
	                                       <NewMusicList key={i} data={c} index={i}/>         
	                                    )
	                                })}
	                            </div>
	                            <div onClick={musicNext} id="musicNext">
	                                <Icon type="caret-right" id="nextIcon" />
	                            </div>
	                        </ul>
	                    </div>
	                </div>
        		</div>
            </div>
        </>
    );
}

Song.getInitialProps = async (context) => {
	context.store.dispatch({
        type: LOAD_MAIN_NEWMUSIC_REQUEST,
    });

};

export default Song;
