import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form, Input, Card, Avatar, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Divider, Tag } from 'antd';
import Faq from "../components/Faq"
import Link from 'next/link';
import "../assets/css/serviceCenter.css"

const serviceCenter = () => {

	const faqLists = [
		{ category:'게임 진행', title: 'Q. 플레이어가 실행이 안됩니다.', content: 'A. 플레이어가 실행이 되지 않으신다면 플레이어를 삭제하고 재설치 해보시기 바랍니다.' },
        { category:'게임 진행', title: 'Q. 플레이어는 어떻게 사용하나요?', content:'A. 홈페이지에서 원하는 노래를 선택하신 후 플레이어에서 재생하면 됩니다.'},
        { category:'계정', title: 'Q. 로그인이 안됩니다.', content:'A. 로그인이 안될 때는 아이디나 비밀번호가 맞는지 다시 한번 확인해 주시고 잊어버리셨다면 아이디/비밀번호 찾기를 통해 찾으시면 됩니다.'},
        { category:'계정', title: 'Q. 회원가입은 어떻게 하나요?', content:'A. 홈페이지 우측의 [회원가입] 버튼을 통해 회원가입을 할 수 있습니다.'},
        { category:'계정', title: 'Q. 회원 탈퇴는 어떻게 하나요.', content:'A. 홈페이지 우측의 [내 정보] 탭에 들어가셔서 [회원탈퇴] 버튼을 누르시면 됩니다.'},
        { category:'계정', title: 'Q. 탈퇴 후, 재가입 할 수 있나요?', content:'A. 탈퇴 하신 후 가입은 새로운 아이디와 비밀번호를 새롭게 생성해야하는 신규회원으로 다시 가입을 하셔야 합니다.'}
    ]

	return(
		<>
			<div>
				<h2 id="faqName">FAQ</h2>
				<div id="faqHeader">
					<p className="question">문의 분류</p>
					<p className="question"> 질문</p>
				</div>
				<div style={{marginTop: "10px", clear: "both"}}>
					{faqLists.map((v, i) => {
						return(
							<Faq data={v} index={i}/>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default serviceCenter