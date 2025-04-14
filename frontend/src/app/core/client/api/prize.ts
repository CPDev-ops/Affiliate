import { baseUrl } from "../../../../content/dataDomain";

export async function fetchMailEnviado(): Promise<string | null> {
    const response = await fetch(`${baseUrl}/mail_enviado`, { credentials: 'include' as RequestCredentials });
    const result = await response.json();
    return result.email;
}