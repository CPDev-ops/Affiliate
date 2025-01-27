import { getGradient } from "../../../client/game/utils/utils";

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
        <div className={`bg-gradient-to-b ${getGradient(level)}  shadow-2xl lg:flex lg:justify-center  rounded-xl w-full p-4 `}>
            <div className="lg:mr-auto">
                <div className={`${level !== 0 ? 'text-white' : 'text-black'}  text-xl mb-2 `}>CRÉDITO GANADO</div>
                <div className={`text-4xl font-semibold tracking-widest  mb-4 ${level !== 0 ? 'text-white' : 'text-firstColor0'}`}>${valueConvert}</div>
            </div>
            <div className="lg:mr-auto">
                <div className={`${level !== 0 ? 'text-white' : 'text-black'}  text-xl mb-2 `}>INGRESOS TOTALES</div>
                <div className={`text-4xl font-semibold tracking-widest  mb-4 ${level !== 0 ? 'text-white' : 'text-firstColor0'}`}>{incomeConvert}</div>
            </div>
        </div>
    )
}