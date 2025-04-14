import { useEffect, useState } from "react";
import { getGradient } from "../../../client/game/utils/utils";
import {  FaPerson } from "react-icons/fa6";
import { LevelDto } from "../../../../../types/user";
import { CardLoader } from "./CardLoader";

interface CardProps {
    value: string | undefined
    level: LevelDto
    income: number | undefined
}
export function CardCreditsEarned({ value, level, income }: CardProps) {
    const [loading, setLoading] = useState(true); // Estado de carga

    //utilizamos la funcion INTl.NumberFormat
    function formatNumber(value: number) {
        return new Intl.NumberFormat('es-ES').format(value);
    }

    const [valueConvert, setValueConvert] = useState<string>()
    const [incomeConvert, setIncomeConvert] = useState<string>()

    // Usamos useEffect para actualizar el estado solo cuando 'value' cambie
    useEffect(() => {
        if (value !== null && value !== undefined && income !== null && income !== undefined) {
            setValueConvert(formatNumber(parseInt(value)));
            setIncomeConvert(formatNumber(income));
            setLoading(false);
        }
    }, [value, income]); // Dependencia: solo se ejecuta cuando 'value' cambia

    return (
        <div
            className={`bg-gradient-to-b tracking-wider ${getGradient(level)} shadow-2xl lg:flex lg:justify-center rounded-xl w-full p-4`}
        >
            {/* Crédito ganado */}
            <div className="lg:mr-auto">
             
                <div className={`${level !== 0 ? "text-white" : "text-[#3E3838]"} text-lg font-semibold mb-2`}>
                    CRÉDITO GANADO
                </div>
                {loading ? (
                    <CardLoader />
                ) : (
                    <div className={`text-4xl font-semibold tracking-widest mb-4 ${level !== 0 ? "text-white" : "text-[#45087B]"}`}>
                        ${valueConvert}
                    </div>
                )}
            </div>
            {/* Ingresos Totales */}
            <div>
                <div className="lg:mr-auto">
                    <div className="flex justify-start items-center mb-2">
                        <FaPerson className={`text-xl ${level !== 0 ? "text-white" : "text-[#6C6C6C]"}`} />
                        <div className={`${level !== 0 ? "text-white" : "text-[#3E3838]"} text-lg font-semibold`}>
                            INGRESOS TOTALES
                        </div>
                    </div>
                </div>
                <div className="lg:mr-auto">
                    <div className={`lg:hidden ${level !== 0 ? "text-white" : "text-[#6C6C6C]"} text-sm`}>Personas:</div>
                    {loading ? (
                        <CardLoader />
                    ) : (
                        <div className={`text-4xl font-semibold tracking-widest mb-4 ${level !== 0 ? "text-white" : "text-[#45087B]"}`}>
                            {incomeConvert}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
