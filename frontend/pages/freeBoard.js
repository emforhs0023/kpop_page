import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Divider, Tag, Spin } from 'antd';
import Link from 'next/link';
import moment from 'moment'
import { useRouter } from 'next/router'
import FreeBoardComments from '../components/FreeBoard/FreeBoardComments'
import EnterComment from '../components/FreeBoard/EnterComment'
import FreeBoardTable from '../components/FreeBoard/FreeBoardTable'


import { LOAD_FREE_BOARD_REQUEST, LOAD_FREE_BOARD_LIST_REQUEST, LOAD_FREE_BOARD_COMMENTS_REQUEST } from '../reducers/freeBoard';

const freeBoard = () => {
	const { freeBoardInfo, next, prev, commentArray, arrayCommentsData, subArrayCommentsData, pagingData, nextTitle, previousTitle, previousSeq, previousRegdate, listCategories } = useSelector(state => state.freeBoard);
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const router = useRouter()
    
    let regdate = moment(freeBoardInfo.regdate);
    let newRegDate = regdate.format('YYYY.MM.DD HH:mm:ss')
    return (
        <>
	       {freeBoardInfo.length > 0 ? 
                <div>
                    <div>
                        <div style= {{borderTop: "1px solid #CCC", borderBottom: "1px solid #CCC", height: "42px"}}>
                            <span>
                                {freeBoardInfo[0].title}
                            </span>
                        </div>
                        <div style={{clear: "both", borderBottom: "1px solid #EEE", padding: "10px 8px"}}>
                            <span>{ freeBoardInfo[0].user_id }</span>
                        </div>  
                    </div>
                    <div>
                        <iframe src={freeBoardInfo[0].fullYoutube} width="100%" height='601' border='1px solid'> </iframe> 
                        <div>
                            <table style={{display: "table", width: "100%", marginBottom: "20px", border: "1px solid #DDD", borderBottomColor: "#CCC"}}>
                                <tbody>
                                    <tr style={{background: "#F6F6F6"}}>
                                        <th scope="row" style={{padding: "7px 24px", borderRight: "1px solid #DDD", wordBreak: "break-all"}}>유튜브 주소</th>
                                        <td style={{background: "white", padding: "7px 16px"}}>{freeBoardInfo[0].fullYoutube} </td>                                      
                                    </tr>       
                                </tbody>
                            </table>
                        </div>

                        <div style={{color: "#000", fontSize: "13px", marginBottom: "60px"}}>
                            <br/>
                            <div style={{color: "rgb(17, 17, 17)", fontSize: "18px", fontVariantNumeric: "normal", fontVariantEastAsian: "normal"}}>
                                {freeBoardInfo[0].content}
                            </div>
                            <br/>
                            <br/>
                            <div  style={{maxWidth: "50%", textDecoration: "none", float: "left", color:"black"}}>
                                {prev.length > 0 && 
                                    <Button>
                                        <Link href={`./freeBoard?seq=${prev[0].seq}`}>
                                            <a>
                                                <Icon type="left" />
                                                PreviousTitle
                                                <span style={{marginLeft:"10px"}}> {prev.length > 0 && prev[0].title}</span>
                                            </a>
                                        </Link>
                                    </Button>
                                }    
                            </div>
                            <div style={{maxWidth: "50%", textDecoration: "none", float: "right", color:"black"}}>
                                {next.length > 0 && 
                                    <Button>
                                        
                                        <Link href={`./freeBoard?seq=${next[0].seq}`}>
                                            <a>
                                                <span style={{marginRight:"10px"}}> {next.length > 0 && next[0].title}</span>
                                                Next
                                                <Icon type="right" />
                                            </a>
                                        </Link>
                                    </Button>
                                }
                            </div>
                        </div>
                        
                        <div style={{paddingBottom: "50px" ,borderTop: "1px solid #DDD", paddingTop: "20px"}}>
                            <div style={{float: "left"}}>
                                <Link href="/community?seq=2">
                                    <a>
                                        <Button type="primary">목차</Button>
                                    </a>
                                </Link>
                            </div>
                            <div style={{float: "right"}}>
                                <Button type="primary">수정</Button> <Button type="primary">삭제</Button>
                            </div>
                        </div>
                        <div>
                            <div style={{maxHeight: "123px", borderBottom: "1px solid #e0e0e0"}}>
                                {commentArray.length > 0 && commentArray.map((v, i) => {
                                    return (
                                        <FreeBoardComments data={v} index={i} />
                                    )
                                })}
                            </div>
                        </div>
                        

                        <div style={{ clear:"both", paddingTop:"30px"}}>
                            <FreeBoardTable  />
                        </div>
                        
                        
                        <div>
                            <EnterComment />
                        </div>
                    </div>
                </div>
            :  <Icon type="loading" style={{ fontSize: 24 }} spin />
            }	
		</>
    );
}

freeBoard.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_FREE_BOARD_REQUEST,
        data: context.query.seq
    });
    context.store.dispatch({
        type: LOAD_FREE_BOARD_COMMENTS_REQUEST,
        data: context.query.seq
    });
    context.store.dispatch({
        type: LOAD_FREE_BOARD_LIST_REQUEST,
    });
};

export default freeBoard;
