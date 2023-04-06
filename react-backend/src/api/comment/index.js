import Router from 'koa-router';
import * as commentCtrl from './comment.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const comments = new Router();

comments.get('/', commentCtrl.list);
comments.post('/', checkLoggedIn, commentCtrl.write);

const comment = new Router(); // /api/posts/:id
comment.get('/', commentCtrl.read);
comment.delete('/', checkLoggedIn, commentCtrl.checkOwnPost, commentCtrl.remove);
comment.patch('/', checkLoggedIn, commentCtrl.checkOwnPost, commentCtrl.update);

comment.use('/:id', commentCtrl.getPostById, comment.routes());

export default comment;
