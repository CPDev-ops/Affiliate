export interface GetSummaryDTO {
    anio: number,
    comprobante_pdf: string | null,
    factura_pdf: string | null,
    id_affiliate_periodos: number,
    id_affiliate_periodos_estado: string;
    mes: number,
    monto: string | null,
    monto_total: string | null,
    n_factura: string | null
    periodos_estado: string;
}

interface details {
    fecha_conversion: string;
    id_affiliate_user: number;
    id_conversion: number;
    monto_nivel: string;
    nombre_apellido: string;
    orden_nivel: number
}

export interface GetSummaryPDF {
    anio: number;
    comprobante_pdf: string;
    details: details[];
    factura_pdf: string;
    fecha_emision: string;
    visitas_logradas: number;
    id_affiliate: number;
    id_affiliate_periodos: number;
    id_affiliate_periodos_estado: string;
    mes: number;
    monto: string;
    monto_total: string;
    n_factura: string;
    nivel_alcanzado: number;
    periodos_estado: string;
    razon_social_empresa: string;
}