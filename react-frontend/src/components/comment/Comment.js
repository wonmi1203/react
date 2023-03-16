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
        <CommentList comments={this.state.comments} />
        <CommentForm addComment={this.addComment.bind(this)} />

      </div>
    );
  }

  addComment(comment) {
    const comments = this.state.comments.slice();
    comments.push(comment);
    this.setState({ comments: comments });
  }
}

export default Comment;