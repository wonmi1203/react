import React from 'react';
import CommentForm from './CommentForm';

const CommentList = (props) => {
  const comments = props.comments;
  const addComment = props.addComment;

  const getChildComments = (parentId) => {
    return comments.filter((comment) => comment.parentId === parentId);
  };

  const renderComments = (parentId) => {
    const childComments = getChildComments(parentId);
    if (childComments.length === 0) {
      return null;
    }
    return (
      <ul>
        {childComments.map((comment) => {
          return (
            <li key={comment.id}>
              <div>
                {"\u00A0ㄴ"}
                {comment.text}
              </div>
              <CommentForm parentId={comment.id} addComment={addComment} reply={true} />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      {comments.map((comment) => {
        if (comment.parentId === null) {
          return (
            <div key={comment.id}>
              {comment.text}
              <CommentForm parentId={comment.id} addComment={addComment} reply={false} />
              {renderComments(comment.id)}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default CommentList;