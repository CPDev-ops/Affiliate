import axios from "axios";
import { LoginResponseDTO } from "../types/auth";
import { baseUrl } from "../content/dataDomain";

export const login = async (user: string, password: string) => {
    try {
        const response = await axios.post<LoginResponseDTO>(
            `${baseUrl}/login`,
            { username: user, password: password },
            { withCredentials: true }
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error de conexión');
        }
    }
};