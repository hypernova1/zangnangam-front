import axios from 'axios';

export const login = (email, password) => {
  return axios.post('http://localhost:3300/auth/signin', {
    email, password,
  });
};

export const getCategories = () => {
  return axios.get('http://localhost:3300/category');
};

export const getPostList = (category, page) => {
  return axios.get(`http://localhost:3300/${category}/${page}`);
};
