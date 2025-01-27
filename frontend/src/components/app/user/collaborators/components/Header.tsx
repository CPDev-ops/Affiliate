import { getTextByLevel } from "../../../../utils/transformData"

export function Header({ level, length }: { level: number, length: number }) {
    const color = getTextByLevel(level)//obtenemos el color segun el level de usuario
    return (
        <div className="flex items-center tracking-wider justify-between mb-6">
            <div>
                <h1 className={`text-lg font-bold uppercase  tracking-widest  ${color}`}>Mis colaboradores</h1>
                {length > 0 ? (
                    <p></p>
                ) : (

                    <p className={`${level !== 0 ? 'text-gray-200' : 'text-stone-700'} text-base font-thin  tracking-wider  `}>Aún no tienes colaboradores ¡Crea uno!</p>
                )}
            </div>
        </div >
    )
}

