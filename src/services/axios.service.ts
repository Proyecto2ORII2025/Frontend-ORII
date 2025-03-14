import axios from "axios";

import { apiUrl } from "./env.service";

// const tokenUser = localStorage.getItem('user') || "";
const tokenUser = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImNtcGVyZG9tb0B1bmljYXVjYS5lZHUuY28iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDE5MDUyNzYsImV4cCI6MTc0MTk0MTI3Nn0.c_7KvyNXWTu2BIN2iZyuIeuXNHAujjL672S6iSZtkqM";

/**
 * Axios instance configured with default settings.
 *
 * @constant {AxiosInstance} instance - The Axios instance.
 * @property {boolean} withCredentials - Indicates whether or not cross-site Access-Control requests should be made using credentials.
 * @property {string} baseURL - The base URL for the Axios instance.
 * @property {Object} headers - The headers to be sent with the request.
 * @property {string} headers.Authorization - The Authorization header containing the Bearer token.
 */
const instance = axios.create({
    withCredentials: true,
    baseURL: apiUrl,
    headers: {
        'Authorization': `Bearer ${tokenUser}`,
    }
})

export default instance;