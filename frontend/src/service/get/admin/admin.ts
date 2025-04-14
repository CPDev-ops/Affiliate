import axios from "axios";
import { baseUrl } from "../../../content/dataDomain";
import { GetAdminDTO } from "../../../types/admin";

interface GetAdminProps {
    year?: string;
    month?: string;
    id_affiliate?: string
}
export const getDataAdmin = async ({ id_affiliate, month, year }: GetAdminProps): Promise<GetAdminDTO[]> => {
    try {
        const response = await axios.get(`${baseUrl}/admin_home_data`, {
            params: {
                year,
                month,
                id_affiliate
            }, withCredentials: true
        });
        const data = response.data;
        return data
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Error de conexión.');
        }
    }
}

export const getAdmin = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/admin_user_data`, { withCredentials: true });
        const data = response.data;
        return data
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error);
        }
        else {
            throw new Error('Error de conexión.')
        }
    }
}


interface GetAffiliatePeriodProps {
    year?: string;
    month?: string;
    id_affiliate?: string;
}
export const getAffiliatePeriodFilter = async ({ id_affiliate, month, year }: GetAffiliatePeriodProps) => {
    try {
        const response = await axios.get(`${baseUrl}/admin_payments_data`, {
            params: {
                year,
                month,
                id_affiliate
            }, withCredentials: true
        });
        const data = await response.data;
        return data
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error);
        }
        else {
            throw new Error('Error de conexión.')
        }
    }
}

export const getAffiliatePeriod = async () => {
    try {
        const response = await axios.get(`${baseUrl}/admin_payments_data`, {
            withCredentials: true
        });
        const data = await response.data;
        return data
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error);
        }
        else {
            throw new Error('Error de conexión.')
        }
    }
}