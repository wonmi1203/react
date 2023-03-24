import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import queryString from 'query-string';

const PostListBlock = styled(Responsive)`
	margin-top: 3rem;
	padding-bottom: 10rem;
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
let search = queryString.parse(window.location.search);

if (search) {
	search = search.search;
}

const PostItem = ({ post }) => {
	const { publishedDate, user, tags, title, body, _id } = post;

	return (
		<PostItemBlock>
			<h2>
				<Link to={`/@${user.username}/${_id}`}>{title}</Link>
			</h2>
			<SubInfo username={user.username} publishedDate={new Date(publishedDate)} />
			<Tags tags={tags} />
			<p>{body}</p>
		</PostItemBlock>
	);
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
	const [items, setItems] = useState(posts?.slice(0, 3) || []); // 먼저 보여줄 데이터 갯수
	const [hasMore, setHasMore] = useState(posts?.length > 3); // 더 가져올 데이터 갯수

	useEffect(() => {
		if (posts) {
			setItems(posts.slice(0, 3));
			setHasMore(posts.length > 3);
		}
	}, [posts]);

	const fetchMoreData = () => {
		if (!posts) return;

		setTimeout(() => {
			const startIndex = items.length;
			let newItems = [];
			if (posts.length - startIndex <= 3) {
				// 남은 데이터가 3개 미만인 경우, 남은 모든 데이터를 가져옴
				newItems = posts.slice(startIndex, posts.length);
				setHasMore(false);
			} else {
				// 아직 더 가져올 데이터가 있는 경우
				newItems = posts.slice(startIndex, startIndex + 3);
				setHasMore(true);
			}
			setItems((prevItems) => [...prevItems, ...newItems]);
		}, 500);
	};


	if (error) {
		return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
	}

	if (!loading && !Array.isArray(posts)) {
		return <PostListBlock>게시글이 없습니다.</PostListBlock>;
	}

	return (
		<PostListBlock>
			<WritePostButtonWrapper>
				{showWriteButton && (
					<Button cyan to="/write">작성하기</Button>
				)}
			</WritePostButtonWrapper>

			{!loading && Array.isArray(posts) && (
				<InfiniteScroll
					style={{ overflow: 'hidden' }}
					dataLength={items.length} // 데이터 길이
					next={fetchMoreData} // 바닥에 도닥했을때 호출하는 함수
					hasMore={hasMore} // 바닥에 도달시 함수 호출 여부
					loader={<h4>Loading...</h4>} // 로더 구성요소
				>
					{items.map((item, index) => (
						<PostItem post={posts[index]} key={posts[index]._id} />
					))}
				</InfiniteScroll>
			)}

			{items.length === 0 && <PostListBlock>게시글이 없습니다.</PostListBlock>}
		</PostListBlock>
	);
};

export default PostList;
