import axios from "axios";
import { envConf } from "./env";

export const api = axios.create({
    baseURL: `${envConf.SERVER_URL}:${envConf.SERVER_PORT}/api`,
    withCredentials: true,
});