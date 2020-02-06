import axios from 'axios';

export const getPostList = (categoryPath, page) => {
  return axios.get(`http://localhost:3300/post/${categoryPath}`, {
    params: {
      page,
    },
  });
};

export const getPostDetail = (categoryPath, postId) => {
  return axios.get(`http://localhost:3300/post/${categoryPath}/${postId}`);
};

export const writePost = (post) => {
  return axios.post('http://localhost:3300/post', {
    ...post,
  });
};

export const modifyPost = (post, postId) => {
  return axios.put(`http://localhost:3300/post/${postId}`, {
    ...post,
  });
};

export const removePost = (postId, categoryPath) => {
  return axios.delete(`http://localhost:3300/post/${postId}`, {
    params: {
      categoryPath,
    },
  });
};
