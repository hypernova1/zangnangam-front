import authAxios from './authAxios';

export const writeComment = (form) => {
  return authAxios({
    url: '/comment',
    method: 'POST',
    data: {
      ...form,
    },
  });
};

export const modifyComment = (comment) => {
  return authAxios({
    url: `/comment/${comment.id}`,
    method: 'PUT',
    data: {
      ...comment,
    },
  });
};

export const removeComment = (commentId, postId) => {
  return authAxios({
    url: `/comment/${commentId}`,
    method: 'DELETE',
    data: {
      postId,
    },
  });
};
