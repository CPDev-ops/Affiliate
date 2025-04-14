import { useEffect, useRef, useState } from "react";
import { BiStar } from "react-icons/bi";
import { FiCreditCard, FiUsers } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { getSummaryPdf } from "../../../../service/get/summary/summary";
import { GetSummaryPDF } from "../../../../types/summary";
import { DateFormat, getMonthName } from "../../../utils/date";
import { getDomainInfo } from "../../../utils/changedDomainPage";
import { formatAmount } from "../../../utils/transformData";
import { LoaderHover } from "../../../loaders/Loaders";
/* import html2pdf from 'html2pdf.js'; */

export function Template() {
    const pdfRef = useRef<HTMLDivElement>(null);
    const { id_affiliate_periodos } = useParams();
    console.log(id_affiliate_periodos);
    const [data, setData] = useState<GetSummaryPDF | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { domain } = getDomainInfo()
    const [hasError, setHasError] = useState<boolean>(false)
    const navigate = useNavigate();
    const getData = async () => {
        setLoading(true)
        try {
            const result: GetSummaryPDF = await getSummaryPdf(id_affiliate_periodos)
            console.log(result);
            setData(result)
            // 👉 Descargamos antes de imprimir
            /* downloadPDF('/pdf/archivo.pdf', 'archivo.pdf'); */
            /*   await generarYDescargarPDF(); */
            // 👇 Llamamos a la función que genera y descarga el PDF
            // Esperamos un pequeño delay para asegurar que el DOM se actualice antes de imprimir
            setTimeout(() => {
                setLoading(false)
                window.print();
            }, 2000);
        } catch (error) {
            console.error(error);
            setHasError(true)
        } finally {
            setLoading(false)
        }
    }
    function getNameDomain(domain: string) {
        switch (domain.toUpperCase()) {
            case 'PILAR':
                return 'Bingo Oasis Pilar';
            case 'ZARATE':
                return 'Oasis Zarate';
            case 'SALTA':
                return 'Nuevo Casino Alberdi';
            default:
                return 'Casino desconocido';
        }
    }
    const getStateById = (id: string) => {
        switch (id) {
            case '1':
                return 'Sin actividad';
            case '2':
                return 'Vigente';
            case '3':
                return 'Pendiente';
            case '4':
                return 'Pendiente';
            case '5':
                return 'Pagado';
            default:
                return 'Estado desconocido';
        }
    };
    const getBackgroundButton = (id: string) => {
        switch (id) {
            case '1':
                return 'bg-gray-500 ';
            case '2':
                return 'bg-blue-500 ';
            case '3':
                return 'bg-yellow-500 ';
            case '4':
                return 'bg-yellow-500 ';
            case '5':
                return 'bg-green-500 ';
            default:
                return 'bg-gray-100 ';
        }
    }
    const getColorByState = (id: string) => {
        switch (id) {
            case '1':
                return ' border-gray-500 bg-gray-100 text-gray-500';
            case '2':
                return ' border-blue-500 bg-blue-100 text-blue-500';
            case '3':
                return ' border-yellow-500 bg-yellow-100 text-yellow-500';
            case '4':
                return ' border-yellow-500 bg-yellow-100 text-yellow-500';
            case '5':
                return ' border-green-500 bg-green-100 text-green-500';
            default:
                return ' border-gray-500 bg-gray-100 text-gray-100';
        }
    }
    const sumAmounts = (data: { monto_nivel: string }[]): number => {
        return data.reduce((total, item) => {
            return total + parseFloat(item.monto_nivel);
        }, 0);
    }
    useEffect(() => {
        getData()
    }, [id_affiliate_periodos])
    return (
        <div ref={pdfRef} className="max-w-4xl mx-auto gothamMedium min-h-[90%] flex flex-col   font-sans">
            {loading && (
                <LoaderHover />
            )}
            {hasError && (

                <div className="flex flex-col items-center justify-center h-60 text-center">
                    <p className="text-red-600 text-lg font-semibold mb-4">
                        Ocurrió un error al cargar los datos.
                    </p>
                    <button
                        onClick={() => navigate('/user/summary')}
                        className="bg-blue-600 hover:bg-blue-700 text-white mt px-4 py-2 rounded"
                    >
                        Volver al inicio
                    </button>
                </div>
            )}
            {data && !hasError && (
                <>
                    {/* Header */}
                    <div className="bg-gray-200 ">
                        <div className="flex justify-between p-4 items-start mb-4">
                            <h1 className="text-4xl font-bold  text-gray-900">{getNameDomain(domain)}</h1>
                            <div className="text-right">
                                <h2 className="text-xl font-bold ">RESUMEN MENSUAL</h2>
                                <p className="text-sm ">N° {data?.n_factura ?? 'No cargado'}</p>
                                <p className="text-sm ">Emitido: <span>{DateFormat(data.fecha_emision)}</span></p>
                            </div>
                        </div>
                        {/* Affiliate Banner */}
                        <div
                            className="bg-orange-500 w-1/2 text-black  font-bold p-4 px-4 "
                            style={{ clipPath: "polygon(00% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)" }}
                        >
                            <h3 className=" text-lg">AFFILIATE</h3>
                        </div>
                    </div>
                    {/* CARD FATHER STYLES IN ALL CHILDRENS */}
                    <div className="mx-4 sm:mx-16">
                        {/* Affiliate Info and Level */}
                        <div className="flex justify-between mb-6">
                            <div className="bg-white p-4 rounded-md shadow-sm w-2/3">
                                <h3 className=" mb-2 font-bold text-xl">Información del Afiliado</h3>
                                <div className="space-y-1">
                                    <p>
                                        <span className="">Nombre:</span> {data.razon_social_empresa}
                                    </p>
                                    <p>
                                        <span className="">ID AFILIADO:</span> {data.id_affiliate}
                                    </p>
                                    <p>
                                        <span className="">PERIODO:</span> {getMonthName(data.mes)} {data.anio}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center mt-4 sm:mt-8">
                                <div className="bg-orange-500 rounded-full p-3 text-white">
                                    <BiStar className="h-10 w-10 fill-white" />
                                </div>
                                <p className=" mt-2 ">Nivel {data?.nivel_alcanzado ?? '0'}</p>
                            </div>
                        </div>
                        {/* Stats Boxes */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 font-semibold gap-4 mb-12">
                            <div className="bg-gradient-to-r from-orange-500 to-yellow-500  text-white p-4 rounded-md shadow-sm">
                                <h3 className=" text-sm flex items-center"><FiUsers size={16} className="mr-2" />Visitas Logradas</h3>
                                <p className="text-3xl  ">{data.visitas_logradas}</p>
                            </div>
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-md shadow-sm">
                                <h3 className=" text-sm flex items-center"><FiCreditCard size={16} className="mr-2" />Crédito Ganado</h3>
                                <p className="text-3xl  ">$ {formatAmount(parseInt(data?.monto ?? '0'))}</p>
                            </div>
                        </div>
                        {/* Visit Details */}
                        <div className="mb-8">
                            <h3 className=" mb-= font-semibold" text-3xl>Detalle de Visitas</h3>
                            <div className="overflow-hidden rounded-md shadow-sm">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-yellow-500 text-black">
                                            <th className="py-2 px-4 font-bold text-left">VISITANTE</th>
                                            <th className="py-2 px-4 font-bold text-left">FECHA Y HORA</th>
                                            <th className="py-2 px-4 font-bold text-right">MONTO CRÉDITO</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {data.details.length === 0 ? (
                                            <tr>
                                                <td colSpan={3} className="py-4 px-4 text-center text-gray-500">
                                                    No hay datos disponibles.
                                                </td>
                                            </tr>
                                        ) : (
                                            data.details.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="py-2 px-4 font-semibold">{item.nombre_apellido}</td>
                                                    <td className="py-2 px-4 font-semibold">{item.fecha_conversion}</td>
                                                    <td className="py-2 px-4 font-semibold text-right">
                                                        +${formatAmount(parseInt(item.monto_nivel))}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                        {data.details.length > 0 && (
                                            <tr>
                                                <td className="py-2 px-4 text-right opacity-0 "></td>
                                                <td colSpan={1} className="py-2 px-4 text-center font-semibold bg-orange-400 text-black ">
                                                    TOTAL
                                                </td>
                                                <td className="py-2 px-4 text-right font-bold ">${formatAmount(sumAmounts(data.details))}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Payment Status */}
                        <div className={` border-l-4 ${getColorByState(data.id_affiliate_periodos_estado)} p-4 mb-8 rounded-md`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className=" font-semibold">Estado: PENDIENTE DE PAGO</p>
                                    <p className="text-sm  opacity-70">Este resumen está pendiente de pago por parte de Bingo Oasis Pilar.</p>
                                </div>
                                <div
                                    className={`
    inline-block 
    text-white 
    text-sm 
    sm:text-base 
    px-3 
    py-1 
    sm:py-2 
    mx-1 
    sm:mx-2 
    rounded-full 
    whitespace-nowrap 
    ${getBackgroundButton(data.id_affiliate_periodos_estado)}
  `}
                                >
                                    {getStateById(data.id_affiliate_periodos_estado)}
                                </div>

                            </div>
                        </div>
                        {/* Notes */}
                        <div className="mb-6">
                            <h3 className=" mb-2 font-semibold">Notas:</h3>
                            <p className="text-xs">
                                Este documento es un resumen de tu actividad como afiliado durante el período indicado.
                            </p>
                            <p className="text-xs">La contabilidad de los objetivos es únicamente mensual.</p>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="text-center text-sm text-gray-600 mt-auto py-2">
                        <p>Este documento es una representación digital del resumen de afiliación.</p>
                        <p>© {data.anio} Bingo Oasis Pilar - Todos los derechos reservados</p>
                    </div>
                </>
            )}

            {/* CSS for the clipped polygon shape */}
            <style>{`
        .clip-path-polygon {
          clip-path: polygon(0 0, 95% 0, 100% 100%, 0% 100%);
        }
      `}</style>
        </div>
    )
}