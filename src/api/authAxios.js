import axios from 'axios';

export default function request(options) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (localStorage.getItem('accessToken')) {
    headers.Authorization = localStorage.getItem('accessToken');
  }

  const defaults = { headers };
  Object.assign(options, defaults);

  return axios({
    url: options.url,
    method: options.method,
    data: options.data,
    headers: options.headers,
  });
}
