import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import AskRemoveModal from './AskRemoveModal';

const PostActionButtonsBlock = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-top: 1rem;
`;

const ActionButton = styled.button`
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

const PostActionButtons = ({ onEdit, onRemove }) => {
	const [modal, setModal] = useState(false);
	const onRemoveClick = () => {
		setModal(true);
	};
	const onCancel = () => {
		setModal(false);
	};
	const onConfirm = () => {
		setModal(false);
		onRemove();
	};

	return (
		<>
			<PostActionButtonsBlock>
				<ActionButton onClick={onEdit}>수정</ActionButton>
				<ActionButton onClick={onRemoveClick}>삭제</ActionButton>
			</PostActionButtonsBlock>

			<AskRemoveModal
				visible={modal}
				onConfirm={onConfirm}
				onCancel={onCancel}
			/>
		</>
	);
};

export default PostActionButtons;
