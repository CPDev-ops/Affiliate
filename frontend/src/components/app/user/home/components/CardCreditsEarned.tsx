import { getGradient } from "../../../../config/getGradient";

interface CardProps {
    value: number
    level: number
}
export function CardCreditsEarned({ value, level }: CardProps) {
    //utilizamos la funcion INTl.NumberFormat
    function formatNumber(value: number) {
        return new Intl.NumberFormat('es-ES').format(value);
    }
    const valueConvert = formatNumber(value)

    return (
        <div className={`bg-gradient-to-b ${getGradient(level)}  shadow-2xl  rounded-xl w-full h-32 p-4 `}>
            <div  className={`${level !== 0 ? 'text-white' : 'text-stone-900'}  text-2xl mb-2 `}>CRÉDITO GANADO</div>
            <div  className={`text-4xl tracking-widest  mb-4 ${level !== 0 ? 'text-white' : 'text-[#CD0101]'}`}>${valueConvert}</div>
        </div>
    )
}