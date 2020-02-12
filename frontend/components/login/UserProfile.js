import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Card, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../../reducers/user';

const UserProfile = () => {
	const { me } = useSelector(state => state.user);
	
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);
	return (
        <Card style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)", width: "25%", float: "left", marginLeft: "10px", height: "198px"}}>
            <Card.Meta
                avatar={<Avatar>{me.id[0]}</Avatar>}
                title={me.id}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;