import { useState } from "react";
import { motion } from 'framer-motion'
import { LoaderHover } from "../../../../loaders/Loaders";
import axios from "axios";
import { baseUrl } from "../../../../../content/dataDomain";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BiHomeAlt2, BiMenu, BiX } from "react-icons/bi";
import { GrLogout } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";

interface NavAdminProps {
    domain: string;
    name: string
}
export const NavAdmin = ({ domain, name }: NavAdminProps) => {

    return (
        <div className="grid grid-cols-2 gap-4 items-center mb-4 lg:py-2">
            {/* Imagen con tamaño ajustado para mobile */}
            <img
                src={`/images/admin/${domain.toLowerCase()}.png`}
                alt="Logo"
                className={`block rounded-full p-2 h-auto ${domain.toUpperCase() !== 'SALTA' ? 'w-auto sm:w-80' : 'w-20 sm:w-20 lg:w-24'}`}
            />

            {/* Contenedor del Avatar y nombre alineado a la derecha */}
            <div className="flex items-center justify-end">
                <h1 className="text-white/70 hidden sm:block text-xs mr-2">Hola {name}!</h1>
                <AvatarMenu initials={name} />
            </div>
        </div>
    )
}


const AvatarMenu = ({ initials }: { initials: string }) => {
    const navigate = useNavigate()
    const getInitials = (name: string): string => {
        const words = name.trim().split(" ");
        const initials = words.slice(0, 2).map(word => word.charAt(0)).join("");
        return initials.toUpperCase()
    }
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const initialsParsed = getInitials(initials)
    return (
        <div className="relative">
            {/* AVATAR */}
            <div onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 bg-blue-500 hover:bg-blue-700 transition-all duration-100 text-white   flex items-center justify-center rounded-full uppercase cursor-pointer">
                {initialsParsed}
            </div>
            {/* MENU DESPLEGABLE */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 z-50 w-40 border border-gray-300/60 bg-slate-700 shadow-lg rounded overflow-hidden"
                >
                    <ul className=" text-gray-700">
                        <li onClick={() => navigate('/admin/home')} className="px-4 py-2 cursor-pointer hover:bg-slate-800 text-red-600 flex justify-start items-center"> <BiHomeAlt2 className="mr-2" size={20} />Inicio</li>
                        <li onClick={() => navigate('/all/instructive/admin')} className="px-4 py-2 cursor-pointer hover:bg-slate-800 text-red-600 flex justify-start items-center"> <IoDocumentTextOutline className="mr-2" size={20} />Manual de uso</li>
                        <LogoutComponent />
                    </ul>
                </motion.div>
            )}
        </div>
    );
}

const LogoutComponent = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const logout = () => {
        console.log('looog')
        setLoading(true)
        setTimeout(async () => {
            try {
                const response = await axios.get(`${baseUrl}/logout`, { withCredentials: true });
                const data = response.data.message;
                toast.success(data)
                navigate('/login')
            } catch (error: any) {
                if (error.response) {
                    toast.error(error.response.data.error)
                    throw new Error(error.response.data.error);

                } else {
                    toast.error('Error de conexión.')
                    throw new Error('Error de conexión.');
                }
            } finally {
                setLoading(false)
            }
        }, 500);
    }
    return (
        <>
            {loading && (
                <LoaderHover />
            )}
            <li onClick={logout} className="px-4 py-2 cursor-pointer hover:bg-slate-800 text-red-600 flex justify-start items-center"> <GrLogout className="mr-2" size={20} />Cerrar sesión</li>
        </>
    )
}



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#0D1224] px-6 py-4 flex items-center justify-between relative">
            {/* Botón menú hamburguesa en mobile */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white md:hidden"
            >
                {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
            </button>

            {/* Logo en el centro */}
            <div className="hidden md:flex items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="h-6" />
                <span className="text-white font-semibold tracking-wider">OASIS PILAR</span>
            </div>

            {/* Menú responsive */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
                transition={{ duration: 0.3 }}
                className={`absolute top-14 left-0 w-full bg-[#0D1224] md:hidden flex flex-col items-center space-y-4 py-4 shadow-lg transition-all ${isOpen ? "block" : "hidden"}`}
            >
                <a href="#" className="text-white">Dashboard</a>
                <a href="#" className="text-white">Configuración</a>
                <button className="text-red-500">Cerrar sesión</button>
            </motion.div>

            {/* Usuario (siempre visible en desktop) */}
            <div className="flex items-center space-x-2">
                <span className="text-white hidden md:inline">Hola, <strong>Alex!</strong></span>
                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer">
                    AB
                </div>
            </div>
        </nav>
    );
};

export default Navbar;