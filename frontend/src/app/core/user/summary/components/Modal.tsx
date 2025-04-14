import { RiCloseLargeFill } from "react-icons/ri"
import { getBackgroundButtonModalForm } from "../../../../utils/transformData"
import { useState } from "react"
import { PiUploadSimpleBold } from "react-icons/pi"
import { LevelDto } from "../../../../../types/user"
import { getMonthName } from "../../../../utils/date"
import { GetSummaryDTO } from "../../../../../types/summary"
import { toast } from "react-toastify"
import { LoaderHover } from "../../../../loaders/Loaders"
import { inputBaseStyles } from "../../../../utils/css/styles"

interface ModalProps {
    close: () => void
    domain: string
    level: LevelDto
    data: GetSummaryDTO
    closeOk: () => void;
}
export function Modal({ close, level, domain, data, closeOk }: ModalProps) {

    console.log(data);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [input, setInput] = useState<string>("")
    const handleFileReceive = (selectedFile: File) => {
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        console.log(file);
        console.log(input);
        if (input.length < 1) {
            toast.error("Por favor completa el campo de Número de factura.");
            return;
        }
        setLoading(true)
        if (!file) {
            toast.error("Por favor selecciona un archivo PDF.");
            setLoading(false)
            return;
        }
        try {
            // Subida del PDF
            const formData = new FormData();
            formData.append("archivo", file);

            const uploadResponse = await fetch("http://127.0.0.1:5000/api/upload_factura", {
                method: "POST",
                body: formData,
            });

            const archivoId = await uploadResponse.text(); // 👈 cambio importante

            if (!uploadResponse.ok || !archivoId) {
                setLoading(false);
                throw new Error("Error al subir el archivo");
            }


            // Ahora mandamos los datos del período
            const payload = {
                id_affiliate_periodos: data.id_affiliate_periodos_estado,
                monto_total: data.monto_total, // ajustá si tenés input
                n_factura: input,         // ajustá si tenés input
                factura_pdf: archivoId,
            };

            const facturaRes = await fetch("http://127.0.0.1:5000/api/cargar_factura", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!facturaRes.ok) {
                setLoading(false)
                toast.error("Error al guardar factura");
                throw new Error("Error al guardar factura");
            }

            toast.success("Factura cargada correctamente ✅");
            closeOk(); // Cierra modal si todo ok
        } catch (error) {
            toast.error("Hubo un error al cargar la factura 😓");
            console.error(error);
        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="fixed z-10 inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className={`bg-white w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden`}>
                {loading && (
                    <LoaderHover />
                )}
                <RiCloseLargeFill onClick={close} size={20} className="ml-auto cursor-pointer mt-4 text-black mr-4" />
                <form onSubmit={handleSubmit} className=" z-10    rounded-xl space-y-6">
                    <div className=" p-6 z-20">
                        {/* Info del período */}
                        <div className="mb-4">
                            <h2 className="text-lg  text-gray-700 mb-2">Información del período</h2>
                            <div className="flex flex-col gap-1 text-base text-gray-600">
                                <p><span className="font-medium">Mes:</span> {getMonthName(data.mes)}</p>
                                <p><span className="font-medium">Año:</span> {data.anio}</p>
                                {/*      <p><span className="font-medium">Estado:</span> {data.periodos_estado}</p> */}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="n_factura">N° de Factura</label>
                            <input value={input} onChange={(e) => setInput(e.target.value)} id="n_factura" name="n_factura" type="text" className={`${inputBaseStyles} bg-gray-100`} placeholder="2294" />
                            {/* PDF  UPLOADER COMPONENTE*/}
                            <PdfUploader onFileSelect={handleFileReceive} />
                            <button
                                type="submit"
                                className={`w-full ${getBackgroundButtonModalForm(level, domain)} text-white py-3 uppercase font-semibold  rounded-lg text-sm tracking-widest  gothamBook shadow-2xl transition-colors `}
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



const PdfUploader = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const uploadedFile = event.dataTransfer.files[0];

        if (uploadedFile && uploadedFile.type === "application/pdf") {
            setFile(uploadedFile);
            onFileSelect(uploadedFile)
            setError(null);
        } else {
            setError("Solo se permiten archivos PDF.");
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile && uploadedFile.type === "application/pdf") {
            setFile(uploadedFile);
            onFileSelect(uploadedFile)
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