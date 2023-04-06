import React from 'react';
import styled from 'styled-components';

const StyledCommentInput = styled.input`
	width: 90%;
	height: 2.5rem;
	margin-right: 0.5rem;
	border-radius: 5rem;
	border: 0.5px solid #d0bfff;
	padding: 0 1rem;
	outline: none;
`;

const CommentInput = ({ onChangeCommentInput, body }) => {
	const onChange = (e) => onChangeCommentInput(e.target.value);
	return (
		<>
			<StyledCommentInput
				value={body}
				onChange={onChange}
				placeholder="댓글을 입력하세요"
				rows={2}
				maxRows={20}
			/>
		</>
	);
};

export default CommentInput;
