import authAxios from './authAxios';
import category from '../reducers/category';

export const getCategories = () => {
  return authAxios({
    url: 'http://localhost:3300/category',
    method: 'GET',
  });
};

export const modifyCategory = (category) => {
  return authAxios({
    url: `http://localhost:3300/category/${category.id}`,
    method: 'PUT',
    data: {
      ...category,
    },
  });
};

export const createCategory = (category) => {
  return authAxios({
    url: 'http://localhost:3300/category',
    method: 'POST',
    data: {
      ...category,
    },
  });
};

export const removeCategory = (category) => {
  return authAxios({
    url: `http://localhost:3300/category/${category.id}`,
    method: 'DELETE',
  });
};
