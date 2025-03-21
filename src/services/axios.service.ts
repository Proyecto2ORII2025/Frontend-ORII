import axios from "axios";

import { apiUrl } from "./env.service";

let tokenUser: string = "";
if (typeof window !== "undefined") {
    tokenUser = localStorage.getItem('user') || "";
}
tokenUser = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEwMDAsInN1YiI6Imp1bGlhbnJ1YW5vQHVuaWNhdWNhLmVkdS5jbyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0MjUwNzc1MiwiZXhwIjoxNzQyNTQzNzUyfQ.RLUUe8rea7FTa5BEiS1gkEj_Ym9IN6Al_copvvZPnpc";

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