import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  postId: String,
  parrent: String,
  comment: String,
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본 값으로 지정
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
