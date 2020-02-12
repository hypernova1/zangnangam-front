import authAxios from './authAxios';

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
