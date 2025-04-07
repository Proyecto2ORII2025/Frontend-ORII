import { apiUrl } from "./env.service";
import authApi from "./axios.service";
import { UpdatePasswordPayload } from "@/types/passwordType.js";

const url = `${apiUrl}/users`;

export const updatePassword = async (data: UpdatePasswordPayload) => {
    return await authApi.post(`${url}/updatepassword`, data);
}