import { RiCloseLargeFill } from "react-icons/ri"
import { useEffect, useState } from "react"
import { PiUploadSimpleBold } from "react-icons/pi"
import { inputBaseStyles } from "../../../../../utils/css/styles"
import { months } from "../../../../../utils/date"
import { baseUrl } from "../../../../../../content/dataDomain"
import { toast } from "react-toastify"
import { LoaderHover } from "../../../../../loaders/Loaders"

interface ModalProps {
    close: () => void
    data: {
        id: number;
        month: number;
        year: number
    }
    onCloseOk: () => void;

}
export function Modal({ close, data, onCloseOk }: ModalProps) {
    console.log("Modal", data);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const handleFileReceive = (selectedFile: File) => {
        setFile(selectedFile);
    };


    function getCurrentDateFormatted(): string {
        const now = new Date();

        // Obtener componentes de la fecha
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses son 0-11
        const day = String(now.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        console.log(file);
        setLoading(true)
        if (!file) {
            toast.error("Por favor selecciona un archivo PDF.");
            setLoading(false)
            return;
        }
        try {
            const date = getCurrentDateFormatted()
            // Subida del PDF
            const formData = new FormData();
            formData.append("archivo", file);

            const uploadResponse = await fetch(`${baseUrl}/upload_comprobante`, {
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
                id_affiliate_periodos: data.id,
                comprobante_pdf: archivoId,         // ajustá si tenés input
                fecha_pago: date,
            };

            const facturaRes = await fetch(`${baseUrl}/cargar_comprobante`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
                credentials: 'include' as RequestCredentials
            });

            if (!facturaRes.ok) {
                setLoading(false)
                toast.error("Error al guardar factura");
                throw new Error("Error al guardar factura");
            }

            toast.success("Factura cargada correctamente ✅");
            onCloseOk(); // Cierra modal si todo ok
        } catch (error) {
            toast.error("Hubo un error al cargar la factura 😓");
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        console.log(file);
    }, [file])

    return (
        <div className="fixed z-10 inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className={`bg-[#222b3c] w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden`}>
                {loading && (
                    <LoaderHover />
                )}
                <RiCloseLargeFill onClick={close} size={20} className="ml-auto mt-4 text-white cursor-pointer mr-4" />
                <form onSubmit={handleSubmit} className=" z-10    rounded-xl space-y-6">
                    <div className=" p-6 z-20">
                        <h2 className={`text-white my-4 uppercase  text-lg font-semibold tracking-wider text-center `}>
                            Subir Comprobante
                        </h2>
                        <div className="space-y-4">
                            <div className="max-h-[250px] overflow-y-auto space-y-4">
                                <div className="relative w-full">
                                    <label className="text-gray-200 text-base">Período seleccionado</label>

                                    {/* Input para el Mes */}
                                    <div className="min-w-[200px] w-full my-2">
                                        <label className="block mb-1 text-white/60">Mes</label>
                                        <input
                                            type="text"
                                            value={months.find(m => m.number === data.month)?.month || ''}
                                            readOnly
                                            className={`${inputBaseStyles} bg-gray-700`}
                                        />
                                    </div>

                                    {/* Input para el Año */}
                                    <div className="min-w-[200px] w-full my-2">
                                        <label className="block mb-1 text-white/60">Año</label>
                                        <input
                                            type="text"
                                            value={data.year}
                                            readOnly
                                            className={`${inputBaseStyles} bg-gray-700`}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* PDF  UPLOADER COMPONENTE*/}
                            <PdfUploader onFileSelect={handleFileReceive} />
                            <button
                                type="submit"
                                className={`w-full bg-red-600 hover:bg-red-700 text-sm text-white py-2 uppercase  font-semibold  rounded-lg  tracking-widest  gothamBook shadow-2xl transition-colors `}
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
/* bg-gray-700/20  border-gray-300  hover:bg-gray-200/10*/

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
            className="w-full max-w-lg mx-auto p-6  bg-gray-700/20  text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <label
                htmlFor="fileUpload"
                className="cursor-pointer flex flex-col items-center justify-center h-40  border-2 border-dashed border-gray-300  hover:bg-gray-200/10 transition"
            >
                <PiUploadSimpleBold className="text-4xl text-white mb-4" />
                <p className="text-white text-xs">Cargar archivo PDF</p>
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