import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Divider, Tag } from 'antd';
import { LOAD_MAIN_NOTICES_REQUEST } from '../../reducers/noticeBoard';
import Link from 'next/link';

const NoticeBoardTable = () => {
	const { noticeInfo } = useSelector(state => state.noticeBoard);

	const columns = [
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
    return (
        <div style={{borderTop: "3px solid #e4007f!important"}}>
			<Table
				columns={columns}
				rowKey={record => record.seq}
				dataSource={noticeInfo}
		    />
	    </div>
    );
}

export default NoticeBoardTable;
