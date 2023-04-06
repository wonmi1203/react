import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import SubInfo from '../common/SubInfo';

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

	.infoList {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 2rem;
	}
`;

const CommentActionButtonsBlock = styled.div`
	display: flex;
	justify-content: flex-end;
	min-width: 5.5rem;
	margin-right:17px;
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

const CommentItem = ({ user, comment, onToggleAskRemove }) => {
	return (
		<CommentItemBlock>
			<div className='infoList'>
				<SubInfo
					username={comment.authorId.username}
					publishedDate={comment.createdAt}
				/>

				{user && user._id === comment.authorId._id && (
					<CommentActionButtonsBlock>
						<ActionButton>답글</ActionButton>
						<ActionButton onClick={() => onToggleAskRemove(comment._id)}>삭제</ActionButton>
					</CommentActionButtonsBlock>
				)}
			</div>

			<p>{comment.body}</p>
		</CommentItemBlock>
	);
};

const CommentsList = ({ loading, user, comments, onToggleAskRemove }) => {
	return (
		<CommentsListBlock>
			<div>
				{!loading && comments && (
				<div>
					{comments.map(comment => (
					<CommentItem user={user} comment={comment} onToggleAskRemove={onToggleAskRemove} key={comment._id} />
					))}
				</div>
				)}
			</div>
		</CommentsListBlock>
	);
};

export default CommentsList;
