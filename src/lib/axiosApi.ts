import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export const api = axios.create({
    baseURL: `${SERVER_URL}:${SERVER_PORT}/api`,
    withCredentials: true,
});