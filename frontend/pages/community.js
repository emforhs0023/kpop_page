import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Divider, Tag } from 'antd';
import { LOAD_FREE_BOARD_LIST_REQUEST } from '../reducers/freeBoard';
import { LOAD_MAIN_NOTICES_REQUEST } from '../reducers/noticeBoard';
import { useRouter } from 'next/router'
import Link from 'next/link';

const Community = () => {
	const { listCategories } = useSelector(state => state.freeBoard);
	const router = useRouter()
	const page = router.query.seq
	
	
	const { noticeInfo } = useSelector(state => state.noticeBoard);

	const columnsNoticeInfo = [ // 공지 사항
		{
			title: '번호',
			render: num => <Link href={`./NoticeBoard?seq=${num.seq}`}><a>{num.seq}</a></Link>,
			key: 'name',
		},
		{
			title: '제목',
			render: title => <Link href={`./NoticeBoard?seq=${title.seq}`}><a>{title.title}</a></Link>,
			key: 'titleName',
		},
	];

    const columns = [ // 자유 게시판
		{
			title: '번호',
			render: num => <Link href={`./freeBoard?seq=${num.seq}`}><a>{num.seq}</a></Link>,
			key: 'name',
		},
		{
			title: '제목',
			render: title => <Link href={`./freeBoard?seq=${title.seq}`}><a>{title.title}</a></Link>,
			key: 'titleName',
		},
	];
    return (
        <>
        	{page == 1 ?
				<div style={{borderTop: "3px solid #e4007f!important"}}>
					<Table
						columns={columnsNoticeInfo}
						rowKey={record => record.seq}
						dataSource={noticeInfo}
				    />
			    </div>
        	:
				<div style={{borderTop: "3px solid #e4007f!important"}}>
					<Table
						columns={columns}
						rowKey={record => record.seq}
						dataSource={listCategories}
				    />
			    </div>
        	}
        	
        </>
    );
}

Community.getInitialProps = async (context) => {
    
    context.store.dispatch({
        type: LOAD_FREE_BOARD_LIST_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_MAIN_NOTICES_REQUEST,
    });
};

export default Community;
