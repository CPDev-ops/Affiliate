import { Header } from "./components/Header";
import { Card } from "./components/Card";


import { useLevel } from "../../../../context/LevelContext";
import { IconBackHome } from "../components/Icon";
import { ContainerModules } from "../../../hook/containerModules";
import { ComponentProp } from "../../../../types/TypePropsComponents";
import { useEffect, useState } from "react";
import { getGoals, mapGoalsWithStyles } from "../../../../service/get/goals/goals";
import { GoalsDTO } from "../../../../types/goals";
import { toast } from "react-toastify";
import { LoaderHover } from "../../../loaders/Loaders";


export function Goals({ domain, type }: ComponentProp) {
    console.log(type)
    const { level } = useLevel(); // Acceder al valor de 'level'
    const [levels, setLevels] = useState<GoalsDTO[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const getData = async () => {
        setLoading(true)
        try {
            const response = await getGoals();
            console.log(response);
            const mappedData = mapGoalsWithStyles(response);
            console.log(mappedData)
            setLevels(mappedData)
        } catch (error: any) {
            toast.error(error)
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
                <IconBackHome level={level} />
                <Header level={level} />
                <div className="max-w-md sm:max-w-4xl lg:max-w-7xl mx-auto   h-[700px] overflow-y-auto">
                    <ul className="space-y-4">
                        {loading ? (
                            [1, 2, 3, 4, 5].map((_, index) => <CardLoading key={index} />)
                        ) : (
                            levels && levels.map((levelDate, index) => (
                                <Card
                                    index={index + 1}
                                    userLevel={level}
                                    colorText={levelDate.textColor || "text-gray-700"} // 🔥 Evita undefined
                                    img={levelDate.img || ""} // 🔥 Evita undefined
                                    colorBorder={levelDate.colorBorder || "border-gray-400"}
                                    bgColor={levelDate.bgColor || "from-gray-300 to-gray-600"}
                                    credits={levelDate.monto_nivel}
                                    level={levelDate.id_affiliate_niveles}
                                    range={`de ${levelDate.cantidad_desde} a ${levelDate.cantidad_hasta} personas`}
                                />
                            ))
                        )}

                    </ul>
                </div>
            </ContainerModules>
        </>
    )
}

const CardLoading = () => {
    return (
        <div className="relative w-full animate-pulse">
            {/* Título (Nivel) */}
            <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>

            <div className="relative overflow-hidden rounded-xl bg-gray-400 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0" />

                <div className="relative flex items-center text-white p-4 gap-4">
                    {/* Icono (Imagen de nivel) */}
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                    </div>

                    {/* Contenido (Monto) */}
                    <div className="flex flex-col items-center justify-between">
                        <div className="h-4 w-16 bg-gray-300 rounded"></div>
                        <div className="h-3 w-20 bg-gray-300 rounded mt-1"></div>
                    </div>

                    {/* Objetivos de afiliación */}
                    <div className="flex flex-col items-center justify-between ml-auto">
                        <div className="h-3 w-24 bg-gray-300 rounded"></div>
                        <div className="h-3 w-32 bg-gray-300 rounded mt-1"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}