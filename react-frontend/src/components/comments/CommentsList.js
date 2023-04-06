import React, { useState } from 'react';
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
        <form onSubmit={onWriteComment}>
          <textarea
            value={body}
            onChange={onChange}
            placeholder={`${comment.authorId.username}님에게 답글 남기기`}
            style={{ width: '100%', height: '5rem', marginBottom: '1rem' }}
          />
          <button type="submit">등록</button>
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
