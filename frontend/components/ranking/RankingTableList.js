import React, { useEffect, useState, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Icon, Input  } from 'antd';
import { useRouter } from 'next/router'
import styled from "styled-components";

const RankingTableList = ({data, index}) => {
	return (
		<>
			<tr className="rankingTr" style={{textAlign: 'center', fontSize: "30px"}}>
				<td className="rankingTd">{index}</td>
				<td className="rankingTd">{data.user_id}</td>
				<td className="rankingTd">{data.count}</td>
			</tr>
		</>
	)
}

export default RankingTableList;