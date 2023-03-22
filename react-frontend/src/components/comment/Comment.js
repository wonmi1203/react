import React, { Component } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  render() {
    return (
      <div>
        <h2>댓글 목록</h2>
        <CommentList comments={this.state.comments} addComment={this.addComment.bind(this)} />
        <CommentForm parentId={null} addComment={this.addComment.bind(this)} />
      </div>
    );
  }

  addComment(comment, parentId) {
    const comments = this.state.comments.slice();
    const newComment = {
      id: comments.length,
      text: comment,
      parentId: parentId
    };
    comments.push(newComment);
    this.setState({ comments: comments });
    comments.map((comment) => {
      console.log(comment)
    });
  }
}

export default Comment;