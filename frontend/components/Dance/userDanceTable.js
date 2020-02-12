import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import { Table, Divider, Tag, Modal } from 'antd';
import Link from 'next/link';
import { LIKE_REQUEST, UN_LIKE_REQUEST} from '../../reducers/dance';


const DanceTableBody = styled.div`
    float: left; padding: 10px; width: 215px; height: 97px;
`;
const Thumbnail = styled.img`
    width: 78px; height: 78px; float: left; cursor: pointer;
`;
const SongZoon = styled.div`
    float: left; margin-left: 10px; border-bottom: 1px solid #e4007f; width: 107px; padding-bottom: 3px;
`;
const SongTitle = styled.p`
    margin: 0px; font-size: 12px;
`;
const Artist = styled.p`
    margin: 0px; font-size: 12px;
`;
const LikeZoon = styled.div`
    float: left; margin-left: 10px; width: 107px; padding-bottom: 3px;
`;
const LikeIcon = styled.p`
    margin: 0px; font-size: 12px; margin-top: 2px;
`;
const VideoTitleZoon = styled.div`
    width: 100%; background-color: white; margin-top: 20px;
`;
const VideoTitle = styled.span`
    font-size: 20px; font-weight: 700;
`;
const PopupBody = styled.div`
    width: 100%; height: 217px; background-color: white; margin-top: 20px;
`;
const PopupThumbnailZoon = styled.div`
    "width: 50%; float: left;
`;
const PopupZoonPage = styled.div`
    width: 48%; float: left;
`;
const PopupZoonArtistTitle = styled.span`
    font-size: 15px; color: gray;
`;
const PopupArtistTitle = styled.span`
    font-weight: 500;
`;


const userDanceTable = ({ data, index }) => {
	const { me } = useSelector(state => state.user);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const { userIdDate, emptyIconDataNum, fullIconDataNum } = useSelector(state => state.dance);
	const dispatch = useDispatch();
	const inputEl = useRef(null);

	const onToggleLike = useCallback((data) => (e) => {
		e.preventDefault()
		if (!me) {
            return alert('로그인이 필요합니다!');
        }
		let seq = data.seq
		dispatch({
            type: LIKE_REQUEST,
            data: {
                seq:data.seq,
                user_id:me.id,
            }
        });
    },[])
    const unToggleLike = useCallback((data) => (e) => {
		e.preventDefault()
		if (!me) {
            return alert('로그인이 필요합니다!');
        }
		let seq = data.seq

		dispatch({
            type: UN_LIKE_REQUEST,
            data: {
                seq:data.seq,
                user_id:me.id,
            }
        });
    },[])
    const showModal = useCallback((e) => {
		e.preventDefault()
		setVisible(true)
    },[])
    const handleCancel = useCallback((e) => {
		e.preventDefault()
		setVisible(false)
		inputEl.current.pause()
		// $("#video1")[0].pause()
    },[])
    
	// console.log(fullIconDataNum)
	// console.log("vv",emptyIconDataNum)
    // const onAdd = useCallback((data) => (e) => {
    //     e.preventDefault()
    //     setClickName([])
    //     setAddCommentBool(!addCommentBool)
        
    // }, [addCommentBool]);
	return (
		<>

			<DanceTableBody>
				{data.thumbnail != null ?
					<Thumbnail src={require(`../../assets/${data.thumbnail}`)} onClick={showModal} />
					: null
				}
				<SongZoon>
	        		<SongTitle>{ data.songTitle }</SongTitle>
					<Artist>{ data.artist }</Artist>
				</SongZoon>
				<div>
					{emptyIconDataNum.map((t,i) => {
						return(
							<div>
								{data.seq == t ?
									<div onClick={onToggleLike(data)} ><Icon type="heart" style={{marginLeft: "10px", cursor: "pointer", marginTop: "5px", color: "tomato"}}/></div>
								: 	null}
							</div>
						)
					})}
				</div>
				{fullIconDataNum.map((v,i) => {
					return(

						<div>
							{data.seq == v ?
								<div onClick={unToggleLike(data)}><Icon type="heart" theme="filled" style={{color: "tomato", marginLeft: "10px", cursor: "pointer", marginTop: "5px"}}/></div>
							: 	null}
						</div>
					)
				})}
				<Modal
					visible={visible}
		          	title="미리보기"
		          	onCancel={handleCancel}
		          	footer={[
		            	<Button key="back" onClick={handleCancel}>
		              		Return
		            	</Button>,
		          	]}
		        >
		        {data.movieUrl != null ?
					<video id="video1" ref={inputEl} src={require(`../../assets/movie/${data.movieUrl}`)} controls />
					: null
				}
					<VideoTitleZoon>
				        		<VideoTitle >{ data.songTitle }</VideoTitle>
		        	</VideoTitleZoon>
					<PopupBody>
						<div style={{ width: "50%", float: "left"}}>
		        			<img src={require(`../../assets/${data.thumbnail}`)} style={{width: "90%", height: "90%"}}/>
		        		</div>
			        	<PopupZoonPage>
		        			<div>
		        				<PopupZoonArtistTitle>아티스트:</PopupZoonArtistTitle><PopupArtistTitle className="bas">{ data.artist }</PopupArtistTitle>
		        				<br/>
		        				<PopupZoonArtistTitle>앨범:</PopupZoonArtistTitle><PopupArtistTitle className="bas">{ data.album }</PopupArtistTitle>
		        				<br/>
		        			</div>
		        		</PopupZoonPage>
		        	</PopupBody>


		        </Modal>
		    </DanceTableBody>
		</>
	)
}

export default userDanceTable