import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { domain } from "../../../content/dataDomain";
import { useDeviceType } from "../../hook/useDeviceType";
import { LoaderHover } from "../../loaders/Loaders";
import { Footer } from "../auth/components/Footer";
const img = `/images/backgroundImage.png`
const logoDomain = `/images/${domain.toLowerCase()}/logo-dominio.png`

export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

export function FormClient() {
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    function sendData() {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            alert('MAIL ENVIADO CON EXITO')
            navigate('/client/howToGet')
        }, 1000);
    }

    const [email, setEmail] = useState('')
    const [accepted, setAccepted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isValidEmail(email) && accepted) {
            //handle form submission
            console.log({ email, accepted })
            sendData()
        }
        else {
            console.log('Invalid Email or Terms not Accpeted')
            alert('Por favor ingrese un mail valido y acepte los terminos y condiciones')
        }
    }
    
    const { isDesktop, isMobile, isTablet } = useDeviceType()

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
                    <form onSubmit={handleSubmit} className="bg-black   p-6 rounded-xl space-y-6">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <div className="w-f ull    max-w-xs">
                                <img
                                    src={logoDomain}
                                    alt="Beach Oasis Zarate"
                                    className="w-40 mx-auto   h-auto"
                                />
                            </div>
                        </div>
                        <h2 className="text-white bisonBoldItallic   text-xl text-center ">
                            INGRESÁ TU MAIL PARA RECIBIR EL PREMIO
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu mail"
                                className="w-full p-2 px-4 texto-inclinado rounded-full bg-white/80 border border-white/20 text-black placeholder:text-gray-600"
                                required
                            />
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
                    </form>

                    {/* Footer */}
                </div>
            </div>
            <Footer isDesktop={isDesktop} isMobile={isMobile} isTablet={isTablet} />
        </div>
    )
}