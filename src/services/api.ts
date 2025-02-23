import axios from 'axios';

const API_URL = 'https://67b54a7ba9acbdb38ed1cccc.mockapi.io/api/v1';

export const api = axios.create({
  baseURL: String(API_URL),
});
