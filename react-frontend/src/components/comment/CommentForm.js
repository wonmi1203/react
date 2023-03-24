import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const CommentInput = styled(Responsive)`
	width: 100%;

	form {
		display: flex;
		justify-content: space-between;
		align-itmes: center;

		input {
			width: 100%;
			height: 2.5rem;
			border-radius: 5rem;
			border: 0.5px solid ${palette.violet[2]};
			padding: 0 1rem;
			outline: none;
		}

		button {
			min-width: 4rem;
			height: 2.5rem;
			margin-left: 0.5rem;
			border-radius: 5rem;
			font-weight: 400;
		}
	}
`;

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
				button =
				<Button onClick={() => this.setState({ showInput: false })}>
					취소
				</Button>
			} else {
				button = null;
			}
			return (
				<CommentInput>
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
				</CommentInput>
			);
		} else {
			if (this.props.reply) {
				return null
			}

			return (
				<Button onClick={() => this.setState({ showInput: true })}>
					답글 작성
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
