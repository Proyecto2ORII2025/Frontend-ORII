import axios from "axios";

import { apiUrl } from "./env.service";

// const tokenUser = localStorage.getItem('user') || "";
const tokenUser = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEwMDAsInN1YiI6Imp1bGlhbnJ1YW5vQHVuaWNhdWNhLmVkdS5jbyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0MTM2Nzc2MiwiZXhwIjoxNzQxNDAzNzYyfQ.RLzDXes_W2BS-FQbikRtetlnE_zoyPrp-1-Z00qQelE";

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