import React, { useEffect, useState, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Icon  } from 'antd';
import styled from "styled-components";

const EditButton = ({ onClickMore, data }) => {
	return (
		<>
			<Button onClick={onClickMore(data)}>
                Edit
            </Button>
		</>
	)
}


export default EditButton;