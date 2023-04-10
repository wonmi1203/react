import React, { useState } from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';
import Button from '../common/Button';

const CommentsListBlock = styled(Responsive)`
	margin-bottom: 10rem;
`;

const CommentItemBlock = styled.div`
	min-height: 130px;
	padding-top: 1rem;
	padding-bottom: 2rem;
	border-bottom: 1px solid ${palette.gray[2]};

	p {
		margin-top: 1rem;
		word-wrap: break-word;
	}

	.recmmtForm {
		display: flex;
		width: 100%;
		margin-top: 1rem;

		input {
			width: 60%;
			height: 2.5rem;
			margin-right: 0.5rem;
			border-radius: 5rem;
			border: 0.5px solid #d0bfff;
			padding: 0 1rem;
			outline: none;
			font-size: 0.9rem;
		}

		Button {
			border-radius: 5rem;
			font-weight: 400;
		}
	}
`;

const CommentActionButtonsBlock = styled.div`
	display: flex;
	justify-content: flex-end;
	min-width: 5.5rem;
	margin-top: 0.5rem;
	margin-right: 17px;
`;

const ActionButton = styled.span`
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	color: ${palette.gray[6]};
	font-weight: bold;
	border: none;
	outline: none;
	font-size: 0.875rem;
	cursor: pointer;
	background: ${palette.gray[1]};
	color: ${palette.cyan[7]};

	& + & {
		margin-left: 0.25rem;
	}
`;

const CommentItem = ({ user, comment, onToggleAskRemove, onChangeParentInput, onChangeCommentInput, body, onWriteComment }) => {
	const [replying, setReplying] = useState(false);

	const onClickReplyButton = () => {
		setReplying(true);
		onChangeParentInput(comment._id);
	};

	const onChange = (e) => onChangeCommentInput(e.target.value);

	return (
		<CommentItemBlock>
			<SubInfo username={comment.authorId.username} publishedDate={comment.createdAt} />
			{user && user._id === comment.authorId._id && (
				<CommentActionButtonsBlock>
					<ActionButton onClick={onClickReplyButton}>답글</ActionButton>
					<ActionButton onClick={() => onToggleAskRemove(comment._id)}>삭제</ActionButton>
				</CommentActionButtonsBlock>
			)}
			<p>{comment.body}</p>
			{replying && (
				<form onSubmit={onWriteComment} className='recmmtForm'>
					<input
						value={body}
						onChange={onChange}
						placeholder={`${comment.authorId.username}님에게 답글 남기기`}
					/>
					<Button type="submit">등록</Button>
				</form>
			)}
		</CommentItemBlock>
	);
};

const CommentsList = ({ loading, user, comments, onToggleAskRemove, onChangeParentInput, onChangeCommentInput, body, onWriteComment }) => {
	return (
		<CommentsListBlock>
			<div>
				{!loading && comments && (
				<div>
					{comments.map(comment => (
					<CommentItem user={user} comment={comment} onToggleAskRemove={onToggleAskRemove} key={comment._id} onChangeParentInput={onChangeParentInput} onChangeCommentInput={onChangeCommentInput} body={body} onWriteComment={onWriteComment}/>
					))}
				</div>
				)}
			</div>
		</CommentsListBlock>
	);
};

export default CommentsList;
