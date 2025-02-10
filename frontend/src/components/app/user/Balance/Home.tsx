import { Header } from "./components/Header"
import { CardCreditsEarned } from "./components/CardCreditsEarned"
import { LevelSteps } from "./components/ProgressSteps"
import { useLevel } from "../../../../context/LevelContext"
import { ContainerModules } from "../../../hook/containerModules"
import { Card } from "./components/Card"
import { FaRegCopy, FaRegEdit } from "react-icons/fa"
import { MdOutlineQrCodeScanner } from "react-icons/md"
import { Title } from "./components/TitleCard"
import { useState } from "react"
import { ModalForm } from "./components/mod/ModalForm"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { ComponentProp } from "../../../../types/TypePropsComponents"

export function Home({ domain, type }: ComponentProp) {
    const fullURL = window.location.origin;
    console.log("URL completa:", fullURL);
    //use navigaate para la redirecion de url por el boton de mostrar qr
    const navigate = useNavigate()
    const { level } = useLevel(); // Acceder al valor de 'level'
    console.log('forzando build')
    //modal que habilita el formulario
    const [modal, setModal] = useState<boolean>(false)
    function test() {
        /* PRODUCCION */
        /*  const urlToCopy = `${fullURL}/client/game?code=2f3766348f` */
        /* DESARROLLO */
        const urlToCopy = `https://test.oasiszarate.com.ar/client/game?code=2f3766348f`
        navigator.clipboard.writeText(urlToCopy)
            .then(() => {
                console.log("✅ Enlace copiado al portapapeles:", urlToCopy);
                toast.success('Enlace copiado al portapapeles...',)
            })
            .catch(err => {
                console.error("❌ Error al copiar:", err);
                toast.error(" No se pudo copiar el enlace. Inténtalo manualmente.");
            });
    }
    return (
        <ContainerModules type={type} domain={domain}>
            {/* Header */}
            <Header userName="Sofitel Cardales" level={level} />
            <div className="grid grid-cols-1 w-full items-center lg:gap-4 lg:grid-cols-3">
                <div className="col-span-2 lg:mt-3">
                    {/* CARD QUE MUESTRA EL VALOR DE CREDITOS GANADOS */}
                    <CardCreditsEarned income={5} level={level} value={350205} />
                </div>
                {/* CARD DE PROGRESO */}
                <div className="my-4 lg:my-0 col-span-1">
                    <LevelSteps level={level} currentStep={level} totalSteps={5} />
                </div>
            </div>
            <div className="my-2">
                <Title level={level} />
            </div>
            <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card onClick={() => setModal(true)} level={level} icon={FaRegEdit} title="Cargar por formulario" />
                <Card onClick={test} level={level} icon={FaRegCopy} title="Compartir link" />
                <Card onClick={() => navigate('/user/qr')} level={level} icon={MdOutlineQrCodeScanner} title="Mostrar Qr" />
            </div>
            {modal && (
                <ModalForm close={() => setModal(false)} domain={domain} level={level} />
            )}
        </ContainerModules >
    )
}
