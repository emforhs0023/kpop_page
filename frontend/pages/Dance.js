import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import { Table, Divider, Tag } from 'antd';
import { useRouter } from 'next/router'
import Link from 'next/link';
import moment from 'moment'
import { LOAD_DANCE_REQUEST, LOAD_USER_DANCE_REQUEST } from '../reducers/dance';
import DanceTable from '../components/Dance'
import UserDanceTable from '../components/Dance/userDanceTable'

const DanceMainTitle = styled.h2`
	    margin-top: 5px; border-bottom: 1px solid gray; padding-bottom: 5px;
	`;
const LikeZoon = styled.div`
    float: left; margin-left: 10px; width: 107px; padding-bottom: 3px;
`;
const LikeIcon = styled.p`
    margin: 0px; font-size: 12px; margin-top: 2px;
`;
const Dance = () => {
	const { me } = useSelector(state => state.user);
	const { danceInfo, userDanceInfo, userDancecount, userIdDate } = useSelector(state => state.dance);
	
	 const onToggleLike = useCallback(() => {
		if (!me) {
            return alert('로그인이 필요합니다!');
        }

    },[])
	


	return (
		<>
			<DanceMainTitle>
			댄스 목록
			</DanceMainTitle>
			<div>
				
				{me ?
					
					<div>
						{console.log(danceInfo)}
						{danceInfo.length > 0 && danceInfo.map((v, i) => {
		                    return (
		                        <UserDanceTable data={v} index={i} key={v.seq}/>
			                )
		                })}
		            </div>

				: 
				<div>
					{danceInfo.length > 0 && danceInfo.map((v, i) => {
	                    return (
	                        <DanceTable data={v} index={i} key={v.seq}/>
	                    )
	                })}
				</div>
				}
				
			</div>
		</>
	)
}

Dance.getInitialProps = async (context) => {
	const state = context.store.getState();
	if(state.user.me != null){
		context.store.dispatch({
	        type: LOAD_USER_DANCE_REQUEST,
	        data: state.user.me.id
	    })
	} else {
		context.store.dispatch({
	        type: LOAD_DANCE_REQUEST,
	    })
	}
    ;
};


export default Dance