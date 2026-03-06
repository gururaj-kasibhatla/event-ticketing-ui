import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

export const getSeats = () => axios.get(`${API_BASE_URL}/seats`);
export const bookSeats = (bookingData) => axios.post(`${API_BASE_URL}/book`, bookingData);
export const initializeEvent = () => axios.post(`${API_BASE_URL}/initialize`);