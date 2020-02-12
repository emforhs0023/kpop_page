import { Col, Input, Menu, Dropdown, Icon, Row } from 'antd';
import logo from "../../assets/logo.png"
import Link from 'next/link';
const MenuList = () => {
	const music = (
		<Menu>
			<Menu.Item>
				<Link href="/Song">
					<a>
						<div className="ant-dropdown-link">
							노래
						</div>	
					</a>
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Link href="/Dance">
					<a>
						<div className="ant-dropdown-link">
							댄스 목록
						</div>	
					</a>
				</Link>
			</Menu.Item>
    	</Menu>
	)
	const community = (
		<Menu>
			<Menu.Item>
				<Link href="/community?seq=1">
	        		<a>
			        	<div className="ant-dropdown-link">
							공지 사항
						</div>
					</a>
				</Link>
			</Menu.Item>
			<Menu.Item>
      			<Link href="/community?seq=2">
	        		<a>
			        	<div className="ant-dropdown-link">
							자유 게시판
						</div>
					</a>
				</Link>
    		</Menu.Item>
  		</Menu>
	)
	return (
		<div>
			<div className="menuList textMunu">
			<Link href="/Song">
				<a>
					<Dropdown overlay={music}>
						<div className="ant-dropdown-link">
							노래
						</div>	
					</Dropdown>
				</a>
			</Link>	
	        </div>
	        <div className="menuList textMunu">
	        <Link href="/community?seq=1">
				<a>
					<Dropdown overlay={community}>
						<div className="ant-dropdown-link">
							커뮤니티
						</div>	
					</Dropdown>
				</a>
			</Link>	
	        </div>
	        <div className="menuList" style={{marginTop: "10px", marginBottom: "10px"}}>
	        	<Link href="/">
	        		<a>
	        			<img src={logo} alt="" id="mainLogo"/>
	        		</a>	
        		</Link>
	        </div>
	        <div className="menuList textMunu">
	        	<Link href="/Ranking">
					<a>
						<div>
							랭킹
						</div>	
					</a>
				</Link>	
	        	
	        </div>
	        <div className="menuList textMunu">
		        <Link href="/ServiceCenter">
					<a>
						<div>
							고객센터
						</div>	
					</a>
				</Link>	
	        	
	        </div>
		</div>
	)
	
}

export default MenuList;