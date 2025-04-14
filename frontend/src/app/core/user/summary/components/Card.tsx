import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { LevelDto } from "../../../../../types/user";
import { GetSummaryDTO } from "../../../../../types/summary";
import { getMonthName } from "../../../../utils/date";
import { FaCheck } from "react-icons/fa";
import { CgEye } from "react-icons/cg";
import { toast } from "react-toastify";
import { MdOutlineFileDownload, MdUpload } from "react-icons/md";
import { useState } from "react";
import ModalViewPdf, { ModalViewPdfProps } from "./mod/ModalViewPdf";
import { formatAmount } from "../../../../utils/transformData";
import { ModalUploadBill } from "./mod/ModalUploadBill";

interface CardProps {
    data: GetSummaryDTO
    level: LevelDto
    onCloseOk: () => void
}

interface ModalParams {
    data: {
        id: number;
        month: number;
        year: number
        amount: string | null
    }
    state: boolean
}

export function Card({ data, onCloseOk }: CardProps) {

    const [modal, setModal] = useState<ModalViewPdfProps | null>(null);
    //constante que maneja el modal para subir una factura 
    const [modalUploadBill, setModalUploadBill] = useState<ModalParams | null>(null)
    const getStyleCard = (id: string) => {
        switch (id) {
            case "1":
                return "bg-slate-700";
            case "2":
                return "bg-blue-600";
            case "3":
                return "bg-red-600";
            case "4":
                return "bg-green-600";
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
                return "bg-red-500";
            case "4":
                return "bg-green-500";
            case "5":
                return "bg-gteen-500";
            default:
                return "bg-gray-500";
        }
    }

    const handleOpenModal = (statues: GetSummaryDTO, number: number) => {
        console.log(statues, number);
        setModal({ number: number, state: true, data: statues })
    }

    const handleDownload = (id: number, id_state: string) => {
        // Validar estados que no permiten descarga
        if (id_state === "1") {
            toast.error('No se puede descargar el resumen');
            return;
        }

        window.open(`/user/summaryPdf/${id}`, '_blank');
    };

    return (
        <div className="shadow my-2 bg-slate-800 rounded-md border border-gray-300/20">
            <div className={`${getStyleCard(data.id_affiliate_periodos_estado)} grid grid-cols-2 justify-center items-center rounded-t-md p-4`}>
                <div>
                    <h3 className="text-white text-sm">{getMonthName(data.mes)} {data.anio}</h3>
                    <p className="text-white flex justify-start items-center"> <div className=" w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                        <img src="/images/user/collaborators/iconCredit.png" alt="" />
                    </div>{formatAmount(parseInt(data.monto ?? "0")) || "0"}</p>
                </div>
                <button className={`rounded-full shadow-md ${getStyle(data.id_affiliate_periodos_estado)} text-white cursor-default px-3 py-1 text-sm w-auto flex justify-center items-center justify-self-end self-start`}>
                    <FaCheck size={12} className="mr-1 sm:mr-2 text-xs" /> {data.periodos_estado}
                </button>
            </div>
            <div className={`p-4 `}>
                {/* FACTURA */}
                <div className="mb-3">
                    <div className="mb-3">
                        <h4 className="text-white">Factura</h4>
                        <p

                            className={`text-white/60 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2`}
                        >
                            <span className="flex items-center">
                                {data.factura_pdf ? (
                                    <HiOutlineDocumentCheck size={16} className="mr-1 sm:mr-2" />
                                ) : (
                                    <CgEye size={16} className="mr-1 sm:mr-2" />
                                )}
                                {data.factura_pdf ? 'Factura cargada' : 'Factura no cargada'}
                            </span>
                            {data.factura_pdf ? (
                                <button
                                    onClick={() => handleOpenModal(data, 1)}
                                    className="text-blue-400 flex items-center hover:underline"
                                >
                                    <CgEye size={14} className="mr-1 sm:mr-2" />
                                    <span>Ver</span>
                                </button>
                            ) : (
                                <span
                                    onClick={() => setModalUploadBill({
                                        data: {
                                            month: data.mes,
                                            year: data.anio,
                                            id: data.id_affiliate_periodos,
                                            amount: data.monto_total
                                        },
                                        state: true,
                                    })} className="text-green-400 flex items-center cursor-pointer hover:underline">
                                    <MdUpload size={14} className="mr-1 sm:mr-2" />
                                    <span>Cargar</span>
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                {/* Comprobante de pago */}
                <div className="mb-3">
                    <h4 className="text-white">Comprobante de pago</h4>
                    <p
                        onClick={() => !data.comprobante_pdf && toast.warning("No se cargó comprobante")}
                        className={`text-white/60 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 ${data.comprobante_pdf ? "" : "cursor-not-allowed"}`}
                    >
                        <span className="flex items-center">
                            {data.comprobante_pdf ? (
                                <HiOutlineDocumentCheck size={16} className="mr-1 sm:mr-2" />
                            ) : (
                                <CgEye size={16} className="mr-1 sm:mr-2" />
                            )}
                            {data.comprobante_pdf ? 'Comprobante cargado' : 'Comprobante no cargado'}
                        </span>
                        {data.comprobante_pdf ? (
                            <button
                                onClick={() => handleOpenModal(data, 2)}
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
                {/* Resumen */}
                <div className="flex justify-between my-2 items-center">
                    <p className="text-white">
                        Resumen {["1"].includes(data.id_affiliate_periodos_estado) ? "(No disponible)" : "Disponible"}
                    </p>
                    <button onClick={() => handleDownload(data.id_affiliate_periodos, data.id_affiliate_periodos_estado)}
                        className={`${["1"].includes(data.id_affiliate_periodos_estado) ? "bg-gray-600 hover:bg-gray-700 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all`}
                    >
                        <MdOutlineFileDownload size={16} className="mr-1 sm:mr-2" />
                        Descargar
                    </button>
                </div>
            </div>
            {modal && modal.state && (
                <ModalViewPdf data={modal.data} number={modal.number} close={() => setModal(null)} state={modal.state} />
            )}
            {modalUploadBill && modalUploadBill.state && (
                <ModalUploadBill data={modalUploadBill.data} onCloseOk={() => { setModalUploadBill(null), onCloseOk() }} close={() => setModalUploadBill(null)} />
            )}
        </div >
    )
}

