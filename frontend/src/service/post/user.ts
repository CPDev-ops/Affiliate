import { baseUrl } from "../../content/dataDomain";

interface uploadBodyDTO {
    file: File;
    id_affiliate_user: number
    id_premio: number|string
}
export const uploadExcel = async ({ file, id_affiliate_user, id_premio }: uploadBodyDTO) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id_affiliate_user', id_affiliate_user.toString());
    formData.append('id_premio', id_premio.toString());

    try {
        const response = await fetch(`${baseUrl}/procesar_xlsx`, {
            method: 'POST',
            body: formData,
            credentials: 'include'//para que se mande la cookie por session
        })
        if (!response.ok) {
            throw new Error(`Error al subir el archivo : ${response.statusText}`);
        }
        return response
    } catch (error) {
        console.error('Error al enviar el archivo', error);
        throw error
    }

}