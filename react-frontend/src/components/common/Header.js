import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import Button from './Button';
import palette from '../../lib/styles/palette';
import MenuImg from '../../assets/img/menu.png';

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

	.gnb {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 75%;

		.right {
			display: flex;
			align-items: center;

			a, button {
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
	}

	.hamMenu {
		display: none;
	}


	@media (max-width: 768px) {
		.gnb {
			opacity: 0;

			&.active {
				opacity: 1;
				position: fixed;
				top: 0;
				right: 0;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				width: 90%;
				height: 80%;
				padding: 6rem 2rem;
				border-radius: 0 0 0 20px;
				background: #fff;
				box-sizing: border-box;
				box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

				a {
					width: 100%;
					margin-bottom: 1rem;
					text-align: left;
				}

				.right {
					a, button {
						width: auto;
						position: absolute;
						right: 2rem;
						bottom: 2rem;
					}
				}
			}
		}

		.hamMenu {
			z-index: 99;
			display: block;
		}
	}
`;

// 헤더가 fixed로 되어 있기 때문에 페이지의 컨텐츠가 4rem 아래 나타나도록 해주는 컴포넌트
const Spacer = styled.div`
	height: 4rem;
`;

const UserInfo = styled(Responsive)`
	width: auto;
	margin-right: 1rem;
	font-size: 1.1rem;

	@media (max-width: 768px) {
		z-index: 99;
		position: absolute;
		top: 1.1rem;
		right: 2rem;
		text-align: right;
	}
`;


const Header = ({ user, onLogout }) => {
	const [state, setState] = useState("");

	const toggleAccordion = () => {
		setState(state === "" ? "active" : "");
	}

	return (
		<>
			<HeaderBlock>
				<Wrapper>
					<Link to="/" className="logo">
						REACT
					</Link>

					<div className={`gnb ${state}`}>
						<Link to="/" className="menu">개요</Link>
						<Link to="/postlistpage" className="menu">방명록</Link>

						{user ? (
							<div className="right">
								<UserInfo>{user.username} 님</UserInfo>
								<Button onClick={onLogout}>Log out</Button>
							</div>
						) : (
							<div className="right">
								<Button to="/login">Login</Button>
							</div>
						)}
					</div>

					<button onClick={toggleAccordion} className="hamMenu">
						<img src={MenuImg} alt=""/>
					</button>
				</Wrapper>
			</HeaderBlock>

			<Spacer />
		</>
	);
};

export default Header;
