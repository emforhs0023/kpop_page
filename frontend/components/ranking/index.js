import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const ranking = ({data, index}) => {
    
    return (
        <>  
            {index == 0 && (
                <div className="rankingList">
                    <img src={require("../../assets/ranking/01.png")} alt="" className="rankingImg"/>
                    <div className="rankingUserId">{data.user_id}</div>
                    <div><span style={{color:"#dc047f"}}>♥</span> {data.count}</div>
                </div>
            )}
            {index == 1 && (
                <div className="rankingList">
                    <img src={require("../../assets/ranking/02.png")} alt="" className="rankingImg"/>
                    <div className="rankingUserId">{data.user_id}</div>
                    <div><span style={{color:"#dc047f"}}>♥</span> {data.count}</div>
                </div>
            )}
            {index == 2 && (
                <div className="rankingList">
                    <img src={require("../../assets/ranking/03.png")} alt="" className="rankingImg"/>
                    <div className="rankingUserId">{data.user_id}</div>
                    <div><span style={{color:"#dc047f"}}>♥</span> {data.count}</div>
                </div>
            )}
            {index == 3 && (
                <div className="rankingList">
                    <img src={require("../../assets/ranking/04.png")} alt="" className="rankingImg"/>
                    <div className="rankingUserId">{data.user_id}</div>
                    <div><span style={{color:"#dc047f"}}>♥</span> {data.count}</div>
                </div>
            )}

            {index == 4 && (
                <div className="rankingList">
                    <img src={require("../../assets/ranking/05.png")} alt="" className="rankingImg"/>
                    <div className="rankingUserId">{data.user_id}</div>
                    <div><span style={{color:"#dc047f"}}>♥</span> {data.count}</div>
                </div>
            )}
        </>
    );
};

export default ranking;

