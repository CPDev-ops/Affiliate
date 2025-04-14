import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import {FiChevronRight} from "react-icons/fi"
import { toast } from "react-toastify"
import { motion } from 'framer-motion'

export function FormOasis() {
    /* const [page, setPage] = useState(2)
    const totalPages = 3 */
    const [active, setActive] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    function send() {
        if (!active) {
            toast.warning('Debes Aceptar terminos...')
            setIsOpen(true)
            return
        }
        toast.success('Formulario Enviado')
    }
    return (
        <div className="min-h-screen bg-pink-100 flex flex-col items-center py-8 px-4">
            {/* Header con logo */}
            <div className="w-full max-w-2xl bg-red-600 rounded-t-lg p-4 flex items-center">
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="white" />
                            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="red" />
                            <polygon points="50,30 70,40 70,60 50,70 30,60 30,40" fill="white" />
                        </svg>
                    </div>
                    <div className="text-white">
                        <h1 className="font-bold text-xl">CLUB OASIS</h1>
                        <div className="text-xs">
                            <p>BINGO PILAR S.A.</p>
                            <p>Ruta Panamericana Pilar Km 50.400</p>
                            <p>Del Viso</p>
                            <p>Provincia de Buenos Aires</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Título del formulario */}
            <div className="w-full max-w-2xl bg-white p-6 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-800">CLUB OASIS</h2>
                {/*      <div className="flex items-center text-sm text-gray-600 mt-4">
                    <span>alex.becci@bingopilar.com.ar</span>
                    <button className="ml-2 text-blue-600 hover:underline">Cambiar de cuenta</button>
                    <div className="ml-auto">
                        <button className="text-gray-500">
                            <FiInfo className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                    <span>No compartido</span>
                </div> */}
            </div>

            {/* Indicador de campos obligatorios */}
            {/*  <div className="w-full max-w-2xl bg-white p-4 border-b border-gray-200">
                <p className="text-sm text-red-500">* Indica que la pregunta es obligatoria</p>
            </div> */}

            {/* Campos del formulario */}
            <div className="w-full max-w-2xl mt-4">
                {/* Campo: Nombre  */}
                <div className="bg-white p-6 mb-3 rounded-lg shadow-sm">
                    <div className="mb-2 flex items-start">
                        <label htmlFor="nombre" className="text-sm font-medium">
                            NOMBRE
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                    </div>
                    <input
                        id="nombre"
                        placeholder="Tu respuesta"
                        className="w-full border-b border-t-0 border-l-0 border-r-0 border-gray-300 rounded-none focus:outline-none focus:border-blue-500 px-0 py-1"
                    />
                </div>
                <div className="bg-white p-6 mb-3 rounded-lg shadow-sm">
                    <div className="mb-2 flex items-start">
                        <label htmlFor="apellido" className="text-sm font-medium">
                            APELLIDO
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                    </div>
                    <input
                        id="apellido"
                        placeholder="Tu respuesta"
                        className="w-full border-b border-t-0 border-l-0 border-r-0 border-gray-300 rounded-none focus:outline-none focus:border-blue-500 px-0 py-1"
                    />
                </div>
                {/* Campo: DNI/CI/LC/PASS */}
                <div className="bg-white p-6 mb-3 rounded-lg shadow-sm">
                    <div className="mb-2 flex items-start">
                        <label htmlFor="dni" className="text-sm font-medium">
                            DNI/C.I/L.C/PASS Nº
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                    </div>
                    <input
                        id="dni"
                        placeholder="Tu respuesta"
                        className="w-full border-b border-t-0 border-l-0 border-r-0 border-gray-300 rounded-none focus:outline-none focus:border-blue-500 px-0 py-1"
                    />
                </div>

                {/* Campo: Fecha de nacimiento */}
                <div className="bg-white p-6 mb-3 rounded-lg shadow-sm">
                    <div className="mb-2 flex items-start">
                        <label htmlFor="fecha" className="text-sm font-medium">
                            FECHA DE NACIMIENTO
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                    </div>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">Fecha</p>
                        <div className="flex items-center">
                            <input
                                id="fecha"
                                type="date"
                                placeholder="dd/mm/aaaa"
                                className="border border-gray-300 rounded px-2 py-1 w-40 focus:outline-none focus:border-blue-500"
                            />
                            {/*   <FiCalendar className="ml-2 w-5 h-5 text-gray-400" /> */}
                        </div>
                    </div>
                </div>

                {/* Campo: Teléfono celular */}
                <div className="bg-white p-6 mb-3 rounded-lg shadow-sm">
                    <div className="mb-2 flex items-start">
                        <label htmlFor="telefono" className="text-sm font-medium">
                            TELÉFONO CELULAR
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                    </div>
                    <input
                        id="telefono"
                        placeholder="Tu respuesta"
                        className="w-full border-b border-t-0 border-l-0 border-r-0 border-gray-300 rounded-none focus:outline-none focus:border-blue-500 px-0 py-1"
                    />
                </div>

                {/* Campo: Email */}
                <div className="bg-white p-6 mb-3 rounded-lg shadow-sm">
                    <div className="mb-2 flex items-start">
                        <label htmlFor="email" className="text-sm font-medium">
                            EMAIL
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                    </div>
                    <input
                        id="email"
                        type="email"
                        placeholder="Tu respuesta"
                        className="w-full border-b border-t-0 border-l-0 border-r-0 border-gray-300 rounded-none focus:outline-none focus:border-blue-500 px-0 py-1"
                    />
                </div>
                {/* CONFIRMACION MAIL */}
                <div className="bg-white p-6 mb-3 rounded-lg shadow-sm">
                    <div className="mb-2 flex items-start">
                        <label htmlFor="email" className="text-sm font-medium">
                            CONFIRMAR EMAIL
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                    </div>
                    <input
                        id="email"
                        type="email"
                        placeholder="Tu respuesta"
                        className="w-full border-b border-t-0 border-l-0 border-r-0 border-gray-300 rounded-none focus:outline-none focus:border-blue-500 px-0 py-1"
                    />
                </div>
            </div>
            <div className="w-full max-w-2xl bg-white p-6 mb-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base font-medium">IMPORTANTE</h3>
                    <div className="flex items-center">
                        <button
                            className="p-1 text-gray-500 hover:bg-gray-100 rounded-full ml-1"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <FaChevronUp className="w-5 h-5" /> : <FaChevronDown className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="text-xs text-gray-700 leading-relaxed">
                        <p>
                            Por medio de la presente solicito la adhesión al programa CLUB OASIS dejando constancia que he sido informado del alcance de los Términos y Condiciones. Asimismo, presto mi expreso consentimiento para el tratamiento, en los términos de la Ley de Protección de Datos Personales (Nº25.326), y demás normativa aplicable, de los datos por mí provistos exclusivamente para hacerme llegar promociones comerciales a ser realizadas eventualmente por parte de la Empresa. He sido informado/a que tendré la posibilidad de solicitar gratuitamente la rectificación/ suspensión/ retiro y/o bloqueo de los datos suministrado/s en el Stand de Atención al Cliente ubicado en la Sala (Panamericana KM 50,400, Pilar, Bs. As.). No es un sistema de apuesta directa, no da crédito. Prohibido el ingreso a menores de 18 años. Bingo Pilar S.A es una entidad autorizada por Loterías y Casinos de la Provincia de Buenos Aires.
                        </p>
                    </div>

                    <div className="w-full max-w-2xl mt-4 flex items-center justify-between">
                        <button
                            onClick={() => {
                                setActive(true);
                                toast.success('Términos Aceptados');
                            }}
                            className="flex items-center text-xs ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                        >
                            Acepto
                            <FiChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </motion.div>
            </div>
            {/* Navegación y progreso */}
            <div className="w-full max-w-2xl mt-4 flex items-center justify-between">
                {/*  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
                    <FiChevronLeft className="w-4 h-4 mr-1" />
                    Atrás
                </button> */}
                {/*   <div className="flex-1 mx-4 flex items-center">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600" style={{ width: "66%" }}></div>
                    </div>
                    <span className="ml-4 text-sm text-gray-600">
                        Página {page} de {totalPages}
                    </span>
                </div> */}
                <button onClick={send} className={`flex items-center ml-auto px-4 py-2 ${active ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600/40 cursor-not-allowed '} text-white rounded-md`}>
                    Enviar
                    <FiChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>

            {/* Botón para borrar formulario */}
            {/*  <div className="w-full max-w-2xl mt-2 flex justify-end">
                <button className="text-red-600 hover:text-red-800">Borrar formulario</button>
            </div> */}

            {/* Footer */}
            <div className="w-full max-w-2xl mt-8 text-center text-xs text-gray-500">
                <p>Nunca envíes contraseñas a través de Formularios de Google.</p>
                <p className="mt-2">Este formulario se creó en Bingo Pilar S.A.</p>
                {/*   <p>
                    <span>¿Does this form look suspicious? </span>
                    <a href="#" className="text-blue-600 hover:underline">
                        Informar
                    </a>
                </p> */}
                {/* <div className="mt-4 flex justify-center">
                    <span className="text-gray-400">Google Formularios</span>
                </div> */}
            </div>
        </div>
    )
}

