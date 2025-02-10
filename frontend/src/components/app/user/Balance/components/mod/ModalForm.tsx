import { RiCloseLargeFill } from "react-icons/ri";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { getBackgroundButtonModalForm, getBorderByLevel, getTextModalFormByLevel } from "../../../../../utils/transformData";
import { LoaderHover } from "../../../../../loaders/Loaders";
import { MdPlaylistAdd } from "react-icons/md";
import { ButtonIcon } from "./components/ButtonIcon";


export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}


interface ModalProps {
    level: number;
    close: () => void;
    domain: string
}

export function ModalForm({ level, close, domain }: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState<string[]>([''])
    function sendData() {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            alert('MAIL ENVIADO CON EXITO')
            /*  navigate('/client/howToGet') */
        }, 1000);
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const allValidEmails = emails.every((email) => isValidEmail(email));
        if (allValidEmails) {
            console.log({ emails });
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

    /*  const { isDesktop, isMobile, isTablet } = useDeviceType() */

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
                                    src={`/images/user/navbar-${domain.toLowerCase()}.png`}
                                    alt="Beach Oasis Zarate"
                                    className="w-24 mx-auto   h-auto"
                                />
                            </div>
                        </div>
                        <h2 className={`${getTextModalFormByLevel(level)} bisonBoldItallic my-4  text-3xl text-center `}>
                            Ingresá uno o más mails para
                            enviar el premio
                        </h2>
                        <div className="space-y-4">
                            <div className=" max-h-[250px] overflow-y-auto space-y-4">
                                {emails.map((email, index) => (
                                    <div key={index} className="relative w-full ">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => handleEmailChange(index, e.target.value)}
                                            placeholder="Mail"
                                            className={`w-full p-2 pl-4 pr-10 rounded-lg bg-[white] border ${getBorderByLevel(level)}  text-black placeholder:text-gray-600`}
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
                            {/*   <EmailInput level={level} emails={emails} setEmails={setEmails} /> */}
                            <ButtonIcon color="bg-[#4276FD] hover:bg-[#193C97]" click={addEmail} icon={IoMdAdd} text="Añadir campo" />
                            <ButtonIcon color="bg-[#005B3A] hover:bg-[#045135]" click={() => {
                                alert('Cargando'), setEmails([
                                    'ejemplo@ej.com',
                                    'lorem@lorem.com',
                                    'test@test.com',
                                    'usuario1@gmail.com',
                                    'prueba@hotmail.com',
                                    'correo@dominio.com',
                                    'admin@admin.com',
                                    'info@empresa.com',
                                    'soporte@soporte.com',
                                    'contacto@pagina.com',
                                    'ventas@negocio.com',
                                    'cliente@tienda.com',
                                    'notificaciones@sistema.com',
                                    'usuario2@yahoo.com',
                                    'developer@tech.com',
                                    'marketing@empresa.com',
                                    'reservas@hotel.com',
                                    'suscripciones@web.com',
                                    'consultas@helpdesk.com',
                                    'asistente@corporativo.com'
                                ])
                            }} icon={MdPlaylistAdd} text="Cargar lista de mails" />
                            <button
                                type="submit"
                                className={`w-full ${getBackgroundButtonModalForm(level)} text-white py-3 rounded-lg text-sm tracking-widest  gothamBook   transition-colors`}
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



interface EmailInputProps {
    emails: string[];
    setEmails: React.Dispatch<React.SetStateAction<string[]>>;
    level: number
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