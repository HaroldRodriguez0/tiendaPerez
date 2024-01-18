import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API //'http://localhost:4000/api/'
})




/* export const verification = async () => {
  const res = await api.get('/verification');
  return res.data;
} */