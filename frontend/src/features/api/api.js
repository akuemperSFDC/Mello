import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ak-mello.herokuapp.com/api',
});

export default api;
