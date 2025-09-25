import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);

export const addProduce = (data) => axios.post(`${API_URL}/farmer/add`, data);
export const getProduces = () => axios.get(`${API_URL}/farmer/produces`);

export const transferProduce = (data) => axios.post(`${API_URL}/distributor/transfer`, data);
export const updateStock = (data) => axios.post(`${API_URL}/retailer/updateStock`, data);

export const getProduceDetails = (id) => axios.get(`${API_URL}/consumer/${id}`);
