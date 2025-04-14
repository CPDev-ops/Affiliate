export interface GetAdminDTO {
    anio: number;
    id_affiliate: number;
    mails_enviados: number;
    mes: number;
    monto: string | null;
    orden_nivel: number;
    razon_social_empresa: string;
    visitas_logradas: number
}


export interface AffiliatePeriodDTO {
    anio: number;
    comprobante_pdf: string | null;
    factura_pdf: string | null;
    id_affiliate: number;
    id_affiliate_periodos: number;
    id_affiliate_periodos_estado: string;
    mes: number;
    monto: string | null;
    monto_total: string | null;
    n_factura: string | null;
    periodos_estado: string;
    razon_social_empresa: string;
}