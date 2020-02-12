import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import { Table, Divider, Tag } from 'antd';
import Link from 'next/link';




const HartIcon = ({ data, index }) => {
	const { me } = useSelector(state => state.user);
	const { userIdDate } = useSelector(state => state.dance);
	
	
	
	return (
		<>
			<div>
			   dasfdsaf
			</div>
		</>
	)
}

export default HartIcon