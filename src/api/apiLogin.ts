import axios from 'axios';
import { apiUrl, apiConfig } from "./apiConfig";
import MyAccount from "../types/myAccount.ts";

const getCsrfCookie = async () => {
    await axios.get(`${apiUrl}/csrf-cookie`, apiConfig);
}

const authenticateUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, { email, password }, apiConfig);
        if(response.status == 200){
            return new MyAccount(
                response.data.id,
                response.data.full_name,
                response.data.avatar_url,
                response.data.first_name,
                response.data.last_name,
                response.data.email,
                response.data.has_two_factor_enabled,
                response.data.permissions
            );
        }
        return null;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Authentication failed');
        }
        throw new Error('Network or other error');
    }
}

const logout = async (): Promise<boolean> => {
    const response = await axios
            .post(`${apiUrl}/auth/logout`, {}, apiConfig)
            .catch(() => null);

    return (response !== null && response.status === 204);
}

export {
    getCsrfCookie,
    authenticateUser,
    logout
}