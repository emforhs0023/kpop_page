import React, { useCallback, useState } from 'react';
import { Button, Form, Input, Card } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
// import { useInput } from '../pages/signup'; // TODO: util 폴더로 옮기기
import { LOG_IN_REQUEST } from '../../reducers/user';

export const useInput = (initValue = null) => {
    
    const [value, setter] = useState(initValue);
    
    const handler = useCallback((e) => {
        setter(e.target.value);
    }, []);
    return [value, handler];
};

const LoginForm = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const { isLoggingIn } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId: id,
                password,
            },
        });
    }, [id, password]);

    return (
        <Card style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.2)", width: "25%", float: "left", marginLeft: "10px"}}>
            <Form onSubmit={onSubmitForm}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} onChange={onChangeId} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" value={password} onChange={onChangePassword} type="password" required />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
                    <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                </div>
            </Form>
        </Card>
    );
};

export default LoginForm;