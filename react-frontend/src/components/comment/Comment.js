import React, { Component } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import styled from 'styled-components';

const CommentBlock = styled.div`
	width: 100%;
	padding: 2rem;

	h2 {
		font-family: lobster;
		font-size: 1.1rem;
		margin-bottom: 2rem;
	}
`

class Comment extends Component {
	constructor(props) {
		super(props);
			this.state = {
			comments: []
		};
	}

	render() {
		return (
			<CommentBlock>
				<h2>Comment</h2>
				<CommentList comments={this.state.comments} addComment={this.addComment.bind(this)} />
				<CommentForm parentId={null} addComment={this.addComment.bind(this)} />
			</CommentBlock>
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
