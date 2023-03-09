import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import Responsive from '../common/Responsive';

// 회원가입 / 로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다.

// 화면 전체를 채움
const AuthTemplateBlock = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background: ${palette.gray[2]};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

// 흰색 박스
const WhiteBox = styled(Responsive)`
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	padding: 3rem 2rem;
	width: 360px;
	border-radius: 30px;
	background: #fff;

	.logo-area {
		display: block;
		padding-bottom: 2rem;
		text-align: center;
		font-weight: bold;
		letter-spacing: 2px;

		a {
			font-family: lobster;
			font-size: 1.5rem;
			color: #845ef7;
		}
	}

	@media (max-width: 768px) {
		width: 80%;
		padding: 2rem 1.5rem;
	}
`;

const AuthTemplate = ({ children }) => {
	return (
		<AuthTemplateBlock>
			<WhiteBox>
				<div className="logo-area">
					<Link to="/">REACT</Link>
				</div>

				{children}
			</WhiteBox>
		</AuthTemplateBlock>
	);
};

export default AuthTemplate;
