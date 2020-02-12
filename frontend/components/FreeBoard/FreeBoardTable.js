import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Divider, Tag } from 'antd';
import Link from 'next/link';

const FreeBoardTable = () => {
	const { listCategories } = useSelector(state => state.freeBoard);

	const columns = [
		{
			title: '번호',
			render: num => <Link href={`./freeBoard?seq=${num.seq}`}><a>{num.seq}</a></Link>,
			key: 'name',
		},
		{
			title: '제목',
			render: title => `${title.title}`,
			key: 'titleName',
		},
	];
    return (
        <>
			<Table
				columns={columns}
				rowKey={record => record.seq}
				dataSource={listCategories}
		    />

        </>
    );
}

export default FreeBoardTable;
