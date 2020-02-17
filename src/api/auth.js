import authAxios from './authAxios';

export const login = (email, password) => {
  return authAxios({
    url: '/auth/signin',
    method: 'POST',
    data: {
      email, password,
    },
  });
};

export const getUserSummary = () => {
  return authAxios({
    url: '/user/me',
    method: 'GET',
  });
};
