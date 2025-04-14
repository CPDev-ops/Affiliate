import axios from "axios";
import { baseUrl } from "../../../content/dataDomain";
import { GetDetailsDTO } from "../../../types/details";

export const getDetails = async (): Promise<GetDetailsDTO> => {
    try {
        const response = await axios.get(`${baseUrl}/traer_detalle_user`, {
            withCredentials: true
        });
        const data = response.data;
        return data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error);
        }
        else {
            throw new Error('Error de conexión');
        }
    }
}