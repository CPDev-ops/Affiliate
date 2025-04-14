import { Header } from "./components/Header"
import { CardCreditsEarned } from "./components/CardCreditsEarned"
import { LevelSteps } from "./components/ProgressSteps"
import { useLevel } from "../../../../context/LevelContext"
import { ContainerModules } from "../../../hook/containerModules"
import { Card } from "./components/Card"
import { FaRegCopy, FaRegEdit } from "react-icons/fa"
import { MdOutlineQrCodeScanner } from "react-icons/md"
import { Title } from "./components/TitleCard"
import { useEffect, useState } from "react"
import { ModalForm } from "./components/mod/ModalForm"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { ComponentProp } from "../../../../types/TypePropsComponents"
import { getDataUser } from "../../../../service/get/user/user"
import { LoaderHover } from "../../../loaders/Loaders"
import { AffiliateUserDTO } from "../../../../types/user"

export function Home({ domain, type }: ComponentProp) {
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<AffiliateUserDTO>()
    const [code, setCode] = useState<string>('')
    const fullURL = window.location.origin;
    console.log("URL completa:", fullURL);
    //use navigaate para la redirecion de url por el boton de mostrar qr
    const navigate = useNavigate()
    const { level, setLevel } = useLevel(); // Acceder al valor de 'level'
    //modal que habilita el formulario
    const [modal, setModal] = useState<boolean>(false)
    async function CopyText() {
        try {
            /* PRODUCCION */
            const urlToCopy = `${fullURL}/client/game?code=${user?.codigo_affiliate_user}`;
            // Usamos await para esperar a que se resuelva la promesa
            await navigator.clipboard.writeText(urlToCopy);
            console.log("✅ Enlace copiado al portapapeles:", urlToCopy);
            toast.success('Enlace copiado al portapapeles...');
        } catch (err) {
            console.error("❌ Error al copiar:", err);
            toast.error("No se pudo copiar el enlace. Inténtalo manualmente.");
        }
    }

    const getData = async () => {
        setLoading(true)
        setTimeout(async () => {
            try {
                const response = await getDataUser()
                console.log(response)
                setLevel(response.nivel_alcanzado)
                setUser(response)
                setCode(response.codigo_affiliate_user)
            } catch (error: any) {
                toast.error(error)
            } finally {
                setLoading(false)
            }
        }, 500);
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {loading && (
                <LoaderHover />
            )}
            <ContainerModules type={type} domain={domain}>
                {/* Header */}
                <Header periodoDesde={user?.periodo_desde} periodoHasta={user?.periodo_hasta} userName={user?.nombre_usuario} level={level} />
                <div className="grid grid-cols-1 w-full items-center lg:gap-4 lg:grid-cols-3">
                    <div className="col-span-2 lg:mt-3">
                        {/* CARD QUE MUESTRA EL VALOR DE CREDITOS GANADOS */}
                        <CardCreditsEarned income={user?.ingresos_totales} level={level} value={user?.creditos} />
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
                    <Card onClick={CopyText} level={level} icon={FaRegCopy} title="Compartir link" />
                    <Card onClick={() => navigate(`/user/qr?code=${user?.codigo_affiliate_user}`)} level={level} icon={MdOutlineQrCodeScanner} title="Mostrar Qr" />
                </div>
                {modal && (
                    <ModalForm idAffiliateUser={user?.id_affiliate_user} code={code} close={() => setModal(false)} domain={domain} level={level} />
                )}
            </ContainerModules >
        </>

    )
}
