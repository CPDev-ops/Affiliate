import { RiCloseLargeFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp, IoMdAdd, IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { getBackgroundButtonModalForm, getBorderByLevel, getTextModalFormByLevel } from "../../../../../utils/transformData";
import { LoaderHover } from "../../../../../loaders/Loaders";
import { MdPlaylistAdd } from "react-icons/md";
import { ButtonIcon } from "./components/ButtonIcon";
import { LevelDto } from "../../../../../../types/user";
import axios from "axios";
import { baseUrl } from "../../../../../../content/dataDomain";
import { inputBaseStylesAffiliate, selectBaseStylesAffiliate } from "../../../../../utils/css/styles";
import { toast } from "react-toastify";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { uploadExcel } from "../../../../../../service/post/user";


export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}


interface ModalProps {
    level: LevelDto;
    close: () => void;
    domain: string
    code: string;
    idAffiliateUser: number | undefined
}

interface getPrizesAvailableDTO {
    descripcion_premio: string;
    id_premio: number;
    orden_premio: number;
}

export function ModalForm({ level, close, domain, code, idAffiliateUser }: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState<string[]>([''])
    const [prizes, setPrizes] = useState<getPrizesAvailableDTO[]>([])
    //valor del select para la eleccion de los premios
    const [selected, setSelected] = useState<number | string | null>("");


    async function sendData() {
        setLoading(true)
        //mapeamos los mails a objetos con nombre_apellido (por defecto igual al correo)
        const data = {
            mails: emails.map((email: string) => ({
                email: email,
                nombre_apellido: email.split('@')[0],//ejemplo test@gmail.com === test
                celular: ''
            })),
            id_affiliate_user: idAffiliateUser,
            id_premio: selected
        }
        console.log(data);

        //metodo viejo
        /*    axios.post(`${baseUrl}/enviar_mails`, data, {
               headers: {
                   'Content-Type': 'application/json',
                   Accept: 'application/json'
               }
           }).then(() => {
               toast.success(`!Correos enviados con éxito!`)
           }).catch((error) => {
               console.error('Error al enviar los correos:', error);
               toast.error('Ocurrió un error al enviar los correos.');
           }).finally(() => {
               setLoading(false)
           }) */
        //metodo nuevo
        try {
            await axios.post(`${baseUrl}/enviar_mails`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                withCredentials: true // solo si necesitás que se manden cookies cross-origin
            });
            toast.success(`!Correos enviados con éxito!`)
        } catch (error) {
            console.error('Error al enviar los correos:', error);
            toast.error('Ocurrió un error al enviar los correos.');
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected) {
            toast.error('Por favor seleccione un premio')
            return
        }
        const allValidEmails = emails.every((email) => isValidEmail(email));
        if (allValidEmails) {
            console.log({ emails, selected });
            sendData();
        } else {
            console.log('Invalid Email(s) or Terms not Accepted');
            alert('Por favor ingrese correos válidos y acepte los términos y condiciones');
        }
    };

    //function cambios en input para [] arrays
    const handleEmailChange = (index: number, value: string) => {
        const updateEmails = [...emails];
        updateEmails[index] = value;
        setEmails(updateEmails);
    }
    //agregar input
    const addEmail = () => {
        setEmails([...emails, ''])
    }
    //delete emails
    const removeEmail = (index: number) => {
        const updateEmails = emails.filter((_, i) => i !== index);
        setEmails(updateEmails)
    }

    const getPrize = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${baseUrl}/traer_premios_disponibles`, {
                params: {
                    codigo_affiliate_user: code
                },
                withCredentials: true, // solo si necesitás que se manden cookies cross-origin
            });

            console.log('Premios:', response.data);
            const data = await response.data;
            setPrizes(data)

        } catch (error) {
            console.error('Error al traer los premios:', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPrize()
    }, [])

    useEffect(() => {
        console.log(emails)
    }, [emails])

    return (
        <div className="fixed z-10 inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className={`bg-white w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden`}>
                {loading && (
                    <LoaderHover />
                )}
                <RiCloseLargeFill onClick={close} size={20} className="ml-auto mt-4 text-black mr-4" />
                <form onSubmit={handleSubmit} className=" z-10    rounded-xl space-y-6">
                    <div className=" p-6 z-20">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <div className="w-f ull    max-w-xs">
                                <img
                                    src={`/images/user/modal/${domain.toLowerCase()}.png`}
                                    alt="Beach Oasis Zarate"
                                    className={`${domain.toLowerCase() === 'salta' ? 'w-24' : 'w-32'} mx-auto   h-auto`}
                                />
                            </div>
                        </div>
                        <h2 className={`${getTextModalFormByLevel(level)} bisonBoldItallic my-4  text-3xl text-center `}>
                            Ingresá uno o más mails para
                            enviar el premio
                        </h2>
                        {prizes.length > 0 ? (

                            <CustomSelectPrize onSelect={setSelected} array={prizes} />
                        ) : (
                            <div className="text-center text-gray-500 text-sm mt-4">
                                No hay premios en la campaña actual
                            </div>
                        )}
                        <div className=" space-y-4 my-2">
                            <div>
                                <label htmlFor="email" >Email</label>
                                <div className=" max-h-[250px] overflow-y-auto space-y-4">
                                    {emails.map((email, index) => (
                                        <div key={index} className="relative w-full ">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => handleEmailChange(index, e.target.value)}
                                                placeholder="Mail"
                                                className={`${inputBaseStylesAffiliate} ${getBorderByLevel(level)} `}
                                                required
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 px-1 py-1  text-gray-700 rounded-full hover:bg-gray-900/50 duration-300  focus:outline-none"
                                                    onClick={() => removeEmail(index)}
                                                >
                                                    <IoMdClose size={24} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ButtonIcon color="bg-[#4276FD] hover:bg-[#193C97]" click={addEmail} icon={IoMdAdd} text="Añadir campo" />
                            <ContainerDownloadExcel />
                            <ContainerUploadExcel idAffiliateUser={idAffiliateUser} prize={selected} setLoading={setLoading} />
                            <button
                                type="submit"
                                className={`w-full ${getBackgroundButtonModalForm(level, domain)} text-white py-3 rounded-lg text-sm tracking-widest  gothamBook   transition-colors`}
                            >
                                ENVIAR
                            </button>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    );
}

interface ContainerUploadExcelProps {
    idAffiliateUser: number | undefined;
    prize: number | string | null
    setLoading: (boolean: boolean) => void
}
/* CONTAINER CARGAR LISTA MEDIANTE EXCEL */
const ContainerUploadExcel: React.FC<ContainerUploadExcelProps> = ({ idAffiliateUser, prize, setLoading }) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    //funcion que se ejecuta al hacer click en el boton de cargar lista de mails
    const handleUploadClick = () => {
        fileInputRef.current?.click() //abre el selector de archivos
    }

    //funcion que se ejecuta al seleccionar un archivo
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const file = e.target.files?.[0];
        if (!prize) {
            toast.error('No hay premio asociado al envio de mail')
            setLoading(false)
            if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
            return
        }
        if (!idAffiliateUser) {
            toast.error('Ocurrio un problema con el id_affiliate...')
            setLoading(false)
            if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
            return
        }
        if (!file) {
            toast.error('No hay Archivo asociado')
            setLoading(false)
            if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
            return
        }
        try {
            const response = await uploadExcel({ file: file, id_affiliate_user: idAffiliateUser, id_premio: prize })
            const fileBlob = await response.blob();
            console.log('Blob Type', fileBlob.type)
            console.log('Resultado', response);
            // Intenta obtener el nombre del archivo del header
            const contentDisposition = response.headers.get("Content-Disposition");
            let fileName = "archivo_generado.xlsx"; // Valor predeterminado

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?(.+?)"?$/);
                if (match && match[1]) fileName = match[1];
            }

            // Genera la descarga
            const downloadUrl = URL.createObjectURL(fileBlob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl); // buena práctica
            toast.success("Archivo generado correctamente ✅", {
                position: "top-center",
            });
            /* downloadArchive(); */ // Si querés lanzar otra descarga o notificación
        } catch (error) {
            console.error('Fallo el upload', error)
        } finally {
            setLoading(false)
            if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
        }
    }

    /*     function downloadArchive() {
            window.open(`${baseUrl}/export_excel`);
            toast.success('¡Todo salió correcto!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
     */
    return (
        <>
            <input type="file" accept=".xlsx, .xls" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <ButtonIcon color="bg-[#005B3A] hover:bg-[#045135]" click={handleUploadClick} icon={MdPlaylistAdd} text="Subir lista de correos (envío automático)" />
        </>
    )
}



/* Container Download Excel */
export const ContainerDownloadExcel = () => {

    const handleDownload = () => {
        alert('Descargando Excel de ejemplo...')
    }
    return (
        <ButtonIcon color="bg-cyan-700" click={handleDownload} icon={PiMicrosoftExcelLogoFill} text="Descargar excel de ejemplo" />
    )
}


/* SELECT para premios */

interface CustomSelectProps {
    array: getPrizesAvailableDTO[]
    onSelect: (value: number | string | null) => void
}
export function CustomSelectPrize({ array, onSelect }: CustomSelectProps) {
    const [selected, setSelected] = useState<number | string | null>("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: number | string | null) => {
        setSelected(value);
        onSelect(value); // enviar al padre
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left w-full">
            <label htmlFor="prize">Premios</label>
            {/* Botón del select */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`${selectBaseStylesAffiliate} flex justify-between items-center`}
            >
                {selected
                    ? array.find(opt => opt.id_premio === selected)?.descripcion_premio
                    : "Elegir una opción"}
                {isOpen ? (
                    <IoIosArrowUp className="text-blue-600 text-sm ml-2" />
                ) : (
                    <IoIosArrowDown className="text-blue-600 text-sm ml-2" />
                )}
            </button>

            {/* Dropdown de opciones */}
            {isOpen && (
                <ul className="absolute w-full bg-white border border-gray-300 shadow-md rounded-md mt-1 z-10 max-h-60 overflow-auto">
                    {array.map((option) => (
                        <li
                            key={option.id_premio}
                            onClick={() => handleSelect(option.id_premio)}
                            className="px-3 py-2 cursor-pointer hover:bg-blue-100 text-xs text-gray-900"
                        >
                            {option.descripcion_premio}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}




interface EmailInputProps {
    emails: string[];
    setEmails: React.Dispatch<React.SetStateAction<string[]>>;
    level: LevelDto
}

export const EmailInput = ({ emails, setEmails, level }: EmailInputProps) => {
    const [inputValue, setInputValue] = useState("");
    const [invalidEmails, setInvalidEmails] = useState<string[]>([]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Procesa correos pegados o tipeados manualmente
    const processEmails = (text: string) => {
        const rawEmails = text.split(/[\s,]+/).map((email) => email.trim());
        const validEmails: string[] = [];
        const invalidEntries: string[] = [];

        rawEmails.forEach((email) => {
            if (emailRegex.test(email)) {
                if (!emails.includes(email)) validEmails.push(email); // Evita duplicados
            } else if (email.length > 0) {
                invalidEntries.push(email);
            }
        });

        setEmails((prev) => [...prev, ...validEmails]);
        setInvalidEmails((prev) => [...prev, ...invalidEntries]);
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData("text");
        processEmails(pastedText);
        setInputValue(""); // Limpia el input
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            processEmails(inputValue);
            setInputValue(""); // Limpia el input después de agregar
        }
    };

    return (
        <div className="max-w-lg mx-auto text-xs p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-base font-bold mb-2">Ingresa correos:</h2>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                placeholder="Pega/escribe correos y presiona Enter"
                className={`w-full p-2 pl-4 pr-10 rounded-lg bg-[white] border ${getBorderByLevel(level)}  text-black placeholder:text-gray-600 `}
            />
            <div className="mt-4">
                <h3 className="font-semibold">Correos válidos:</h3>
                <div className="flex flex-wrap max-h-[200px] overflow-y-auto gap-2 mt-2">
                    {emails.map((email) => (
                        <span
                            key={email}
                            className="px-3 py-1 bg-green-200 text-green-700 rounded-full  flex items-center"
                        >
                            {email}
                            <button
                                className="ml-2 text-red-500 hover:text-red-700"
                                onClick={() =>
                                    setEmails((prev) => prev.filter((e) => e !== email))
                                }
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {invalidEmails.length > 0 && (
                <div className="mt-4 max-h-[100px] overflow-y-auto">
                    <h3 className="font-semibold text-red-600">No válidos (no se agregan):</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {invalidEmails.map((email, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-red-200 text-red-700 rounded-full "
                            >
                                {email}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};