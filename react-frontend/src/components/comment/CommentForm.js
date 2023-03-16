import React, { Component } from 'react';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          placeholder="댓글을 입력하세요..."
          value={this.state.comment}
          onChange={this.handleInputChange.bind(this)}
        />
        <button type="submit">등록</button>
      </form>
    );
  }

  handleInputChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addComment(this.state.comment);
    this.setState({ comment: '' });
  }
}

export default CommentForm;