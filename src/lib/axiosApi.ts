import axios from "axios";
import { envConf } from "./env";

export const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});
