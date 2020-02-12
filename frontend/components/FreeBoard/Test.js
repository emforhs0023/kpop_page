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



const ArrayComments = ({ seq, parent, mainSeq}) => {
    const [seqData, setSeqData] = useState([])
    const [parentData, setParentData] = useState([])
    const num = mainSeq
    // console.log(num)
    useEffect(() => {
        if(num != parent){
            console.log(parent)
        }
        if(mainSeq != parent){
            
        }
    }, []);  
    
    // seqData.forEach(function(index, i){
    //     console.log(index)
    // })
    // if(mainSeq != parent){
    //     console.log(parent)
    // }
    return (
        <>   
            dsafadsfdsf
        </>
    )
}


export default ArrayComments;

