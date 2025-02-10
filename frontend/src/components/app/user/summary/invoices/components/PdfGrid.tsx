import { GrDocumentPdf } from "react-icons/gr"
import { MdDownloadForOffline } from "react-icons/md"

export const PdfGrid = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-4 lg:gap-8 ">
            {[...Array(6)].map((_, i) => (
                <div className="flex-col my-2 shadow-lg rounded-lg ">
                    <div key={i} className="relative bg-[#B2ACAC] rounded-t-lg flex flex-col items-center p-4">
                        {/* Date (Ahora flotante) */}
                        <p className="absolute -top-5 w-full  text-[#3E3838] text-start  px-2 text-sm">
                            10/05/2024
                        </p>
                        {/* PDF Icon */}
                        <div className="flex items-center justify-center w-16 h-16 my-4">
                            <GrDocumentPdf size={62} className="text-white" />
                        </div>
                    </div>
                    {/* Download Button */}
                    <button onClick={() => alert('Descargando PDF...')} className="flex justify-center items-center gap-2 bg-white rounded-b-lg   w-full text-[#6C6C6C] hover:text-gray-800 text-sm py-2">
                        <MdDownloadForOffline className="h-6 w-6" />
                        Descargar
                    </button>
                </div>
            ))}
        </div>
    )
}