import React, { Component } from 'react';
import styled from 'styled-components';

const SearchBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	width: 1024px;
	margin: 0 auto;
	padding: 2rem;

	.search_input {
		width: 500px;
		height: 3rem;
		padding: 0 0.5rem;
		border: none;
		border-bottom: 1px solid #000;
		outline: none;
	}

	.serach_submit {
		margin-left: 0.5rem;
		font-weight: 400;
	}
`;

class SearchBar extends Component {
	constructor(props) {
		super(props)
	}
	render() {

		return (
			<SearchBlock>
				<form>
					<input type='text' maxLength='20' className='search_input' name='search' placeholder='검색어를 입력해주세요.' />
					<input type='submit' value='검색' className='serach_submit' />
				</form>
			</SearchBlock>
		);
	}
}

export default SearchBar;

