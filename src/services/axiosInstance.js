import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: 'https://todo-api-18-140-52-65.rakamin.com',
});

// Retrieve the token from local storage
const token = localStorage.getItem('token');
console.log(token)
// Set the default authorization header for all requests
AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
