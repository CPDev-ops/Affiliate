import { useEffect, useState } from "react"
import { useDeviceType } from "../../../hook/useDeviceType"
import { Footer } from "../../auth/components/Footer"
import { ScratchRaspada } from "./components/Scratch"
import { LoaderFetch } from "./components/Loader"
import { TemplateMail } from "./components/mail/TemplateMail"
import { useNavigate } from "react-router-dom"
import { ModalAge } from "./components/mod/ModalAge"
import { getQueryParam, getTextHeader } from "../../../utils/changedDomainPage"
import { ImageHome } from "./components/ImageComponent"
import { getBackgroundImage } from "./utils/utils"

const imageHeader = `/images/client/game/header.png`
const imgRaspada = `/images/client/game/raspada.png`

interface GameModuleProps {
    domain: string
}
export function GameModule({ domain }: GameModuleProps) {
    //obtenemos el dato
    const code = getQueryParam('code')
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const { isDesktop, isMobile, isTablet } = useDeviceType()
    //importamos la imagen segun la resolucion
    const backgroundImage = getBackgroundImage({ isDesktop, isTablet })

    const [viewTemplateMail, setViewTemplateMail] = useState<boolean>(false)
    //booleano que maneja el fetch para no hacer consultas inecesarias
    const [fetchPrize, setFetchPrize] = useState<boolean>(false);

    //modal para menor de edad
    const [modal, setModal] = useState<boolean>(false)
    function changedTemplate() {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setViewTemplateMail(true)
        }, 1500);
    }

    const handleAgeConfirmation = () => {
        localStorage.setItem('isAdult', 'true');
        setModal(false)
        setFetchPrize(true)
    };

    const handleAgeRejection = () => {
        localStorage.removeItem('isAdult');
        setModal(false)
        navigate('/minorAge');
    };

    useEffect(() => {
        const isAdult = localStorage.getItem('isAdult');
        console.log('data,', isAdult)
        if (isAdult !== 'true') {
            setModal(true)
        }
        else {
            setFetchPrize(true)
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col   tracking-wider  p-4 relative"
        >
            <div className="absolute z-0 inset-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: '50%'
                }}>
            </div>
            {loading && (
                <LoaderFetch domain={domain} />
            )}
            <div className="flex-1 z-30 flex flex-col justify-center items-center">
                <div className="w-full max-w-md sm:max-w-xl lg:max-w-2xl space-y-8 ">
                    {!viewTemplateMail ? (
                        <div>
                            {/* HEADER */}
                            <Header />
                            <Title domain={domain} />
                            {/* SCRATCH */}
                            {code && (
                                <ScratchRaspada domain={domain} code={code} buttonGetPrize={changedTemplate} fetchPrize={fetchPrize} imgRaspado={imgRaspada} />
                            )}
                        </div>
                    ) : (
                        <div className="z-50"> <TemplateMail domain={domain} /></div>
                    )}
                </div>
            </div>
            <ImageHome domain={domain} />
            <Footer domain={domain} isDesktop={isDesktop} isMobile={isMobile} isTablet={isTablet} />
            {modal && (
                <ModalAge domain={domain} onClose={handleAgeRejection} onCloseOk={handleAgeConfirmation} title="¿SOS MAYOR DE 18 AÑOS?" />
            )}
        </div>
    )
}




function Header() {
    return (
        <div className="w-72 sm:w-full lg:w-[80%] mx-auto  z-40">
            <img
                src={imageHeader}
                className="w-full  my-6 mx-auto"
                alt="Titulo Alterno"
            />
        </div>
    )
}
function Title({ domain }: { domain: string }) {
    return (
        <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-white text-center text-base sm:text-lg lg:text-xl mb-4">RASPÁ EL LOGO Y <span className="text-[#FFFF00]">DESCUBRÍ TU PREMIO </span>
            PODÉS GANAR HASTA $15.000 PARA VISITAR <br />
            {getTextHeader(domain.toUpperCase())}</h1>
    )
}