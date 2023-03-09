import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';

const PostViewerBlock = styled(Responsive)`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-top: 4rem;

	.listBtn {
		display: inline-block;
		margin-bottom: 3rem;
		font-weight: 400;
	}
`;

const PostHead = styled.div`
	width: 100%;
	margin-bottom: 3rem;
	padding-bottom: 3rem;
	border-bottom: 1px solid ${palette.gray[2]};

	h1 {
		font-size: 1.5rem;
		line-height: 1.5;
		margin: 0;
	}
`;

const PostContent = styled(Responsive)`
	font-size: 1rem;
	color: ${palette.gray[8]};
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
	// 에러 발생 시
	if (error) {
		if (error.response && error.response.status === 404) {
		return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
		}
		return <PostViewerBlock>오류 발생!</PostViewerBlock>;
	}

	// 로딩중이거나, 아직 포스트 데이터가 없을 시
	if (loading || !post) {
		return null;
	}
	const UserI = JSON.parse(localStorage.getItem('user'));

	const { title, body, user, publishedDate, tags } = post;
	return (
		<PostViewerBlock>
			<Helmet>
				<title>{title} - REACT</title>
			</Helmet>

			<Button cyan to="/postlistpage" className="listBtn">
				목록
			</Button>

			<PostHead>
				<h1>{title}</h1>

				<SubInfo
					username={user.username}
					publishedDate={publishedDate}
					hasMarginTop
				/>
				<Tags tags={tags} />
			</PostHead>

			{UserI.username === user.username && actionButtons}
			<PostContent dangerouslySetInnerHTML={{ __html: body }} />
		</PostViewerBlock>
	);
};

export default PostViewer;
