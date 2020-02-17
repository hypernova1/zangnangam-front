import authAxios from './authAxios';
import category from '../reducers/category';

export const getCategories = () => {
  return authAxios({
    url: '/category',
    method: 'GET',
  });
};

export const modifyCategory = (category) => {
  return authAxios({
    url: `/category/${category.id}`,
    method: 'PUT',
    data: {
      ...category,
    },
  });
};

export const createCategory = (category) => {
  return authAxios({
    url: '/category',
    method: 'POST',
    data: {
      ...category,
    },
  });
};

export const removeCategory = (category) => {
  return authAxios({
    url: `/category/${category.id}`,
    method: 'DELETE',
  });
};
