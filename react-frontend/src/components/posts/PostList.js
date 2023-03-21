import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const PostListBlock = styled(Responsive)`
	margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 3rem;

	a {
		font-weight: 400;
	}
`;

const PostItemBlock = styled.div`
	padding-top: 3rem;
	padding-bottom: 3rem;

	&:first-child {
		padding-top: 0;
	}

	& + & {
		border-top: 1px dashed ${palette.violet[2]};
	}

	h2 {
		font-size: 1.6rem;
		margin-bottom: 0;
		margin-top: 0;

		&:hover {
			color: ${palette.gray[6]};
		}
	}

	p {
		margin-top: 2rem;
		font-size: 1rem;
	}
`;

const PostItem = ({ post }) => {
	const { publishedDate, user, tags, title, body, _id } = post;

	return (
		<PostItemBlock>
			<h2>
			<Link to={`/@${user.username}/${_id}`}>{title}</Link>
			</h2>
			<SubInfo
			username={user.username}
			publishedDate={new Date(publishedDate)}
			/>
			<Tags tags={tags} />
			<p>{body}</p>
		</PostItemBlock>
	);
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
	const [items, setItems] = useState(Array.from({ length: 3 }, (_, i) => i)); // 먼저 보여줄 데이터 갯수
	const [hasMore, setHasMore] = useState(true);

	const fetchMoreData = () => {
		setTimeout(() => {
			const startIndex = items.length;
			const newItems = posts.slice(startIndex, startIndex + 3); // 더 가져올 데이터 갯수

			if (newItems.length === 0) {
				setHasMore(false);
			} else {
				setItems(prevItems => [...prevItems, ...newItems]);
			}
		}, 500);
	};

	if (error) {
		return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
	}

	return (
		<PostListBlock>
			<WritePostButtonWrapper>
				{showWriteButton && (
					<Button cyan to="/write">
						작성하기
					</Button>
				)}
			</WritePostButtonWrapper>

			{!loading && posts && (
				<InfiniteScroll
					style={{ overflow: 'hidden' }}
					dataLength = {items.length} // 데이터 길이
					next = {fetchMoreData} // 바닥에 도닥했을때 호출하는 함수
					hasMore = {hasMore} // 바닥에 도달시 함수 호출 여부
					loader = {<h4>Loading...</h4>} // 로더 구성요소
				>
					{items.map((item, index) => (
						<PostItem post={posts[index]} key={posts[index]._id} />
					))}
				</InfiniteScroll>
			)}
		</PostListBlock>
	);
};

export default PostList;
