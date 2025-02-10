import { RiCloseLargeFill } from "react-icons/ri"
import { getBackgroundButtonModalForm, getTextModalFormByLevel } from "../../../../utils/transformData"
import { getBorderByLevel } from "../../collaborators/components/CollaboratorCard"
import { useState } from "react"
import { PiUploadSimpleBold } from "react-icons/pi"

interface ModalProps {
    close: () => void
    level: number
}
export function Modal({ close, level }: ModalProps) {
    return (
        <div className="fixed z-10 inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className={`bg-white w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden`}>
                {/*    {loading && (
                    <LoaderHover />
                )} */}
                <RiCloseLargeFill onClick={close} size={20} className="ml-auto mt-4 text-black mr-4" />
                <form /* onSubmit={handleSubmit} */ className=" z-10    rounded-xl space-y-6">
                    <div className=" p-6 z-20">
                        <h2 className={`${getTextModalFormByLevel(level)}  my-4 uppercase  text-lg font-semibold tracking-wider text-center `}>
                            Subir Nueva Factura
                        </h2>
                        <div className="space-y-4">
                            <div className=" max-h-[250px] overflow-y-auto space-y-4">
                                <div className="relative w-full ">
                                    <label className="text-[#3E3838] text-base " htmlFor="">Seleccionar período</label>
                                    <select className={`w-full p-2 pl-4 pr-10 rounded-lg bg-[white] border ${getBorderByLevel(level)}  text-black placeholder:text-gray-600`} name="" id="">
                                        <option value="1">FEBRERO 2025</option>
                                    </select>
                                </div>
                            </div>
                            {/* PDF  UPLOADER COMPONENTE*/}
                            <PdfUploader />
                            <button
                                type="submit"
                                className={`w-full ${getBackgroundButtonModalForm(level)} text-white py-3 uppercase font-semibold  rounded-lg text-sm tracking-widest  gothamBook shadow-2xl transition-colors `}
                            >
                                Cargar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}



const PdfUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const uploadedFile = event.dataTransfer.files[0];

        if (uploadedFile && uploadedFile.type === "application/pdf") {
            setFile(uploadedFile);
            setError(null);
        } else {
            setError("Solo se permiten archivos PDF.");
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile && uploadedFile.type === "application/pdf") {
            setFile(uploadedFile);
            console.log(uploadedFile)
            setError(null);
        } else {
            setError("Solo se permiten archivos PDF.");
        }
    };
    return (
        <div
            className="w-full max-w-lg mx-auto p-6  bg-[#EDF3F8]  text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <label
                htmlFor="fileUpload"
                className="cursor-pointer flex flex-col items-center justify-center h-40  border-2 border-dashed border-gray-300  hover:bg-gray-200 transition"
            >
                <PiUploadSimpleBold className="text-4xl text-[#3E3838] mb-4" />
                <p className="text-[#3E3838] text-xs">Cargar archivo PDF</p>
            </label>
            <input
                type="file"
                id="fileUpload"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileSelect}
            />

            {file && (
                <p className="mt-2 text-sm text-green-600">Archivo cargado: {file.name}</p>
            )}

            {error && (
                <p className="mt-2 text-red-600">{error}</p>
            )}
        </div>

    )
}