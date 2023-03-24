import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import palette from '../../lib/styles/palette';

const SubInfoBlock = styled(Responsive)`
	${props =>
		props.hasMarginTop &&
		css`
			margin-top: 1rem;
	`}
	width: 100%;
	text-align: right;
	font-size: 15px;
	color: ${palette.gray[6]};

	span + span:before {
		color: ${palette.gray[4]};
		padding-left: 0.25rem;
		padding-right: 0.25rem;
		content: '\\B7';
	}

	@media (max-width: 768px) {
		margin: 0.5rem 0;
		text-align: left;
		padding-left: 0;
	}
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
	return (
		<SubInfoBlock hasMarginTop={hasMarginTop}>
			<span>
				<b>
				<Link to={`/@${username}`}>{username} 님</Link>
				</b>
			</span>

			<span>{new Date(publishedDate).toLocaleDateString()}</span>
		</SubInfoBlock>
	);
};

export default SubInfo;
