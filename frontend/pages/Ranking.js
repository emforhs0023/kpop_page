import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Divider, Tag } from 'antd';
import Link from 'next/link';
import { LOAD_MAIN_RANKING_REQUEST } from '../reducers/ranking';
import RankingTableList from "../components/ranking/RankingTableList"
import "../assets/css/rankingTable.css"
// import "../assets/css/mainMenu.css"
const Ranking = () => {
	const { rankingData } = useSelector(state => state.ranking);
	
    return (
        <>
        	<div style={{width:"100%", textAlign: "center", borderTop: "3px solid #e4007f!important"}}>
	        	<table id="rankingTable">
					<thead>
					    <tr className="rankingTr">
							<th className="rankingTh" style={{width:"15%",fontSize: "40px",textAlign: "center"}}>랭킹</th>
							<th className="rankingTh" style={{width:"73%",fontSize: "40px",textAlign: "center"}}>유저</th>
							<th className="rankingTh" style={{width:"100%",fontSize: "40px",textAlign: "center"}}>좋아요</th>
					    </tr>
					</thead>
					<tbody>
						{rankingData.map((v, i) => {
							return (
								<RankingTableList data={v} index={i} />
							)
						})}
					</tbody>
				</table>
			</div>
		</>
    );
}

Ranking.getInitialProps = async (context) => { 

    context.store.dispatch({
        type: LOAD_MAIN_RANKING_REQUEST,
    });
};

export default Ranking;

