import { RiCalendarLine } from "react-icons/ri";
import { getMonthName, months, yearsUntilCurrent } from "../../../../utils/date";
import { FaCheck } from "react-icons/fa";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { CgEye } from "react-icons/cg";
import { MdOutlineFileDownload, MdUpload } from "react-icons/md";
import { useEffect, useState } from "react";
import { Modal } from "./mod/Modal";
import { toast } from "react-toastify";
import { AffiliatePeriodDTO } from "../../../../../types/admin";
import { getAffiliatePeriod, getAffiliatePeriodFilter } from "../../../../../service/get/admin/admin";
import SelectMonth from "./SelectMonth";
import SelectYear from "./SelectYear";
import ModalBillAndVoucher, { ModalBillAndVoucherProps } from "./mod/ModalBillAndVoucher";
import SelectPartners from "./SelectsPartners";
import { formatAmount } from "../../../../utils/transformData";

interface PaymentsInvoicesProps {
    loading: boolean;
    setLoading: (boolean: boolean) => void;
}
interface ModalParams {
    data: {
        id: number;
        month: number;
        year: number
    }
    state: boolean
}
export const PaymentsInvoices: React.FC<PaymentsInvoicesProps> = ({ loading, setLoading }) => {
    const [modalIsOpen, setModalIsOpen] = useState<ModalParams | null>(null)
    const [statues, setStatues] = useState<AffiliatePeriodDTO[]>([])
    const [partners, setPartners] = useState<AffiliatePeriodDTO[]>([])
    //variables pra filtrar
    const [selectedPartner, setSelectedPartner] = useState<string>(''); // "" = TODOS
    const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth()+1).toString()); // default: enero  
    const [selectedYears, setSelectedYears] = useState<string>(new Date().getFullYear().toString())

    //constante para el modal que printea la factura o comprobante cargada
    const [modal, setModal] = useState<ModalBillAndVoucherProps | null>(null)

    const getStyleCard = (id: string) => {
        switch (id) {
            case "1":
                return "bg-gray-600";
            case "2":
                return "bg-blue-600";
            case "3":
                return "bg-yellow-600";
            case "4":
                return "bg-orange-600";
            case "5":
                return "bg-green-600";
            default:
                return "bg-gray-900";
        }
    }
    const getStyle = (id: string) => {
        switch (id) {
            case "1":
                return "bg-gray-500";
            case "2":
                return "bg-blue-500";
            case "3":
                return "bg-yellow-500";
            case "4":
                return "bg-orange-500";
            case "5":
                return "bg-gteen-500";
            default:
                return "bg-gray-500";
        }
    }
    const getDataPartners = async () => {
        try {
            setLoading(true)
            const response = await getAffiliatePeriod();
            setPartners(response)
        } catch (error) {
            console.error(error)
            setPartners([])
            // No lances de nuevo el error
            // Podés mostrar un toast u otro indicador visual
            toast.error("No se pudieron cargar los datos. Intentalo más tarde.");
        } finally {
            setLoading(false)
        }
    }
    const getData = async () => {
        try {
            setLoading(true)
            const params: any = {
                year: selectedYears,
            }
            if (selectedMonth !== '') {
                params.month = selectedMonth
            }
            if (selectedPartner !== '') {
                params.id_affiliate = selectedPartner
            }
            const response = await getAffiliatePeriodFilter(params);
            setStatues(response)
        } catch (error) {
            console.error(error)
            setStatues([])
            // No lances de nuevo el error
            // Podés mostrar un toast u otro indicador visual
            toast.error("No se pudieron cargar los datos. Intentalo más tarde.");
        } finally {
            setLoading(false)
        }
    }

    const handleOpenModal = (statues: AffiliatePeriodDTO, number: number) => {
        console.log(statues, number);

        setModal({ number: number, state: true, data: statues })
    }

    const handleDownload = (id_state: string, id: number) => {
        if (id_state === "1") {
            toast.error('No se puede descargar el resumen')
            return
        }
        toast.success('Descargado correctamente')
        window.open(`/user/summaryPdf/${id}`, '_blank');
    }

    useEffect(() => {
        getDataPartners()
    }, [])

    useEffect(() => {
        console.log(selectedPartner, selectedMonth, selectedYears);
        getData()
    }, [selectedPartner, selectedMonth, selectedYears])
    return (
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-3  items-center mb-4 gap-4">
                <div className="min-w-[200px] col-span-full items-center w-full   ">
                    <label className="mb-1 text-white/60 flex items-center "><RiCalendarLine className="mr-1" size={20} /> Periodo </label>
                </div>
                <SelectPartners selectedPartner={selectedPartner} setSelectedPartner={setSelectedPartner} data={partners} />
                <SelectMonth months={months} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                <SelectYear years={yearsUntilCurrent} selectedYear={selectedYears} setSelectedYear={setSelectedYears} />
            </div>
            {/* MAPEO */}
            <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[500px] sm:max-h-[700px]">
                {loading ? (
                    // Skeleton mientras carga
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="shadow my-2 rounded-md border border-gray-300/20 bg-gray-700 animate-pulse p-6">
                            <div className="h-5 bg-gray-600 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-600 rounded w-1/4 mb-4"></div>
                            <div className="h-3 bg-gray-600 rounded w-full mb-2"></div>
                            <div className="h-3 bg-gray-600 rounded w-5/6"></div>
                        </div>
                    ))
                ) : Array.isArray(statues) && statues.length > 0 ? (
                    // Mapeo de contenido real
                    statues.map((status) => (
                        <div key={status.id_affiliate_periodos} className="shadow my-2 rounded-md border border-gray-300/20">
                            {/* Card Encabezado */}
                            <div className={`${getStyleCard(status.id_affiliate_periodos_estado)} grid grid-cols-2 justify-center items-center rounded-t-md p-4`}>
                                <div>
                                    <h2 className="text-white text-xl">{status.razon_social_empresa}</h2>
                                    <h3 className="text-white text-sm">{getMonthName(status.mes)} {status.anio}</h3>
                                    <p className="text-white flex justify-start items-center"> <div className=" w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                                        <img src="/images/user/collaborators/iconCredit.png" alt="" />
                                    </div>{formatAmount(parseInt(status.monto ?? "0")) || "0"}</p>
                                </div>
                                <button className={`rounded-full shadow-md ${getStyle(status.id_affiliate_periodos_estado)} text-white cursor-default px-3 py-1 text-sm w-auto flex justify-center items-center justify-self-end self-start`}>
                                    <FaCheck size={12} className="mr-1 sm:mr-2 text-xs" /> {status.periodos_estado}
                                </button>
                            </div>
                            {/* Detalles */}
                            <div className="p-4">
                                {/* FACTURA */}
                                <div className="mb-3">
                                    <h4 className="text-white">Factura</h4>
                                    <p
                                        onClick={() => !status.factura_pdf && toast.warning("No se cargó factura")}
                                        className={`text-white/60 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 ${status.factura_pdf ? "" : "cursor-not-allowed"}`}
                                    >
                                        <span className="flex items-center">
                                            {status.factura_pdf ? (
                                                <HiOutlineDocumentCheck size={16} className="mr-1 sm:mr-2" />
                                            ) : (
                                                <CgEye size={16} className="mr-1 sm:mr-2" />
                                            )}
                                            {status.factura_pdf ? 'Factura cargada' : 'Ver factura'}
                                        </span>
                                        {status.factura_pdf ? (
                                            <button
                                                onClick={() => handleOpenModal(status, 1)}
                                                className="text-blue-400 flex items-center hover:underline"
                                            >
                                                <CgEye size={14} className="mr-1 sm:mr-2" />
                                                <span>Ver</span>
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 flex items-center">
                                                <CgEye size={14} className="mr-1 sm:mr-2" />
                                                <span>(No disponible)</span>
                                            </span>
                                        )}
                                    </p>
                                </div>

                                {/* Comprobante de pago */}
                                <div className="mb-3">
                                    <h4 className="text-white">Comprobante de pago</h4>
                                    <p className="text-white/60 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        <span className="flex items-center">
                                            {status.comprobante_pdf ? (
                                                <HiOutlineDocumentCheck size={16} className="mr-1 sm:mr-2" />
                                            ) : (
                                                <CgEye size={16} className="mr-1 sm:mr-2" />
                                            )}
                                            {status.comprobante_pdf ? 'Comprobante cargado' : 'Comprobante no cargado'}
                                        </span>

                                        {status.comprobante_pdf ? (
                                            <button
                                                onClick={() => handleOpenModal(status, 2)}
                                                className="text-blue-400 flex items-center hover:underline"
                                            >
                                                <CgEye size={14} className="mr-1 sm:mr-2" />
                                                <span>Ver</span>
                                            </button>
                                        ) : (
                                            <span
                                                onClick={() => setModalIsOpen({
                                                    data: {
                                                        month: status.mes,
                                                        year: status.anio,
                                                        id: status.id_affiliate_periodos
                                                    },
                                                    state: true
                                                })}
                                                className="text-green-400 flex items-center cursor-pointer hover:underline"
                                            >
                                                <MdUpload size={14} className="mr-1 sm:mr-2" />
                                                <span>Cargar</span>
                                            </span>
                                        )}
                                    </p>
                                </div>

                                {/* Resumen */}
                                <div className="flex justify-between my-2 items-center">
                                    <p className="text-white">
                                        Resumen {["1"].includes(status.id_affiliate_periodos_estado) ? "(No disponible)" : "Disponible"}
                                    </p>
                                    <button
                                        onClick={() => handleDownload(status.id_affiliate_periodos_estado, status.id_affiliate_periodos)}
                                        className={`${["1"].includes(status.id_affiliate_periodos_estado)
                                            ? "bg-gray-600 hover:bg-gray-700 cursor-not-allowed"
                                            : "bg-red-600 hover:bg-red-700"
                                            } text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all`}
                                    >
                                        <MdOutlineFileDownload size={16} className="mr-1 sm:mr-2" />
                                        Descargar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // No hay datos
                    <div className="shadow my-2 rounded-md border col-span-2 border-gray-300/20 bg-gray-800 p-6 text-center">
                        <p className="text-white text-lg">No hay datos disponibles</p>
                        <p className="text-white/60 text-sm mt-1">Todavía no hay registros para mostrar</p>
                    </div>
                )}
            </div>

            {/* <button onClick={() => setModalIsOpen(true)} className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all">
                <IoAddSharp size={24} />
            </button> */}
            {modal && modal.state && (
                <ModalBillAndVoucher close={() => setModal(null)} data={modal.data} number={modal.number} state={modal.state} />
            )}
            {
                modalIsOpen && modalIsOpen.state && (
                    <Modal onCloseOk={() => { setModalIsOpen(null), getData() }} data={modalIsOpen.data} close={() => setModalIsOpen(null)} />
                )
            }
        </div >
    )
}





