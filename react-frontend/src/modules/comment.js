import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
	createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as commentAPI from '../lib/api/comment';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'comment/INITIALIZE'; // 모든 내용 초기화

const [
	WRITE_COMMENT,
	WRITE_COMMENT_SUCCESS,
	WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('comment/WRITE_COMMENT'); // 포스트 작성

export const initialize = createAction(INITIALIZE);

export const writeComment = createAction(WRITE_COMMENT, ({ postId, parentId, comment, username }) => ({
	postId, 
    parentId, 
    comment, 
    username
}));

// saga 생성
const writeCommentSaga = createRequestSaga(WRITE_COMMENT, commentAPI.writeComment);

export function* commentSaga() {
	yield takeLatest(WRITE_COMMENT, writeCommentSaga);
}

const initialState = {
	postId: '',
    parrent: '',
	body: '',
    username: '',
	post: null,
	postError: null,
};

const comment = handleActions(
	{
		[INITIALIZE]: state => initialState, // initialState를 넣으면 초기상태로 바뀜
		[WRITE_COMMENT]: state => ({
			...state,
			// post와 postError를 초기화
			post: null,
			postError: null,
		}),
		// 포스트 작성 성공
		[WRITE_COMMENT_SUCCESS]: (state, { payload: post }) => ({
			...state,
			post,
		}),
		// 포스트 작성 실패
		[WRITE_COMMENT_FAILURE]: (state, { payload: postError }) => ({
			...state,
			postError,
		}),
	},
	initialState,
);

export default comment;
