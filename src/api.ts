import axios from 'axios';
// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'http://52.205.138.81:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllDeath = async () => {
  try {
    const response = await api.get('/country/death');
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllConfirmed = async () => {
  try {
    const response = await api.get('/country/confirmed');
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
export const getByCountry = async (country: string) => {
  try {
    const response = await api.get(`/country/${country}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
