import { getGradient } from "../../../client/game/utils/utils";
import { FaPerson } from "react-icons/fa6";

interface CardProps {
    value: number
    level: number
    income: number
}
export function CardCreditsEarned({ value, level, income }: CardProps) {
    //utilizamos la funcion INTl.NumberFormat
    function formatNumber(value: number) {
        return new Intl.NumberFormat('es-ES').format(value);
    }
    const valueConvert = formatNumber(value)
    const incomeConvert = formatNumber(income)


    return (
        <div className={`bg-gradient-to-b tracking-wider ${getGradient(level)}  shadow-2xl lg:flex lg:justify-center  rounded-xl w-full p-4 `}>
            <div className="lg:mr-auto">
                <div className={`${level !== 0 ? 'text-white' : 'text-[#3E3838]'}  text-lg font-semibold mb-2 `}>CRÉDITO GANADO</div>
                <div className={`text-4xl font-semibold tracking-widest  mb-4 ${level !== 0 ? 'text-white' : 'text-[#45087B]'}`}>${valueConvert}</div>
            </div>
            <div>
                <div className="lg:mr-auto">
                    <div className="flex justify-start items-center mb-2">
                        <FaPerson className={`text-xl ${level !== 0 ? 'text-white' : 'text-[#6C6C6C]'}`} />
                        <div className={`${level !== 0 ? 'text-white' : 'text-[#3E3838]'}  text-lg font-semibold  `}>INGRESOS TOTALES</div>
                    </div>
                </div>
                <div className="lg:mr-auto">
                    <div className={`lg:hidden ${level !== 0 ? 'text-white' : 'text-[#6C6C6C]'}  text-sm `}>Personas:</div>
                    <div className={`text-4xl font-semibold tracking-widest  mb-4 ${level !== 0 ? 'text-white' : 'text-[#45087B]'}`}>{incomeConvert}</div>
                </div>
            </div>
        </div>
    )
}