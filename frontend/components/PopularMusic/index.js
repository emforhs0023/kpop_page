import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import withVideos from 'next-videos'

const PopularMusic = ({data, index}) => {
    let thumbnail = data.thumbnail.substring(8)
    let movieUrl = data.movieUrl.substring(14)
    console.log(movieUrl)
    return (
        <>  

            <div className={`mainVideoList mainVideoList${index}`}>

               <video src={require(`../../assets/movie/${data.movieUrl}`)} controls className="mainVideoData"/>        
                <div className="mainVideoCard">
                    <div className="mainVideoArtistName"><p>{data.artist}</p></div>
                    <div className="mainVideoSongTitle"><p> {data.songTitle}</p></div>
                </div>
            </div>
        </>
    );
};

export default PopularMusic;

