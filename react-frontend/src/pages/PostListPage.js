import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import SearchBar from '../components/posts/SearchBar';

const PostListPage = () => {
	return (
		<>
			<HeaderContainer />
			<SearchBar />
			<PostListContainer />
		</>
	);
};

export default PostListPage;
