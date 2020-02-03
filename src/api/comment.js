import axios from 'axios';

export const writeComment = (form) => {
  return axios.post('http://localhost:3300/comment', {
    ...form,
  });
};
