import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Carousel } from 'antd';
import Notice from '../components/notice';
import Ranking from '../components/ranking';
import MainNewMusic from '../components/NewMusic/MainNewMusic';
import PopularMusic from '../components/popularMusic';
import LoginForm from '../components/login/LoginForm';
import UserProfile from '../components/login/UserProfile';

import { LOAD_MAIN_NOTICES_REQUEST } from '../reducers/noticeBoard';
import { LOAD_MAIN_RANKING_REQUEST } from '../reducers/ranking';
import { LOAD_MAIN_NEWMUSIC_REQUEST } from '../reducers/newMusic';
import { LOAD_MAIN_POPULAR_MUSIC_REQUEST } from '../reducers/popularMusic';
import { LOAD_USER_REQUEST } from '../reducers/user';
import mainImg from "../assets/main.png"

import "../assets/css/mainMenu.css"
import "../assets/css/ranking.css"
import "../assets/css/newMusic.css"
import "../assets/css/popularMusic.css"

const Home = () => {
    const { isLoggedIn, me } = useSelector(state => state.user);
    const { noticeInfo } = useSelector(state => state.noticeBoard);
    const { rankingData } = useSelector(state => state.ranking);
    const { newMusicData } = useSelector(state => state.newMusic);
    const { popularMusicData } = useSelector(state => state.popularMusic);
    
    return (
        <div>
            <div>
                <div>
                    <img src={mainImg} style={{width: "100%"}}/>
                </div>
                <div>
                    <Card style={{width: "37%", float: "left", height: "267px", boxShadow: "0 2px 6px rgba(0,0,0,0.2)"}}>
                        <div style={{width: "100%", height: "37px", borderBottom: "1px solid black"}}>
                            <p style={{float: "left", fontSize: "19px", marginBottom: "0px"}}>공지 사항</p>  
                            <p style={{float: "right", cursor: "pointer", color: "black", lineHeight: "2"}}>more ></p>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            {noticeInfo.map((v, i) => {
                                return (
                                    <Notice key={i} data={v} index={i}/>
                                )
                            })}
                        </div>
                    </Card>
                    <Card style={{width: "36%", float: "left", marginLeft: "10px", height: "267px", boxShadow: "0 2px 6px rgba(0,0,0,0.2)"}}>
                        <div style={{width: "100%", height: "37px", borderBottom: "1px solid black"}}>
                            <p style={{float: "left", fontSize: "19px", marginBottom: "0px"}}>랭킹</p>  
                            <p style={{float: "right", cursor: "pointer", color: "black", lineHeight: "2"}}>more ></p>
                        </div>
                        <div id="mainRankingList">
                            {rankingData.map((v, i) => {
                                return (
                                    <Ranking key={i} data={v} index={i}/>
                                )
                            })}
                        </div>
                    </Card>
                    {me
                        ? <UserProfile />
                        : <LoginForm />}
                    <div style={{ float: "left", width: "25%" }}>
                        <img src={require("../assets/download.png")} alt="" style={{borderRadius: "0px 0px 5px 5px", width: "100%", marginLeft: "10px"}}/>  
                    </div>
                </div>
                <Card style={{width: "49%", float: "left", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" , marginTop: "10px"}}>
                    <div style={{width: "100%", height: "37px", borderBottom: "1px solid black"}}>
                        <p style={{float: "left", fontSize: "19px", marginBottom: "0px"}}>최신 음악</p>  
                        <p style={{float: "right", cursor: "pointer", color: "black", lineHeight: "2"}}>more ></p>
                    </div>
                    <div id="mainRankingList">
                        {newMusicData.map((v, i) => {
                            return (
                                <MainNewMusic key={i} data={v} index={i}/>
                            )
                        })}
                    </div>
                </Card>
                <Card style={{width: "50%", float: "left", marginTop: "10px", marginBottom: "10px", marginLeft: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.2)"}}>
                    <div style={{width: "100%", height: "37px", borderBottom: "1px solid black"}}>
                        <p style={{float: "left", fontSize: "19px", marginBottom: "0px"}}>인기 음악</p>  
                        <p style={{float: "right", cursor: "pointer", color: "black", lineHeight: "2"}}>more ></p>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        {popularMusicData.map((v, i) => {
                            return (
                                <PopularMusic key={i} data={v} index={i}/>
                            )
                        })}
                    </div>   
                </Card>
                
            </div>  
        </div>
    );
};

Home.getInitialProps = async (context) => {
    
    context.store.dispatch({
        type: LOAD_MAIN_NOTICES_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_MAIN_RANKING_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_MAIN_NEWMUSIC_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_MAIN_POPULAR_MUSIC_REQUEST,
    });
};

export default Home;