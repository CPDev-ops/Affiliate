import axios from "axios";
import { baseUrl } from "../../../content/dataDomain";
import { AffiliateUserDTO } from "../../../types/user";



export const getDataUser = async (): Promise<AffiliateUserDTO> => {
    try {
        const response = await axios.get(`${baseUrl}/home_data`, {
            withCredentials: true
        })
        const data = response.data//objeto de affiliateUserDTO
        return data
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error de conexión');
        }
    }
}