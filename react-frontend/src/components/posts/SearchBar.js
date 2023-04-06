import React, { Component } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const SearchBlock = styled(Responsive)`
	width: 100%;
	margin: 0 auto;
	padding-top: 5rem;

	form {
		display: flex;
		justify-content: center;
		align-items: center;

		.search_input {
			width: 500px;
			height: 2.5rem;
			margin-right: 0.5rem;
			border-radius: 5rem;
			border: 0.5px solid #d0bfff;
			padding: 0 1rem;
			outline: none;
		} 

		.serach_submit {
			height: 2.5rem;
			padding: 0.25rem 1rem;
			border-radius: 5rem;
			border: none;
			background: #9775fa;
			font-weight: 400;
			font-size: 1rem;
			color: #fff;
			outline: none;
			cursor: pointer;
		}
	}

	@media (max-width: 768px) {
		padding: 3rem 1rem;

		.search_input {
			width: 100%;
		}

		.serach_submit {
		}
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

