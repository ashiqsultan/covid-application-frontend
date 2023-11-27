import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllDeath = async () => {
  try {
    const response = await api.get('/country/death');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllConfirmed = async () => {
  try {
    const response = await api.get('/country/confirmed');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
