import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { LoaderHover } from "../../loaders/Loaders";
//motion
import { motion } from 'framer-motion'

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
        <div className="min-h-screen flex flex-col justify-between items-center px-4 py-6">
            {loading && (
                <LoaderHover />
            )}
            {/* imagen del titulo con animacino */}
            <motion.div initial={{ y: 300, scale: 1 }} animate={{ y: 30, scale: 1 }} transition={{ duration: 1, ease: 'easeInOut', delay: 1 }} className="flex justify-center w-full pb-6">
                <img
                    src={`/images/login/header.png`}
                    alt="Beach Oasis Zarate"
                    className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4  h-auto"
                />
            </motion.div>
            {/* Formulario en el Centro */}
            <motion.div
                className="flex flex-1 flex-col justify-center items-center w-full max-w-md"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
            >
                <form
                    onSubmit={handleSubmit}
                    className=" p-6 rounded-xl space-y-6 w-full"
                >
                    <h2 className="text-white text-xl text-center mt-6">
                        Iniciar Sesión
                    </h2>
                    <div className="space-y-4">
                        {/* USUARIO */}
                        <input
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            placeholder="Usuario"
                            className="w-full p-2 px-4 rounded-full bg-white border border-white/20 text-black placeholder:text-gray-600"
                            required
                        />
                        {/* PASSWORD */}
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            className="w-full p-2 px-4 rounded-full bg-white border border-white/20 text-black placeholder:text-gray-600"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#FF0000] hover:bg-red-700 text-white py-3 rounded-full text-sm tracking-widest uppercase transition-colors"
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
            </motion.div>

            <LogoAnimation repeatTimes={3} domain={domain} />
        </div >

    )
}

const LogoAnimation = ({ domain, repeatTimes }: { domain: string, repeatTimes: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
            className="flex justify-center w-full pb-6"
        >
            <motion.img
                src={`/images/negocio-${domain.toLowerCase()}.png`}
                alt={domain.toLowerCase()}
                className="w-40 lg:w-32 h-auto"
                animate={{ rotateY: 360 }} // Gira 360° si rotate es true
                transition={{ duration: 1, ease: "easeInOut", repeat: repeatTimes - 1 }} // Duración de la rotación
            />
        </motion.div>
    )
}