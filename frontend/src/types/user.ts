export interface AffiliateUserDTO {
    apellido_usuario: string;
    codigo_affiliate_user: string;
    creditos: string;
    id_affiliate: number;
    id_affiliate_periodos: number;
    id_affiliate_user: number;
    ingresos_totales: number;
    mails_enviados: number;
    nivel_alcanzado: number;
    nombre_usuario: string;
    periodo_desde: string;
    periodo_hasta: string;
}

export type LevelDto = number | null