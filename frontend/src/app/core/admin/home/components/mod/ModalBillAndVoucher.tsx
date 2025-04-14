import { RiCloseLargeFill } from "react-icons/ri"
import { AffiliatePeriodDTO } from "../../../../../../types/admin"
import { GetSummaryDTO } from "../../../../../../types/summary"
export interface ModalBillAndVoucherProps {
    number: number|undefined,
    state?: boolean,
    data: AffiliatePeriodDTO | GetSummaryDTO,
    close?: () => void
}

const ModalBillAndVoucher: React.FC<ModalBillAndVoucherProps> = ({ data, number, close }) => {
    return (
        <div className="fixed z-10 inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className={`bg-[#222b3c] w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden`}>
                <RiCloseLargeFill onClick={close} size={20} className="ml-auto mt-4 text-white cursor-pointer mr-4" />
                <div /* onSubmit={handleSubmit} */ className=" z-10    rounded-xl space-y-6">
                    <div className=" p-6 z-20">
                        <h2 className={`text-white my-4 uppercase  text-lg font-semibold tracking-wider text-center `}>
                            {number === 1 ? 'Ver Factura' : 'Ver Comprobante'}
                        </h2>
                        <div className="space-y-4">
                            <div className="w-full h-[400px] flex justify-center items-center">
                                {(() => {
                                    const fileId = number === 1 ? data.factura_pdf : data.comprobante_pdf;
                                    return fileId ? (
                                        <iframe
                                            src={`https://drive.google.com/file/d/${fileId}/preview?usp=drivesdk`}
                                            className="w-full h-full"
                                        ></iframe>
                                    ) : (
                                        <p className="text-white text-center">No hay archivo disponible para mostrar</p>
                                    );
                                })()}
                            </div>
                            {/* PDF  UPLOADER COMPONENTE*/}
                            {/*   <PdfUploader onFileSelect={handleFileReceive} /> */}
                            <button onClick={close && close}
                                className={`w-full bg-red-600 hover:bg-red-700 text-white py-2 uppercase  font-semibold  rounded-lg  tracking-widest  gothamBook shadow-2xl transition-colors `}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ModalBillAndVoucher