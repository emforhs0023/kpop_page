import React, { useEffect, useState, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Icon, Input  } from 'antd';
import { useRouter } from 'next/router'
import styled from "styled-components";
// import { ADD_COMMENTS_DATA_REQUEST } from '../../reducers/freeBoard';
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import EditBox from "./EditBox"
import AddButton from "./AddButton"
import AddBox from "./AddBox"


import { SUB_COMMENT_DELETE_DATA_REQUEST } from '../../reducers/freeBoard';

const LoginBol = styled.div`
    width: 78%; float: left; margin-top: 20px;
`;
const CommentTwo = styled.div`
    width: 20%; float: left; margin-top: 20px;
`;



const ArrayComments = ({ data, mainParent, mainSeq }) => {
    const { me } = useSelector(state => state.user);
    const [subBool, setSubBool] = useState(false)
    const [addCommentBool, setAddCommentBool] = useState(false)
    const { commentArray, commentBoolData } = useSelector(state => state.freeBoard);
    const dispatch = useDispatch();
    const asd = useCallback((data) => (e) => {
        e.preventDefault()
        setSubBool(!subBool)

    }, [subBool]);

    const onDelete = useCallback((data) => (e) => {
        e.preventDefault()
        
        dispatch({
            type: SUB_COMMENT_DELETE_DATA_REQUEST,
            data: {
                seq:data.seq,
                user_id:me.id,
                content: data.content
            }
        });
        
    }, [])
    
    const onEdit = useCallback((data) => (e) => {
        e.preventDefault()
        setSubBool(!subBool)

    }, [subBool]);
    
    useEffect(() => {
        if (commentBoolData) {
            setSubBool(false);
        }
    }, [!commentBoolData]); 

    const onBoxEdit = useCallback((data) => (e) => {
        e.preventDefault()
        
    }, [])

    const onAdd = useCallback((data) => (e) => {
        e.preventDefault()
        setAddCommentBool(!addCommentBool)
    }, [addCommentBool]);

    return (
        <>   
            
            
            {mainSeq === data.parent ? 
                <div>
                    <CommentTwo>
                        <div>
                            <Icon type="arrow-right" style={{float: "left", marginLeft: "35px", color: "#1976d2"}} />
                            <div style={{marginLeft: "99px"}}></div>
                            {data.user_id}
                        </div>
                    </CommentTwo>
                    <LoginBol>
                        <div>
                            <Card>
                                <div style={{color: "black", padding: "10px"}}> {data.content}</div>
                            </Card>
                            { me != null && me.id == data.user_id
                            ?
                                <div>
                                    <DeleteButton
                                        onClickMore={onDelete}
                                        data = {data}
                                    />
                                    
                                    <EditButton 
                                        onClickMore={onEdit}
                                        data = {data}
                                    /> 
                                    {subBool ?
                                        <EditBox 
                                            onClickMore={onBoxEdit}
                                            data={data}
                                            dataNumber = "2"
                                        />
                                        : null
                                    }

                                </div>
                            : null
                            }
                        </div>
                    </LoginBol>
                    
                </div>
                : null
            }
           
            
        </>
    )
}


export default ArrayComments;

