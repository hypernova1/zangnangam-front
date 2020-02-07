import authAxios from './authAxios';

export const writeComment = (form) => {
  return authAxios({
    url: 'http://localhost:3300/comment',
    method: 'POST',
    data: {
      ...form,
    },
  });
};

export const modifyComment = (comment) => {
  return authAxios({
    url: `http://localhost:3300/comment/${comment.id}`,
    method: 'PUT',
    data: {
      ...comment,
    },
  });
};

export const removeComment = (commentId, postId) => {
  return authAxios({
    url: `http://localhost:3300/comment/${commentId}`,
    method: 'DELETE',
    data: {
      postId,
    },
  });
};
