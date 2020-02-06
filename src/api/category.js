import authAxios from './authAxios';

export const getCategories = () => {
  return authAxios({
    url: 'http://localhost:3300/category',
    method: 'GET',
  });
};
