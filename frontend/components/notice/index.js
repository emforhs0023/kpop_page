import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';

const notice = ({data}) => {
    
    return (
        <>  
            <table>
                <tbody>
                    <tr>
                        <td style={{width: "80%"}}>{data.content}</td>
                        <td>
                            <Moment format="YYYY-MM-DD">
                                {data.lastdate}
                            </Moment>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default notice;

