import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';
import SearchBar from '../components/search/SearchBar';

const PostListPage = () => {
	return (
		<>
			<HeaderContainer />
			<SearchBar />
			<PostListContainer />
			<PaginationContainer />
		</>
	);
};

export default PostListPage;
