import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const SearchBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	width: 1024px;
	margin: 0 auto;
	padding: 2rem;

	#keyword {
		width: 500px;
		height: 3rem;
		padding: 0 0.5rem;
		border: none;
		border-bottom: 1px solid #000;
		outline: none;
	}

	.search {
		margin-left: 0.5rem;
		font-weight: 400;
	}
`;

const SearchBar = ({ history }) => {
	const [keyword, setSearch] = useState('');

	const onChange = useCallback(e => {
		setSearch(e.target.value);
	}, []);

	const onSubmit = useCallback(
		e => {
			const searchKeyword = document.querySelector('#keyword').value;
			console.log(searchKeyword);
			//  history.push(`/search/${keyword}`);
			setSearch("");
		}, []);

	return (
		<SearchBlock>
			<input
				id="keyword"
				placeholder="검색어를 입력하세요"
				value={keyword}
				onChange={onChange}
			/>

			<Button
				type="button"
				className="search"
				onClick={onSubmit}
			>
				검색
			</Button>
		</SearchBlock>
	)
};

export default SearchBar;
