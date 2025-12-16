import axios from "axios";
import { api } from "./axiosApi";



export default async function fetchUser() {
    const response = await api.get("/auth/me")
    if (response.status === 200) return response.data.data
    else {
        return null
    }
}