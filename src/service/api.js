import axios from 'axios';

const BASE_URL = 'https://blogback-97zr.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
export { BASE_URL };
