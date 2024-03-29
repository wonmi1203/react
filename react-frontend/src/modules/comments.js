import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
	createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as commentAPI from '../lib/api/comments';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화

const CHANGE_INPUT = 'comment/CHANGE_INPUT';
const CHANGE_INPUT_PARENT = 'comment/CHANGE_INPUT_PARENT';

const [
	WRITE_COMMENT,
	WRITE_COMMENT_SUCCESS,
	WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('comment/WRITE_COMMENT');

const [
	LIST_COMMENT,
	LIST_COMMENT_SUCCESS,
	LIST_COMMENT_FAILURE,
] = createRequestActionTypes('comment/LIST_COMMENT');

const TOGGLE_ASK_REMOVE = 'comment/TOGGLE_ASK_REMOVE';

const [
	REMOVE_COMMENT,
	REMOVE_COMMENT_SUCCESS,
	REMOVE_COMMENT_FAILURE,
] = createRequestActionTypes('comment/REMOVE_COMMENT');

const CANCEL_REMOVE_COMMENT = 'comment/CANCEL_REMOVE_COMMENT';


export const changeInput = createAction(CHANGE_INPUT, (body) => body);
export const changeInputparent = createAction(CHANGE_INPUT_PARENT, (parent) => parent);
export const writeComment = createAction(WRITE_COMMENT, (postId, body, parent) => ({
	postId,
	body,
	parent
}));

export const toggleAskRemove = createAction(TOGGLE_ASK_REMOVE);

export const listComments = createAction(LIST_COMMENT, (postId) => postId);

export const removeComment = createAction(
	REMOVE_COMMENT,
	(postId, commentId) => ({ postId, commentId }),
);
export const cancelRemoveComment = createAction(CANCEL_REMOVE_COMMENT);

const writeCommentSaga = createRequestSaga(
	WRITE_COMMENT,
	commentAPI.writeComment,
);

const listCommentSaga = createRequestSaga(
	LIST_COMMENT,
	commentAPI.listComments,
);

const removeCommentSaga = createRequestSaga(
	REMOVE_COMMENT,
	commentAPI.removeComment,
);

export function* CommentsSaga() {
	yield takeLatest(WRITE_COMMENT, writeCommentSaga);
	yield takeLatest(LIST_COMMENT, listCommentSaga);
	yield takeLatest(REMOVE_COMMENT, removeCommentSaga);
}

const initialState = {
	body: '',
	comments: null,
	commentError: null,
	askRemove: false,
	removeComment: {
		commentId: null,
		// visible: false,
	},
};

const comments = handleActions(
	{
		[INITIALIZE]: (state) => initialState,
		[CHANGE_INPUT]: (state, { payload: body }) => ({
			...state,
			body: body,
		}),
		[CHANGE_INPUT_PARENT]: (state, { payload: parent }) => ({
			...state,
			parent: parent,
		}),
		[WRITE_COMMENT]: (state) => ({
			// comments와 commentError를 초기화
			...state,
			body: '',
			commentError: null,
		}),
		// 댓글 작성 성공
		[WRITE_COMMENT_SUCCESS]: (state, { payload: comments }) => ({
			...state,
			comments: comments,
			commentError: null,
		}),
		// 댓글 작성 실패
		[WRITE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
			...state,
			commentError,
		}),
		[LIST_COMMENT_SUCCESS]: (state, { payload: comments }) => ({
			...state,
			comments,
		}),
		[LIST_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
			...state,
			commentError,
		}),
		[TOGGLE_ASK_REMOVE]: (state, { payload: commentId }) => ({
			...state,
			askRemove: !state.askRemove,
			removeComment: {
				commentId: commentId,
			},
		}),
		[REMOVE_COMMENT]: (state) => ({
			...state,
			askRemove: !state.askRemove,
		}),
		[REMOVE_COMMENT_SUCCESS]: (state, { payload: comments }) => ({
			...state,
			comments: comments,
		}),
		[REMOVE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
			...state,
			commentError,
		}),
		[CANCEL_REMOVE_COMMENT]: (state) => ({
			...state,
			askRemove: !state.askRemove,
			removeComment: {
				commentId: null,
			},
		})
	},
	initialState,
);

export default comments;