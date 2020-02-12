import React, { useEffect, useState, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Icon, Input  } from 'antd';
import { useRouter } from 'next/router'
import styled from "styled-components";
import { EDIT_COMMENT_REQUEST } from '../../reducers/freeBoard';


const EnterCommentZoon = styled.div`
    clear: both; border-color: #b2d3fb; background-color: #e9f2fd; border-radius: 21px; border-width: 1px; border-style: solid; margin-top: 20px; padding: 5px;
`;

const CommentAdd = styled.h2`
    font-size: 11px; font-weight: normal; margin-top: 8px; margin-left: 8px;
`;

const SubBox = ({ onClickMore, data }) => {
	const { me } = useSelector(state => state.user);
	const [text, setText] = useState('');
    const router = useRouter()
    const dispatch = useDispatch();
    useEffect(() => {
        setText(data.content);
    }, []);  

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

	const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        // dispatch({
        //     type: EDIT_COMMENT_REQUEST,
        //     data: {
        //         seq:data.seq,
        //         user_id:me.id,
        //         content: text
        //     }
        // });
    }, [text]);

	return (
		<>
			<EnterCommentZoon>
                <div style={{borderColor: "#b2d3fb", backgroundColor: "#e9f2fd"}}>
                    <div style={{backgroundColor: "#fff", borderRadius: "16px", border: "1px solid", marginBottom: "5px", padding: "0 5px 5px", borderColor: "#b2d3fb"}}>
                        <Card style={{clear: "both", height: "159px !important"}}>
                            <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
                        </Card>
                        <div style={{width: "15%", margin: "0 auto"}}>
                            <Button onClick={onSubmitForm} style={{fontWeight: "700", fontSize: "15px", marginTop: "10px"}}>댓글 수정</Button>
                        </div>
                    </div>
                </div>
            </EnterCommentZoon>
		</>
	)
}


export default SubBox;