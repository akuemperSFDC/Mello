import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ak-mello.herokuapp.com',
});

export default api;
