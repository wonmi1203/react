import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagBoxBlock = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	width: 100%;
	border-top: 1px solid ${palette.gray[2]};
	padding-top: 2rem;

	h4 {
		font-family: lobster;
		font-size: 1.5rem;
		margin: 0;
		margin-right: 1.5rem;
		color: ${palette.gray[8]}
	}
`;

const TagForm = styled.form`
	border-radius: 4px;
	overflow: hidden;
	display: flex;
	width: 300px;
	height: 40px;
	border-bottom: 1px solid ${palette.gray[9]}; /* 스타일 초기화 */
	border-radius: 0;

	input,
	button {
		outline: none;
		border: none;
		font-size: 1rem;
	}

	input {
		padding: 0.5rem;
		flex: 1;
	}

	button {
		cursor: pointer;
		width: 4rem;
		border: none;
		border-radius: 10px 10px 0 0;
		background: ${palette.gray[8]};
		color: white;
		font-weight: 400;

		&:hover {
			background: ${palette.gray[6]};
		}
	}
`;

const Tag = styled.div`
	margin-right: 1rem;
	color: ${palette.gray[6]};
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
`;

const TagListBlock = styled.div`
	display: flex;
	width: 100%;
	font-size: 1rem;
	margin-top: 1rem;
`;

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({ tag, onRemove, onChangeTags }) => (
	<Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const TagList = React.memo(({ tags, onRemove }) => (
	<TagListBlock>
		{tags.map(tag => (
			<TagItem key={tag} tag={tag} onRemove={onRemove} />
		))}
	</TagListBlock>
));

const TagBox = ({ tags, onChangeTags }) => {
	const [input, setInput] = useState('');
	const [localTags, setLocalTags] = useState([]);

	const insertTag = useCallback(
		tag => {
		if (!tag) return; // 공백이라면 추가하지 않음
		if (localTags.includes(tag)) return; // 이미 존재한다면 추가하지 않음
		const nextTags = [...localTags, tag];
			setLocalTags(nextTags);
			onChangeTags(nextTags);
		},
		[localTags, onChangeTags],
	);

	const onRemove = useCallback(
		tag => {
			const nextTags = localTags.filter(t => t !== tag);
			setLocalTags(nextTags);
			onChangeTags(nextTags);
		},
		[localTags, onChangeTags],
	);

	const onChange = useCallback(e => {
		setInput(e.target.value);
	}, []);

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			insertTag(input.trim()); // 앞뒤 공백 없앤 후 등록
			setInput(''); // input 초기화
		},
		[input, insertTag],
	);

	// tags 값이 바뀔 때
	useEffect(() => {
		setLocalTags(tags);
	}, [tags]);

	return (
		<TagBoxBlock>
			<h4>Tag</h4>

			<TagForm onSubmit={onSubmit}>
				<input
				placeholder="태그를 입력하세요"
				value={input}
				onChange={onChange}
				/>
				<button type="submit">추가</button>
			</TagForm>

			<TagList tags={localTags} onRemove={onRemove} />
		</TagBoxBlock>
	);
};

export default TagBox;
