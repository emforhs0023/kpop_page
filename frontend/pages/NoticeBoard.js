import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Divider, Tag } from 'antd';
import { useRouter } from 'next/router'
import Link from 'next/link';
import moment from 'moment'
import { LOAD_NOTICE_BOARD_REQUEST, LOAD_MAIN_NOTICES_REQUEST } from '../reducers/noticeBoard';
import NoticeBoardTable from '../components/notice/NoticeBoardTable'


const NoticeBoard = () => {
	const { pageNoticeInfo, next, prev } = useSelector(state => state.noticeBoard);
	const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const router = useRouter()
    return (
        <>
        	{pageNoticeInfo.length > 0 ? 
	        	<div>
        			<div>
                        <div style= {{borderTop: "1px solid #CCC", borderBottom: "1px solid #CCC", height: "42px"}}>
                            <span>
                                {pageNoticeInfo[0].title}
                            </span>
                        </div>
                        <div style={{clear: "both", borderBottom: "1px solid #EEE", padding: "10px 8px"}}>
                            <span>{ pageNoticeInfo[0].user_id }</span>
                        </div>  
                    </div>
					<div style={{color: "#000", fontSize: "13px", marginBottom: "60px"}}>
                        <br/>
                        <div style={{color: "rgb(17, 17, 17)", fontSize: "18px", fontVariantNumeric: "normal", fontVariantEastAsian: "normal"}}>
                            {pageNoticeInfo[0].content}
                        </div>
                        <br/>
                        <br/>
                        <div  style={{maxWidth: "50%", textDecoration: "none", float: "left", color:"black"}}>
                            {prev.length > 0 && 
                                <Button>
                                    <Link href={`./NoticeBoard?seq=${prev[0].seq}`}>
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
                                    
                                    <Link href={`./NoticeBoard?seq=${next[0].seq}`}>
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
                            <Link href="/community?seq=1">
                                <a>
                                    <Button type="primary">목차</Button>
                                </a>
                            </Link>
                        </div>
                        <div style={{float: "right"}}>
                            <Button type="primary">수정</Button> <Button type="primary">삭제</Button>
                        </div>
                    </div>
					<div style={{ clear:"both", paddingTop:"30px"}}>
                        <NoticeBoardTable  />
                    </div>
				</div>		
			:null}

        </>
    );
}

NoticeBoard.getInitialProps = async (context) => {
	// console.log("dasfdasf")
    context.store.dispatch({
        type: LOAD_NOTICE_BOARD_REQUEST,
        data: context.query.seq
    });
    context.store.dispatch({
        type: LOAD_MAIN_NOTICES_REQUEST,
    });
};

export default NoticeBoard