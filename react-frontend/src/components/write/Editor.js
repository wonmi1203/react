import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';

const EditorBlock = styled(Responsive)`
	padding-top: 5rem;
	padding-bottom: 7rem;

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: 2rem;

		h4 {
			font-family: lobster;
			font-size: 1.5rem;
		}
	}

	`;

const TitleInput = styled.input`
	width: 92%;
	font-size: 1.1rem;
	outline: none;
	padding: 0.8rem 1rem;
	border: none;
	border-bottom: 1px solid ${palette.gray[9]};
`;

const QuillWrapper = styled.div`
	.ql-editor {
		min-height: 400px;
		padding: 0;
		font-size: 1rem;
	}
	.ql-editor.ql-blank::before {
		left: 0px;
	}
`;

const Editor = ({ title, body, onChangeField }) => {
  const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null); // Quill 인스턴스를 설정

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요...',
      modules: {
        // 더 많은 옵션
        // https://quilljs.com/docs/modules/toolbar/ 참고
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });

    // quill에 text-change 이벤트 핸들러 등록
    // 참고: https://quilljs.com/docs/api/#events
    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  const onChangeTitle = e => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    	<EditorBlock>
			<div className='title'>
				<h4>Title</h4>
				<TitleInput
					placeholder="제목을 입력하세요"
					onChange={onChangeTitle}
					value={title}
				/>
			</div>
		<QuillWrapper>
			<div ref={quillElement} />
		</QuillWrapper>
		</EditorBlock>
  	);
};

export default Editor;
