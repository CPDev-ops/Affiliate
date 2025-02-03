import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDeviceType } from "../../hook/useDeviceType";
import { LoaderHover } from "../../loaders/Loaders";
import { Footer } from "../auth/components/Footer";
import { IoMdAdd, IoMdClose } from "react-icons/io";
const img = `/images/backgroundImage.png`


export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

export function FormClient({ domain }: { domain: string }) {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [emails, setEmails] = useState<string[]>([''])
    const [accepted, setAccepted] = useState(false)


    function sendData() {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            alert('MAIL ENVIADO CON EXITO')
            navigate('/client/howToGet')
        }, 1000);
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const allValidEmails = emails.every((email) => isValidEmail(email));
        if (allValidEmails && accepted) {
            console.log({ emails, accepted });
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

    const { isDesktop, isMobile, isTablet } = useDeviceType()

    useEffect(() => {
        console.log(emails)
    }, [emails])
    return (
        <div className="min-h-screen flex flex-col   tracking-wider  p-4"
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            {loading && (
                <LoaderHover />
            )}
            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="w-full max-w-md space-y-8 ">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-black/50 z-10    rounded-xl space-y-6">
                        <div className=" p-6 z-20">
                            {/* Logo */}
                            <div className="flex justify-center">
                                <div className="w-f ull    max-w-xs">
                                    <img
                                        src={`/images/negocio-${domain.toLowerCase()}.png`}
                                        alt="Beach Oasis Zarate"
                                        className="w-40 mx-auto   h-auto"
                                    />
                                </div>
                            </div>
                            <h2 className="text-white bisonBoldItallic   text-xl text-center ">
                                INGRESÁ TU MAIL PARA RECIBIR EL PREMIO
                            </h2>
                            <div className="space-y-4">
                                {emails.map((email, index) => (
                                    <div key={index} className="relative w-full">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => handleEmailChange(index, e.target.value)}
                                            placeholder="Mail"
                                            className="w-full p-2 pl-4 pr-10 rounded-full bg-white border border-white/20 text-black placeholder:text-gray-600"
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
                                <button
                                    type="button"
                                    onClick={addEmail}
                                    className="flex items-center border-4 justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg"
                                >
                                    <IoMdAdd size={28} />
                                </button>

                                <label className="flex items-start gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={accepted}
                                        onChange={(e) => setAccepted(e.target.checked)}
                                        className="mt-1"
                                        required
                                    />
                                    <span className="text-[#FFFF00]">Acepto términos y condiciones.</span>
                                </label>
                                <button
                                    type="submit"
                                    className={`w-full ${accepted ? 'bg-[#FF0000] hover:bg-red-700' : 'bg-[#ff000080]'}   text-white py-3 rounded-full text-sm tracking-widest  gothamBook   transition-colors`}
                                >
                                    ENVIAR
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Footer */}
                </div>
            </div>
            <Footer domain={domain} isDesktop={isDesktop} isMobile={isMobile} isTablet={isTablet} />
        </div>
    )
}