import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import { Table, Divider, Tag } from 'antd';
import Link from 'next/link';

const DanceTableBody = styled.div`
    float: left; padding: 10px; width: 215px; height: 97px;
`;
const Thumbnail = styled.img`
    width: 78px; height: 78px; float: left; cursor: pointer;
`;
const SongZoon = styled.div`
    float: left; margin-left: 10px; border-bottom: 1px solid #e4007f; width: 107px; padding-bottom: 3px;
`;
const SongTitle = styled.p`
    margin: 0px; font-size: 12px;
`;
const Artist = styled.p`
    margin: 0px; font-size: 12px;
`;
const LikeZoon = styled.div`
    float: left; margin-left: 10px; width: 107px; padding-bottom: 3px;
`;
const LikeIcon = styled.p`
    margin: 0px; font-size: 12px; margin-top: 2px;
`;

const Dance = ({ data, index}) => {
	
	
	return(
		<>
			<DanceTableBody>
				{data.thumbnail !=null ?
					<Thumbnail src={require(`../../assets/${data.thumbnail}`)} />
					: null
				}
				<SongZoon>
            		<SongTitle>{ data.songTitle }</SongTitle>
					<Artist>{ data.artist }</Artist>
				</SongZoon>
				<LikeZoon>
					<LikeIcon id="asd">
						
					</LikeIcon>
				</LikeZoon>

			</DanceTableBody>	
			
		</>
	)
}

export default Dance