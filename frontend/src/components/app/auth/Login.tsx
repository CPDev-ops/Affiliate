import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { LoaderHover } from "../../loaders/Loaders";
const img = `/images/backgroundImage.png`

export function Login({ domain }: { domain: string }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    function sendData() {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate('/user/balance')
        }, 1000);
    }
    const [user, setUser] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log({ user, password })
        sendData()
    }
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
                            <div className="w-full    max-w-xs">
                                <img
                                    src={`/images/negocio-${domain.toLowerCase()}.png`}
                                    alt="Beach Oasis Zarate"
                                    className="w-40 mx-auto   h-auto"
                                />
                            </div>
                        </div>
                        <h2 className="text-white    text-xl text-center ">
                            Iniciar Sesion
                        </h2>
                        <div className="space-y-4">
                            {/* USUARIO */}
                            <input
                                type="text"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                placeholder="Usuario"
                                className="w-full p-2 px-4 texto-inclinado rounded-full bg-white/80 border border-white/20 text-black placeholder:text-gray-600"
                                required
                            />
                            {/* PASSWORD */}
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="w-full p-2 px-4 texto-inclinado rounded-full bg-white/80 border border-white/20 text-black placeholder:text-gray-600"
                                required
                            />
                            <button
                                type="submit"
                                className={`w-full bg-[#FF0000] hover:bg-red-700   text-white py-3 rounded-full text-sm tracking-widest  gothamBook uppercase transition-colors`}
                            >
                                Ingresar
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                </div>
            </div>
        </div>
    )
}