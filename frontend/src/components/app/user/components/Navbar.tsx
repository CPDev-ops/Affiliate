import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
//importamos motion desde la libreria framer
import { motion } from 'framer-motion'
import { ModalLogic } from "../../../logic/Modal";
import { domain } from "../../../../content/dataDomain";
import { getColorNav } from "../../../config/getGradient";

const navbarImage = `/images/navbar-${domain.toLowerCase()}.png`
const navbarImageInit = `/images/navbar-${domain.toLowerCase()}-dark.png`

interface NavbarProp {
    level: number
}

export function Navbar({ level }: NavbarProp) {
    //links para el navigate
    const navLinks = [
        { title: "Home", path: "/user/home" },
      /*   { title: "Canjear Créditos", path: "/user/home" }, */
        { title: "Ver Balance", path: "/user/balance" },
        { title: "Objetivos", path: "/user/goals" },
        { title: "Cerrar Sesión", path: "/login" },
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
        <div className={`flex justify-between items-center  lg:py-2 ${getColorNav(level)} shadow-md shadow-black/35   gap-2 `}>
            <img src={level !== 0 ? navbarImage : navbarImageInit}
                alt="Logo"
                className="rounded-full hidden w-72 p-4 py-2 h-full" />
            <HiBars3 onClick={openSidebar} size={40} color={`${level !== 0 ? 'white' : 'black'}`} className="mr-4 cursor-pointer  ml-auto" />
            {isMounted && (
                <ModalLogic isOpen={true} onClose={closeSideBar}>
                    <motion.div variants={sidebarVariants} initial='hidden' animate='visible' exit='exit' transition={{ type: 'tween', duration: 0.3 }} onAnimationComplete={() => {
                        if (isAnimating) {
                            closeSideBar()
                        }
                    }} className={`fixed top-0 right-0 h-full w-64 ${getColorNav(level)} shadow-lg z-50`}>
                        <div className="flex justify-between items-center p-4 border-b">
                            {/*     <h2 className="text-lg font-bold">Menú</h2> */}
                            <MdClose
                                size={24}
                                className={`cursor-pointer ml-auto ${level !== 0 ? ' text-white' : ' text-gray-700'}`}
                                onClick={closeSideBar}
                            />
                        </div>

                        <ul className="p-4 uppercase space-y-4 text-gray-800">
                            {navLinks.map((link, index) => (
                                <li key={index} onClick={() => navigate(link.path)} className={`${level!==0?'text-white hover:text-red-100':'text-black hover:text-stone-700'} border-b py-1 cursor-pointer `}>{link.title}</li>
                            ))}
                        </ul>
                    </motion.div>
                </ModalLogic>
            )}
        </div>
    )
}