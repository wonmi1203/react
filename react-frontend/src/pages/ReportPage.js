import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 70px 0;
	text-align-last : center;

	li {
		margin-bottom: 70px;

		h1 {
			font-family: lobster;
			font-size: 25px;
			color: #9775fa;
		}

		p {
			font-size: 16px;
		}
	}
`;

const url = "https://github.com/wonmi1203/react.git"

const ReportPage = () => {
	return (
		<>
			<Helmet>
				<title>프로젝트 개요</title>
			</Helmet>
			<HeaderContainer />
			<Wrapper>
				<ul>
					<li>
						<h1 id="-프로젝트-기간">Project Period</h1>
						<p>2023년 2월 09일 ~ 3월 09일 (총 4주)</p>
					</li>

					<li>
						<h1 id="-프로젝트-깃허브-주소">GitHub URL</h1>
						<p><a href="#" onClick={() => { window.open(url) }}>https://github.com/wonmi1203/react.git</a></p>
					</li>

					<li>
						<h1>Technology</h1>
						<p>인프라 ▶ AWS
							<br />DB ▶ MONGODB
							<br />그 외 ▼ ▼ ▼<br />
							Node.js / React / EXPRESS / sass / + @
						</p>
					</li>

					<li>
						<h1>And..</h1>
						<p><strong>너무 힘들다...🏃🏃🏃🏃</strong></p>
					</li>
				</ul>
			</Wrapper>
		</>
	);
};

export default ReportPage;
