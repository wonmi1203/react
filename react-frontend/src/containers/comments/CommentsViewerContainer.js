import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommentsViewer from '../../components/comments/CommentsViewer';
import {
    changeInput,
    changeInputparent,
    writeComment,
    toggleAskRemove,
} from '../../modules/comments';
import {
    listComments,
    removeComment,
    cancelRemoveComment,
} from '../../modules/comments';
import AskModal from '../../components/common/AskModal';

const CommentsViewerContainer = ({ match, history }) => {
    const { postId } = match.params;
    const dispatch = useDispatch();
    const { user, body, parent, comments, commentId, askRemove, loading } = useSelector(
        ({ user, comments, loading }) => ({
            body: comments.body,
            parent : comments.parent,
            comments: comments.comments,
            commentId: comments.removeComment.commentId,
            askRemove: comments.askRemove,
            loading: loading['comments/LIST_COMMENTS'],
            user: user.user,
        }),
    );
    useEffect(() => {
        // console.log(match);
        dispatch(listComments(postId));
    }, [dispatch, postId]);

    const onChangeCommentInput = useCallback(
        (body) => dispatch(changeInput(body)),
        [dispatch],
    );

    const onChangeParentInput = useCallback(
        (parent) => dispatch(changeInputparent(parent)),
        [dispatch],
    );

    const onWriteComment = useCallback(() => {
        dispatch(writeComment(postId, body, parent));
    }, [dispatch, postId, body, parent]);

    const onToggleAskRemove = useCallback(
        (commentId) => {
            dispatch(toggleAskRemove(commentId));
        },
        [dispatch],
    );

    const onCancelRemoveComment = () => {
        dispatch(cancelRemoveComment());
    };

    const onConfirmRemove = useCallback(() => {
        dispatch(removeComment(postId, commentId));
    }, [dispatch, postId, commentId]);

    return (
        <>
            <CommentsViewer
                loading={loading}
                user={user}
                body={body}
                onChangeCommentInput={onChangeCommentInput}
                onChangeParentInput={onChangeParentInput}
                onWriteComment={onWriteComment}
                comments={comments}
                onToggleAskRemove={onToggleAskRemove}
            />
            <AskModal
                title="댓글 삭제"
                description="이 댓글을 정말로 삭제하시겠습니까?"
                confirmText="삭제하기"
                cancelText="취소"
                onConfirm={onConfirmRemove}
                onCancel={onCancelRemoveComment}
                visible={askRemove}
            />
        </>
    );
};

export default withRouter(CommentsViewerContainer);