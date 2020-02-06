import authAxios from './authAxios';

export const login = (email, password) => {
  return authAxios({
    url: 'http://localhost:3300/auth/signin',
    method: 'POST',
    data: {
      email, password,
    },
  });
};

export const getUserSummary = () => {
  return authAxios({
    url: 'http://localhost:3300/user/me',
    method: 'GET',
  });
};
