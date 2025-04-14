import { useEffect, useState } from "react";
import { RiLoader4Line } from "react-icons/ri";
import { NavAdmin } from "../home/components/NavAdmin";
import { getAdmin } from "../../../../service/get/admin/admin";
import { GetAdminDataDTO } from "../home/Page";
import { toast } from "react-toastify";
import { ContainerModules } from "../../../hook/containerModules";
import { LoaderHover } from "../../../loaders/Loaders";
import { useParams } from "react-router-dom";

export function Instructive() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false); // Cambiar el estado a false cuando el iframe haya terminado de cargar
    };

    return (
        <div className="w-full h-screen relative ">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div>
                        <RiLoader4Line className='animate-spin mx-auto' size={42} />
                        <p className="text-lg font-semibold text-gray-600 animate-pulse">Cargando instructivo...</p>
                    </div>
                </div>
            )}
            <iframe
                src="https://service-instructions.vercel.app/home?nameApp=affiliate"
                title="Campañas"
                className="
                w-full h-full rounded-md 
                md:scale-75 lg:scale-50 
                md:w-[133.33%] lg:w-[200%]
                md:h-[133.33%] lg:h-[200%]
                origin-top-left
            "
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popus allow-top-navigation"
                onLoad={handleLoad}
            />
        </div>

    )
}


interface ModuleProps {
    domain: string
}
export const ModuleInstructive: React.FC<ModuleProps> = ({ domain }) => {
    //obtener el parametro de type
    const { type } = useParams<{ type: string }>();
    console.log(type);

    //constante que se pasa al navbar 
    const [name, setName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const getName = () => {
        setLoading(true)
        setTimeout(async () => {
            try {
                const response: GetAdminDataDTO = await getAdmin();
                console.log(response)
                setName(response.usuario)
            } catch (error: any) {
                toast.error(error);
            } finally {
                setLoading(false)
            }
        }, 500);
    }
    useEffect(() => {
        getName()
    }, [])
    return (
        type && (
            <ContainerModules type={type} domain={domain}>
                {loading && (
                    <LoaderHover />
                )}
                {type === 'admin' && (
                    <NavAdmin domain={domain} name={name} />
                )}
                <Instructive />
            </ContainerModules>
        )
    )
}