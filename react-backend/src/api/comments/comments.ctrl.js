import Comment from '../../models/comment';
//import Joi from 'joi';
//import sanitizeHtml from 'sanitize-html';

export const write = async (ctx) => {
    const body = ctx.request.body.body;
    const comment = new Comment({
        postId: ctx.params.postId,
        authorId: ctx.state.user._id,
        parent: ctx.request.body.parent,
        body: body.toString(),
    });
    try {
        await comment.save();
        const comments = await Comment.find({ postId: ctx.params.postId })
            .populate('authorId', 'username')
            .sort({ createdAt: 1 })
            .lean()
            .exec();
        ctx.body = comments;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const list = async (ctx) => {
    try {
        const comments = await Comment.find({ postId: ctx.params.postId })
            .populate('authorId', 'username')
            .sort({ createdAt: -1 })
            .lean()
            .exec();
        ctx.body = comments;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const update = async (ctx) => {
    const { commentId } = ctx.params;
    try {
        await Comment.findByIdAndUpdate(commentId, ctx.request.body.body, {
            new: true,
        });
        //todo: 업데이트 쿼리를 찾아보자.
        const comments = await Comment.find({ postId: ctx.params.postId })
            .populate('authorId', 'username')
            .sort({ createdAt: 1 })
            .lean()
            .exec();
        ctx.body = comments;
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const remove = async (ctx) => {
    const { commentId } = ctx.params;
    try {
        await Comment.findByIdAndRemove(commentId).exec();
        const comments = await Comment.find({ postId: ctx.params.postId })
            .populate('authorId', 'username')
            .sort({ createdAt: 1 })
            .lean()
            .exec();
        ctx.body = comments;
    } catch (e) {
        ctx.throw(500, e);
    }
};