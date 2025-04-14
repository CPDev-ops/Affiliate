import axios from "axios";
import { baseUrl } from "../../../content/dataDomain";
import { GetSummaryDTO } from "../../../types/summary";


interface GetSummaryFilterDTO {
    year?: string;
    month?: string;
}
export const getSummary = async ({ month, year }: GetSummaryFilterDTO): Promise<GetSummaryDTO[]> => {
    try {
        const response = await axios.get(`${baseUrl}/summary_data`, {
            params: {
                year,
                month,
            },
            withCredentials: true
        })
        const data = response.data;
        return data
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error de conexión');
        }
    }
}


export const getSummaryPdf = async (id: string | undefined) => {
    try {
        const response = await axios.get(`${baseUrl}/summary_download?id_affiliate_periodos=${id}`, {
            withCredentials: true
        })
        const data = response.data;
        return data
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error de conexión');
        }
    }
}