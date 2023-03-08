import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import palette from '../../lib/styles/palette';

const HeaderBlock = styled.div`
	position: fixed;
	left: 0;
	width: 100%;
	background: white;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

// Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
const Wrapper = styled(Responsive)`
	height: 4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.logo {
		font-family: lobster;
		font-weight: 800;
		font-size: 1.2rem;
		letter-spacing: 2px;
	}

	.right {
		display: flex;
		align-items: center;

		a {
			font-weight: 400;
		}
	}

	.menu {
		font-size: 1.125rem;
		font-weight: 800;
		letter-spacing: 2px;
		color: ${palette.violet[8]};
		&:hover {
		color: ${palette.violet[5]};
		}
	}
`;

// 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
const Spacer = styled.div`
	height: 4rem;
`;

const UserInfo = styled.div`
	margin-right: 1rem;
	font-size: 1rem;
`;

const Header = ({ user, onLogout }) => {
	return (
		<>
			<HeaderBlock>
				<Wrapper>
					<Link to="/" className="logo">
						REACT
					</Link>
					<Link to="/" className="menu">개요</Link>
					<Link to="/postlistpage" className="menu">방명록</Link>

					{user ? (
						<div className="right">
							<UserInfo>{user.username} 님</UserInfo>
							<Button onClick={onLogout}>로그아웃</Button>
						</div>
					) : (
						<div className="right">
							<Button to="/login">Login</Button>
						</div>
					)}
				</Wrapper>
			</HeaderBlock>

			<Spacer />
		</>
	);
};

export default Header;
