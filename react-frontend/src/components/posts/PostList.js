import React, { useState, useEffect } from 'react'; // useState, useEffect 사용
import styled from 'styled-components'; // css style 사용
import Responsive from '../common/Responsive'; // 반응형 사용
import Button from '../common/Button'; // 공통 button Component
import palette from '../../lib/styles/palette'; // 공통 색상 Component
import SubInfo from '../common/SubInfo'; // 공통 사용자 정보 레이아웃 Component
import Tags from '../common/Tags';  // 해시태그 레이아웃 Component
import { Link } from 'react-router-dom'; // link tag 사용
import InfiniteScroll from 'react-infinite-scroll-component'; // 인피니티 스크롤 사용
import queryString from 'query-string'; // queryString 받아오기

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

let search = queryString.parse(window.location.search); // 현 페이지 url에서 쿼리 문자열 추출

if (search) { // search 값이 true 일때
	search = search.search; // search 변수에 search 값 재할당
}

const PostItem = ({ post }) => {
	const { publishedDate, user, tags, title, body, _id } = post;

	return (
		<PostItemBlock>
			<h2>
				{/* 글 제목 */}
				<Link to={`/@${user.username}/${_id}`}>{title}</Link>
			</h2>
			{/* 사용자 정보 컴포넌트 */}
			<SubInfo username={user.username} publishedDate={new Date(publishedDate)} />
			{/* 해시태그 컴포넌트 */}
			<Tags tags={tags} />
			{/* 글 내용 */}
			<p>{body}</p>
		</PostItemBlock>
	);
};

const PostList = ({ posts, loading, error, showWriteButton }) => {
	const [items, setItems] = useState(posts?.slice(0, 3) || []); // 먼저 보여줄 데이터 갯수, 데이터가 3개이상일 경우 보내고 그렇지 않다면 빈배열 넘겨줌.
	const [hasMore, setHasMore] = useState(posts?.length > 3); // 데이터가 3보다 크면 true.

	useEffect(() => { // 데이터가 변경되면 아래가 실행됨
		if (posts) {
			setItems(posts.slice(0, 3)); // 3번째 까지 자름
			setHasMore(posts.length > 3); // 3보다 큰지 확인
		}
	}, [posts]);

	const fetchMoreData = () => {
		if (!posts) return; // 데이터가 존재하지 않으면 함수 중단

		setTimeout(() => {
			const startIndex = items.length;
			let newItems = [];
			if (posts.length - startIndex <= 3) {
				// 남은 데이터가 3개 미만인 경우, 남은 모든 데이터를 가져옴
				newItems = posts.slice(startIndex, posts.length);
				setHasMore(false); // 데이터 더 가져오지 않기
			} else {
				// 아직 더 가져올 데이터가 있는 경우
				newItems = posts.slice(startIndex, startIndex + 3);
				setHasMore(true); // 데이터 더 가져오기
			}
			setItems((prevItems) => [...prevItems, ...newItems]); // 이전것과 새로운것을 합쳐 배열 생성
		}, 500); // 0.5초 뒤 실행
	};


	if (error) { // 에러 발생시 실행
		return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
	}

	if (!loading && !Array.isArray(posts)) { // 로딩중이 아니고 post 데이터가 없으면 실행
		return <PostListBlock>게시글이 없습니다.</PostListBlock>;
	}

	return (
		<PostListBlock>
			<WritePostButtonWrapper>
				{showWriteButton && (
					<Button cyan to="/write">작성하기</Button>
				)}
			</WritePostButtonWrapper>

			{!loading && Array.isArray(posts) && ( // 로딩중이 아니고 posts 데이터가 있으면 실행
				<InfiniteScroll
					style = {{ overflow: 'hidden' }}
					dataLength = {items.length} // 데이터 길이
					next = {fetchMoreData} // 바닥에 도닥했을때 호출하는 함수
					hasMore = {hasMore} // 바닥에 도달시 함수 호출 여부
					loader = {<h4>Loading...</h4>} // 로더 구성요소
				>
					{items.map((item, index) => ( // 데이터 길이만큼 실행
						<PostItem post={posts[index]} key={posts[index]._id} />
					))}
				</InfiniteScroll>
			)}

			{/* items 가 0개면 게시글 없습니다 노출 */}
			{items.length === 0 && <PostListBlock>게시글이 없습니다.</PostListBlock>}
		</PostListBlock>
	);
};

export default PostList;
