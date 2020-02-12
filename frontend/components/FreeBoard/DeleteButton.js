import React, { useEffect, useState, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Icon  } from 'antd';
import styled from "styled-components";

const DeleteButton = ({ onClickMore, data }) => {
	return (
		<>
			<Button onClick={onClickMore(data)}>
                delete
            </Button>
		</>
	)
}


export default DeleteButton;