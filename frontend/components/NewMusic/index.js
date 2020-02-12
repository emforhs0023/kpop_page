import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { MUSCI_PAGE_DATA } from '../../reducers/newMusic';
import "../../assets/css/subNewMusic.css"
import "../../assets/css/newMusic.css"

const NewMusic = ({data, index}) => {
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const dataInfo = useCallback((data, index) => (e) => {
        e.preventDefault()

        let thumbnail = data.thumbnail
        let movieUrl = data.movieUrl
        let songTitle = data.songTitle
        let artist = data.artist
        let seq = data.seq
        let dataInfo = { thumbnail: thumbnail, movieUrl:movieUrl, songTitle:songTitle, artist:artist, seq:seq }

        dispatch({
            type: MUSCI_PAGE_DATA,
            data: {
                thumbnail: thumbnail, movieUrl:movieUrl, songTitle:songTitle, seq:seq, artist:artist
            },
        });
        // setItems(dataInfo)
        // setMovieBool(movieUrl)
    }, [])

	return (
        <>  
            <li className= {`musicList${index} musicList`} onClick={dataInfo(data, index)}>
                <img src={require(`../../assets/profile/${data.thumbnail}`)} alt="" className="newMusicListImg"/>
                <div>
                	<p className="newMusicListArtistTitle">{data.artist}</p>
                </div>
            </li>
        </>
    );
};

export default NewMusic;

