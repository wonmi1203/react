import qs from 'qs';
import client from './client';

export const writeComment = ({ postId, parentId, comment, username }) => {
    console.log(postId, parentId, comment, username);
    client.post('/api/comment', { postId, parentId, comment, username });
}

export const readComment = id => client.get(`/api/comment/${id}`);

export const listComments = ({ page, username, tag, search }) => {
	const queryString = qs.stringify({
		page,
		username,
		tag,
		search,
	});

	return client.get(`/api/comment?${queryString}`);
};

export const removeComment = id => client.delete(`/api/comment/${id}`);
