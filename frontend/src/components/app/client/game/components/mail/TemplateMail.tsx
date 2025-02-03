import { useEffect, useState } from "react";
import { ConfettiComponent } from "../../../../../utils/ConfettiComponent";
import { LoaderFetch } from "../Loader";
import { MdOutlineMailOutline } from "react-icons/md";
import { gradientForButtonGeneral } from "../../utils/utils";
import { baseUrl } from "../../../../../../content/dataDomain";
import { Modal } from "../../../../../hook/Modal";
import { ModalError } from "../mod/ModalError";
import { ModalOkMail } from "../mod/ModalOkMail";
import { useNavigate } from "react-router-dom";

type dtoDataEmail = {
    nombre_apellido: string
    celular: string
    email: string
}

interface TemplateMailProps {
    domain: string
}

interface modalValues {
    boolean: boolean
    number: number
}

interface dtoModal {
    title: string
    subTitle: string
}
export function TemplateMail({ domain }: TemplateMailProps) {
    //navegaro de los modals
    const navigate = useNavigate()
    //logic modals
    const [modal, setModal] = useState<modalValues | null>(null)
    const [dataModal, setDataModal] = useState<dtoModal | null>(null)
    const [buttonActivated, setButtonActivated] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    //valores del confetti
    const [confettiActive, setConfettiActive] = useState<boolean>(true)
    const [visible, setVisible] = useState<boolean>(true)
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //suggestion para mostrar las opciones de abajo
    const [suggestions, setSuggestions] = useState<string[]>([])
    //dominios populares para el input
    const popularDomains = ['@gmail.com', '@hotmail.com', '@yahoo.com.ar', '@hotmail.com.ar', '@outlook.com', '@live.com.ar', '@icloud.com']
    // Función para manejar el cambio en el campo de correo electrónico
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
        setButtonActivated(emailRegex.test(value) && isChecked); // Activar botón si el correo es válido y el checkbox está marcado

        // Detectar si el usuario ha escrito un @
        const atIndex = value.indexOf("@");
        if (atIndex !== -1) {
            const typedDomain = value.slice(atIndex); // Lo que está después del @
            if (typedDomain.length > 0) {
                // Filtrar dominios que coincidan con lo tipeado después del @
                const filteredSuggestions = popularDomains.filter((domain) =>
                    domain.startsWith(typedDomain) // Filtrar dominios que comienzan con lo tipeado
                );
                setSuggestions(filteredSuggestions);
            }
        } else {
            // Si no hay @, no mostrar sugerencias
            setSuggestions([]);
        }
    };

    // Función para manejar el cambio en el checkbox
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        setButtonActivated(emailRegex.test(email) && event.target.checked); // Activar botón si el correo es válido y el checkbox está marcado
    };
    // Manejar clic en una sugerencia
    const handleSuggestionClick = (domain: string) => {
        const atIndex = email.indexOf("@");
        const updatedEmail = atIndex !== -1 ? email.slice(0, atIndex) + domain : email + domain;
        setEmail(updatedEmail);
        setSuggestions([]);
    };
    //envio de data
    async function sendData() {
        setLoading(true)
        const data: dtoDataEmail = {
            nombre_apellido: email.split("@")[0],
            celular: "",
            email: email
        };
        const urlencoded = new URLSearchParams();
        urlencoded.append('nombre_apellido', data.nombre_apellido)
        urlencoded.append('celular', data.celular)
        urlencoded.append('email', data.email)
        //creamos la request
        const requestOptions = {
            method: "POST",
            body: urlencoded,
            credentials: 'include' as RequestCredentials,
            mode: "cors" as RequestMode,
            redirect: 'follow' as RequestRedirect
        }
        try {
            const response = await fetch(`${baseUrl}/insertar_accion`, requestOptions)
            const data = await response.json()
            /* const data = 200 */
            switch (data.status_code) {
                case 200:
                    setModal({ boolean: true, number: 200 })
                    setDataModal({ title: 'El premio ya fue enviado', subTitle: 'Checkeá  tu casilla de mail y busca Promociones Oasis Pilar.' })
                    // Aquí puedes agregar la lógica para mostrar un mensaje de éxito o hacer alguna acción adicional

                    break;
                case 403:
                    setModal({ boolean: true, number: 403 })
                    setDataModal({ title: 'Debes jugar para poder recibir el premio', subTitle: 'Se refrescara la pagina y volvera al inicio para poder jugar' })
                    break;
                case 405:
                    setModal({ boolean: true, number: 405 })
                    setDataModal({ title: "Ocurrio un error en el campo requerido(mail)", subTitle: 'Intentelo nuevamente' })
                    break;
                case 404:
                    setModal({ boolean: true, number: 404 })
                    setDataModal({ title: "El formato del correo electronico es invalido", subTitle: "Verifique que su correo electronico este bien escrito" })
                    break;
                case 402:
                    setModal({ boolean: true, number: 402 })
                    setDataModal({ title: '¡Ups! Vemos que ya participaste en esta promocion', subTitle: 'Esta promo es solo para personas que no hayan participado antes' })
                    break;
                case 401:
                    setModal({ boolean: true, number: 401 })
                    setDataModal({ title: 'Por alguna razon el formulario ya ha sido enviado', subTitle: 'Se lo redirigira a otra section' })
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            setModal({ boolean: true, number: 500 })
            setDataModal({ title: 'Error al enviar el correo', subTitle: 'Intente nuevamente ' })
        } finally {
            setLoading(false); // Desactiva el estado de carga después de recibir la respuesta
        }

    }
    function hiddenConfetti() {
        setTimeout(() => {
            setVisible(false)
            setTimeout(() => {
                setConfettiActive(false)
            }, 1000);
        }, 2000);
    }

    useEffect(() => {
        hiddenConfetti()
    }, [])
    return (
        <div className="z-10">
            {/* CONFETTI */}
            <ConfettiComponent visible={visible} active={confettiActive} height={window.innerHeight} width={window.innerWidth - 8} />
            <div className="z-50">
                {loading && ( // Muestra el spinner de carga si isLoading es true
                    <LoaderFetch domain={domain} />
                )}
            </div>
            <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-white text-start mb-4 bisonBoldItallic text-4xl ">INGRESÁ TU DIRECCIÓN DE CORREO <br />
                <span className="text-[#FFFF00]">PARA ENVIARTE TU PREMIO</span>
            </h1>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MdOutlineMailOutline size={24} className="text-gray-700" />
                </span>
                <input type="email"
                    value={email}
                    onChange={handleEmailChange} placeholder="M A I L" className="w-full rounded-full p-2 pl-12 text-black my-2 placeholder:text-gray-400" />
                {/* Sugerencias */}
                {/* Lista de sugerencias */}
                {suggestions.length > 0 && (
                    <ul className="absolute bg-white text-gray-500 border rounded-lg w-full mt-1 z-10">
                        {suggestions.map((domain) => (
                            <li
                                key={domain}
                                onClick={() => handleSuggestionClick(domain)}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                            >
                                {email.split("@")[0]}{domain}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-white text-start ml-2 my-4 texto-inclinado">Recordá que si ya recibiste premios en promociones anteriores, no vas a poder reclamar este premio.
            </h1>
            <div className="flex items-center mb-4 mr-auto mt-4  ml-2 sm:ml-8 sm:mb-12">
                <input
                    onChange={handleCheckboxChange}
                    id="default-checkbox"
                    type="checkbox"
                    checked={isChecked}
                    className="w-4 h-4 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-[#FFFF00] bg-gray-100 border-gray-300 rounded focus:ring-yellow-500  focus:ring-2 "
                />
                <label onClick={() => window.open('/terms')} className="ms-2 ml-4 text-sm  text-[#FFFF00] hover:text-colorYellowMain cursor-pointer underline sm:text-lg">Acepto términos y condiciones</label>
            </div>
            <div className="mr-auto ml-2">
                <button
                    onClick={sendData}
                    disabled={!buttonActivated}
                    /* ${!buttonActivated ? 'cursor-not-allowed' : 'cursor-pointer'} */
                    className={`${buttonActivated ? `${gradientForButtonGeneral(domain.toUpperCase())}` : 'bg-orange-700 bg-opacity-90 text-opacity-50 '}  uppercase rounded-3xl p-2 py-1 shadow-md shadow-black/50 px-[3rem] cursor-pointer `}
                >
                    <h1 className={` text-white text-2xl sm:text-xl bebasNeueRegular texto-inclinado tracking-widest`}>Enviar</h1>
                </button>
            </div>
            {modal?.boolean && modal?.number === 401 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 401 })}>
                    <ModalError domain={domain} buttonText="Continuar" onClose={() => navigate('/client/game/howToGet')} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 403 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError domain={domain} buttonText="Jugar" onClose={() => window.location.reload()} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 402 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 402 })}>
                    <ModalError domain={domain} buttonText="Cerrar" onClose={() => navigate('/client/game/alreadyPlayed')} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 404 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 404 })}>
                    <ModalError domain={domain} buttonText="Volver" onClose={() => setModal({ boolean: false, number: 404 })} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 405 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 405 })}>
                    <ModalError domain={domain} buttonText="Volver" onClose={() => setModal({ boolean: false, number: 405 })} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 200 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 200 })}>
                    <ModalOkMail domain={domain} email={email} onClose={() => { setModal({ boolean: false, number: 200 }), navigate('/howToGet') }} />
                </Modal>
            )}
            {modal?.boolean && modal?.number === 500 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 500 })}>
                    <ModalError domain={domain} buttonText="Volver" onClose={() => { setModal({ boolean: false, number: 500 }) }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
        </div>
    )
}