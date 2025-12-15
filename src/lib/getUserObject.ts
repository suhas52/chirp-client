import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export default async function fetchUser() {
    const response = await axios.get(`${SERVER_URL}:${SERVER_PORT}/api/auth/me`, {
        withCredentials: true
    })
    if (response.status === 200) return response.data.data
    else {
        return null
    }
}