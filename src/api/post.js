import authAxios from './authAxios';

export const getPostList = (categoryPath, page) => {
  return authAxios({
    url: `/post/${categoryPath}?page=${page}`,
    method: 'GET',
  });
};

export const getPostDetail = (categoryPath, postId) => {
  return authAxios({
    url: `/post/${categoryPath}/${postId}`,
    method: 'GET',
  });
};

export const writePost = (post) => {
  return authAxios({
    url: '/post',
    method: 'POST',
    data: {
      ...post,
    },
  });
};

export const modifyPost = (post, postId) => {
  return authAxios({
    url: `/post/${postId}`,
    method: 'PUT',
    data: {
      ...post,
    },
  });
};

export const removePost = (postId, categoryPath) => {
  return authAxios({
    url: `/post/${postId}?categoryPath=${categoryPath}`,
    method: 'DELETE',
  });
};
