import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import CommentInput from '../comments/CommentInput';
import Button from '../../components/common/Button';
import CommentsList from '../comments/CommentsList';

const CommentsViewerBlock = styled(Responsive)`
	margin-top: 2rem;
	display: flex;
	flex-direction: column;

	h1 {
		margin-bottom: 2rem;
		font-family: lobster;
		font-size: 1.2rem;
	}
`;

const CommentInputBar = styled(Responsive)`
	display: flex;
	justify-content: center;
	padding-bottom: 3rem;
	width: 100%;
`;

const CommentButtonBlock = styled.div`
	button {
		min-width: 4rem;
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
`;

const CommentsViewer = ({ loading, user, body, onChangeCommentInput, onChangeParentInput, onWriteComment, comments, onToggleAskRemove }) => {
	return (
		<CommentsViewerBlock>
			<h1>Comment</h1>
			<CommentInputBar>
				<CommentInput onChangeCommentInput={onChangeCommentInput} body={body} />

				<CommentButtonBlock>
					<Button onClick={onWriteComment}>댓글</Button>
				</CommentButtonBlock>
			</CommentInputBar>

			<CommentsList user={user} comments={comments} loading={loading} onToggleAskRemove={onToggleAskRemove} onChangeCommentInput={onChangeCommentInput} onChangeParentInput={onChangeParentInput} body={body} onWriteComment={onWriteComment} />
		</CommentsViewerBlock>
	);
};

export default CommentsViewer;
