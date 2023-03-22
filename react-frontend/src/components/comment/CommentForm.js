import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
		comment: '',
		showInput: false
		};
	}

	render() {
		if (this.props.parentId == null || this.state.showInput) {
			const placeholderText = this.props.parentId != null ? '답글을 입력하세요' : '댓글을 입력하세요';
			const cancelButton = this.props.parentId != null ? true : false
			let button;

			if (cancelButton) {
				button = <Button onClick={() => this.setState({ showInput: false })}>
					&nbsp;&nbsp;&nbsp;취소
				</Button>
			} else {
				button = null;
			}
			return (
				<form onSubmit={this.handleSubmit.bind(this)}>
				<input
					type="text"
					placeholder={placeholderText}
					value={this.state.comment}
					onChange={this.handleInputChange.bind(this)}
				/>
				<Button type="submit">등록</Button>
					{button}
				</form>
			);
			} else {
			if (this.props.reply) {
				return null
			}
			return (
				<Button onClick={() => this.setState({ showInput: true })}>
				&nbsp;&nbsp;&nbsp;답글 작성
				</Button>
			);
		}
	}

	handleInputChange(event) {
		this.setState({ comment: event.target.value });
	}

	handleSubmit(event) {
		console.log("handleSubmit " + this.state.comment)
		event.preventDefault();
		this.props.addComment(this.state.comment, this.props.parentId);
		this.setState({ comment: '', showInput: false });
	}
}

export default CommentForm;
