import React, { useEffect } from 'react';
import Link from 'next/link';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { MainMenuAtag, Image } from "../assets/css/MainLayout.js";
import { Col, Input, Menu, Dropdown, Icon, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import MenuList from './login/MenuList';
import LoginForm from './login/LoginForm';
import UserProfile from './login/UserProfile';
import "../assets/css/mainMenu.css"

const AppLayout = ({ children }) => {
    
    const MainHeader = styled.div`
        width: 1200px; margin: 0 auto; height: 130px;
    `;
    return (
        <>
            <div style={{ borderTop: "3px solid #e4007f!important", boxShadow: "0 2px 6px rgba(0,0,0,0.2)", width: "100%"}}>
                <MainHeader>
                    <MenuList />    
                </MainHeader> 
            </div>
            <div id="mainBody">
                <div>
                    <div  style={{ margin: '0 auto', width: "100%", padding: "10px"}}>
                        {children}  
                    </div>
                </div>
            </div>
        </>
    )
}


export default AppLayout;