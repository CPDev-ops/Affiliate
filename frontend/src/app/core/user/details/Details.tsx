import { Header } from "./components/Header"
import { CardList } from "./components/CardList";
import { useLevel } from "../../../../context/LevelContext";
import { IconBackHome } from "../components/Icon";
import { ContainerModules } from "../../../hook/containerModules";
import { ComponentProp } from "../../../../types/TypePropsComponents";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDetails } from "../../../../service/get/details/details";
import { GetDetailsDTO } from "../../../../types/details";
import { LoaderHover } from "../../../loaders/Loaders";
import { CardListLoader } from "./components/Loader";
export function Balance({ domain, type }: ComponentProp) {
    const { level } = useLevel(); // Acceder al valor de 'level'
    const [details, setDetails] = useState<GetDetailsDTO[] | undefined>()
    const [loading, setLoading] = useState<boolean>(false);
    const getData = async () => {
        setLoading(true);
        try {
            const response = await getDetails();
            console.log(response)
            // Si response es un objeto, lo envolvemos en un array
            setDetails(Array.isArray(response) ? response : [response]);
        } catch (error: any) {
            toast.error(error)
            setDetails([])
        } finally {
            setLoading(false)
        }
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
                {/* HEADER */}
                <IconBackHome level={level} />
                <Header level={level} visits={302} />
                {/* CARD LIST CON LA DATA DE LOS QUE VISITARON */}
                <div className={`max-w-md bg-gradient-to-b bg-white  sm:max-w-4xl lg:max-w-7xl   mx-auto shadow-2xl rounded-xl p-2 `}>
                    <ul className=" max-h-[500px] overflow-y-auto">
                        {loading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                                <CardListLoader key={index} />
                            ))
                        ) : details && details.length > 0 ? (
                            details && details.map((detail) => (
                                <CardList level={level} amount={parseInt(detail.monto_nivel)} date={detail.fecha_conversion} id={detail.id_conversion} name={detail.nombre_apellido} />
                            ))
                        ) : (
                            <div className="py-8 px-4 text-center text-black/70">
                                No hay datos disponibles.
                            </div>
                        )}
                    </ul>
                </div>
            </ContainerModules>
        </>
    )
}