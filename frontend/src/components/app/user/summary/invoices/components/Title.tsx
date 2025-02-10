import { getTextByLevel } from "../../../../../utils/transformData"

export const Title = ({ level }: { level: number }) => {
    const color = getTextByLevel(level)//obtenemos el color segun el level de usuario
    return (
        <div className="flex items-center tracking-wider justify-between mb-6">
            <div>
                <h1 className={`text-lg font-bold uppercase  tracking-widest  ${color}`}>Mis Facturas</h1>
                <p className={`${level !== 0 ? 'text-gray-200' : 'text-stone-700'} text-base font-thin  tracking-wider hidden `}>La contabilidad de los objetivos es únicamente mensual.</p>
            </div>
        </div>
    )
}
