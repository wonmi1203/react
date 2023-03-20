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
	const [items, setItems] = useState(Array.from({ length: 1 }, (_, i) => i));

	const fetchMoreData = () => {
		setTimeout(() => {
			setItems(prevItems => [...prevItems, ...Array.from({ length: 1 }, (_, i) => prevItems.length + i)]);
		}, 1500);
	};

	// 에러 발생 시
	if (error) {
		return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
	}

	if (!loading && posts) {
		console.log(posts.length);
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

			{/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
			{!loading && posts && (
				<InfiniteScroll
					dataLength = {posts.length}
					next = {fetchMoreData}
					hasMore = {true}
					loader = {<h4>Loading...</h4>}
				>
					{items.map(item => (
						<div key={item}>
							{posts.map(post => (
								<PostItem post={post} key={post._id} />
							))}
						</div>
					))}
				</InfiniteScroll>
			)}
		</PostListBlock>
	);
};

export default PostList;
