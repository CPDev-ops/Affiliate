import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { FaUsers, FaUserCircle, FaGamepad } from 'react-icons/fa'

export function AdminApp() {
    const navigate = useNavigate()

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl mx-auto"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 text-white drop-shadow-lg">
                    Seleccionar Módulo
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/client')}
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-[2px]"
                    >
                        <div className="relative flex flex-col items-center gap-2 bg-slate-950/50 backdrop-blur-sm rounded-xl p-4 h-full transition-all group-hover:bg-slate-950/30">
                            <FaUsers className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-300" />
                            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                                Cliente
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/login')}
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-[2px]"
                    >
                        <div className="relative flex flex-col items-center gap-2 bg-slate-950/50 backdrop-blur-sm rounded-xl p-4 h-full transition-all group-hover:bg-slate-950/30">
                            <FaUserCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-300" />
                            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                                Usuario
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/client/game?code=2f3766348f')}
                        className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-[2px]"
                    >
                        <div className="relative flex flex-col items-center gap-2 bg-slate-950/50 backdrop-blur-sm rounded-xl p-4 h-full transition-all group-hover:bg-slate-950/30">
                            <FaGamepad className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-300" />
                            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                                Raspa y Gana
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </motion.button>
                </div>

            </motion.div>
        </main>
    )
}

