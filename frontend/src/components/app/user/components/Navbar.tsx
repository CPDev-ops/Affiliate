import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
//importamos motion desde la libreria framer
import { motion } from 'framer-motion'
import { ModalLogic } from "../../../logic/Modal";
import { getBackgroundButtonModalForm } from "../../../utils/transformData";
import { TypeDto } from "../../../../types/TypePropsComponents";

interface NavbarProp {
    level: number
    domain: string
    type: TypeDto
}

export function Navbar({ level, domain, type }: NavbarProp) {
    //links para el navigate
    const navLinksUser = [
        { title: " Balance", path: "/user/balance" },
        { title: " Detalles", path: "/user/details" },
        { title: 'Ver Resumenes', path: '/user/summary' },
        { title: "Ver Objetivos", path: "/user/goals" },
        /*         { title: 'Historial', path: '/user/history' }, */
        { title: 'Colaboradores', path: '/user/collaborators' },
        { title: "Cerrar Sesión", path: "/login" },
    ]
    const navLinksAdmin = [
        { title: " MÉTRICAS", path: "/admin/home" },
        { title: " PAGOS", path: "/admin/payments" },
        /*    { title: 'FACTURAS', path: '/admin/invoices' }, */
        { title: "Cerrar Sesión", path: "/" },
    ]
    const navigate = useNavigate()

    //controla si el componente esta montado
    const [isMounted, setIsMounted] = useState<boolean>(false)

    //controla si esta en animacion de salida
    const [isAnimating, setIsAnimating] = useState<boolean>(false)

    //function que despliega el sidebar
    function openSidebar() {
        setIsMounted(true)//monta el componente
    }

    function closeSideBar() {
        setIsAnimating(true)//comienza la animacion de salida
        setTimeout(() => {
            setIsMounted(false)// desmonta el componente despues de la animacion
            setIsAnimating(false)
        }, 0);
    }

    //creamos la configuracion para la animacion del sidebar
    const sidebarVariants = {
        hidden: { x: '100%' },//este comienza afuera del viewPort(derecha)
        visible: { x: 0 },//entra al viewPort
        exit: { x: '100%' }//sale del viewPort
    }

    return (
        <div className={`flex justify-between items-center  lg:py-2    gap-2 `}>
            <img src={level !== 0 ? `/images/user/navbar-${domain.toLowerCase()}.png` : `/images/user/navbar-${domain.toLowerCase()}.png`}
                alt="Logo"
                className={`rounded-full ${domain.toUpperCase() !== 'SALTA' ? '  w-72' : '  w-20 sm:w-24 lg:32 '} p-4 py-2 h-full`} />
            <HiBars3 onClick={openSidebar} size={40} color={`${level !== 0 ? 'black' : 'black'}`} className="mr-4 cursor-pointer  ml-auto" />
            {isMounted && (
                <ModalLogic isOpen={true} onClose={closeSideBar}>
                    {/* Ícono de cierre fuera del fixed */}
                    <div className="fixed top-4 left-4 z-50 cursor-pointer">
                        <MdClose
                            size={52}
                            className={`text-white ${level !== 0 ? 'text-white' : 'text-white'}`}
                            onClick={closeSideBar}
                        />
                    </div>
                    <motion.div variants={sidebarVariants} initial='hidden' animate='visible' exit='exit' transition={{ type: 'tween', duration: 0.3 }} onAnimationComplete={() => {
                        if (isAnimating) {
                            closeSideBar()
                        }
                    }} className={`fixed top-0 ${getBackgroundButtonModalForm(level)} right-0 h-full w-64 pt-12 z-50`}>
                        <ul className="p-4 uppercase space-y-4 text-gray-800">
                            {
                                type === 'user'
                                    ? navLinksUser.map((link, index) => (
                                        <li
                                            key={index}
                                            onClick={() => navigate(link.path)}
                                            className="text-white hover:text-stone-300 py-2 cursor-pointer"
                                        >
                                            {link.title}
                                        </li>
                                    ))
                                    : navLinksAdmin.map((link, index) => (
                                        <li
                                            key={index}
                                            onClick={() => navigate(link.path)}
                                            className="text-white hover:text-stone-300 py-2 cursor-pointer"
                                        >
                                            {link.title}
                                        </li>
                                    ))
                            }

                        </ul>
                    </motion.div>
                </ModalLogic>
            )}
        </div>
    )
}