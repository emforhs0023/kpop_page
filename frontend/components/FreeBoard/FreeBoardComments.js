import React, { useEffect, useState, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Icon  } from 'antd';
import { useRouter } from 'next/router'
import styled from "styled-components";
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import EditBox from "./EditBox"
import AddButton from "./AddButton"
import AddBox from "./AddBox"
import ArrayComments from "./ArrayComments"


import { COMMENT_DELETE_DATA_REQUEST } from '../../reducers/freeBoard';

const LoginBol = styled.div`
    width: 78%; float: left; margin-top: 20px;
`;
const CommentTwo = styled.div`
    width: 20%; float: left; margin-top: 20px;
`;


const FreeBoardComments = ({data, index}) => {
    const { me } = useSelector(state => state.user);
    const { arrayCommentsData, commentBoolData } = useSelector(state => state.freeBoard);
    // const [openBoxBool, setOpenBoxBool] = useState(false)
    const [commentBool, setCommentBool] = useState(false)
    const [addCommentBool, setAddCommentBool] = useState(false)
    const [subBool, setSubBool] = useState(false)
    
    const [clickName, setClickName] = useState([])
    const router = useRouter()
    const dispatch = useDispatch();

    const onEdit = useCallback((data) => (e) => {
        e.preventDefault()
        setCommentBool(!commentBool)
        
    }, [commentBool]);
    
    useEffect(() => {
        if (commentBoolData) {
            setCommentBool(false);
            setAddCommentBool(false);
        }
    }, [!commentBoolData]); 

    const onAdd = useCallback((data) => (e) => {
        e.preventDefault()
        setClickName([])
        setAddCommentBool(!addCommentBool)
        
    }, [addCommentBool]);
    
    const onDelete = useCallback((data) => (e) => {
        e.preventDefault()
        
        dispatch({
            type: COMMENT_DELETE_DATA_REQUEST,
            data: {
                seq:data.seq,
                user_id:me.id,
                content: data.content
            }
        });
        
    }, [])
    
    const onBoxEdit = useCallback((data) => (e) => {
        e.preventDefault()
        
    }, [])
    
    const asd = useCallback((data) => (e) => {
        e.preventDefault()
        setSubBool(!subBool)

    }, [subBool]);
    
    // const onEdit = useCallback((data) => (e) => {
    //     e.preventDefault()
    //     setSubBool(!commentBool)

    //     setClickName((prevTries) => {
    //         return [ ...prevTries, "수정 하기"]  
    //     })
    // }, [commentBool]);

    return (
        <>
            <div style={{}}>
                <div style={{width: "20%", float: "left", marginTop: "20px"}}>
                    <div style={{marginLeft: "15px"}}>{data.user_id}</div>
                </div>
                <LoginBol>
                    <Card>
                        <div style={{color: "black", padding: "10px"}}> {data.content}</div>
                    </Card>
                    { me != null && me.id == data.user_id
                        ? 
                            <>
                                <DeleteButton
                                    onClickMore={onDelete}
                                    data = {data}
                                />
                                
                                <EditButton 
                                    onClickMore={onEdit}
                                    data = {data}
                                /> 
                                {commentBool ?
                                    <EditBox 
                                        onClickMore={onBoxEdit}
                                        data={data}
                                        dataNumber = "1"
                                    />
                                    : null
                                }

                            </>
                        : null
                    }
                    { me != null && 
                        <AddButton 
                            onClickMore={onAdd}
                            data={data}
                        />
                    }
                    { addCommentBool ?
                        <AddBox 
                            onClickMore={onBoxEdit}
                            data={data}
                        />
                        : null
                    }
                    {arrayCommentsData.length > 0 && arrayCommentsData.map((v,i) => {
                        return (<ArrayComments key={i} data={v} mainParent={data.parent} mainSeq={data.seq}/>)
                    })}
                    
                    
                </LoginBol>
            </div>
        </>
    );
};

export default FreeBoardComments;