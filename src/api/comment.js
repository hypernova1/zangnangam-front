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
