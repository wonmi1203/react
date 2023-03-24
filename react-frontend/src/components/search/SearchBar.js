import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const SearchBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1024px;
	margin: 0 auto;
	padding: 2rem;

	#keyword {
		width: 500px;
		height: 2.54rem;
		padding: 0 1rem;
		border-radius: 5rem;
		border: 0.5px solid ${palette.violet[2]};
		outline: none;
	}

	.search {
		height: 2.5rem;
		margin-left: 0.5rem;
		border-radius: 5rem;
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
