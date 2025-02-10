import { IconType } from "react-icons"; // Importamos el tipo para íconos
import { getBorderByLevel, getTextByLevel } from "../../../../utils/transformData";
import { getGradient } from "../../../client/game/utils/utils";

interface CardProps {
    title: string;
    icon: IconType; // Definimos el tipo del icono
    level: number
    onClick: () => void
}

export function Card({ icon: Icon, title, level, onClick }: CardProps) {

    const color = getTextByLevel(level)
    const border = getBorderByLevel(level)
    return (
        <div onClick={onClick} className={`bg-gradient-to-b hover:scale-95 duration-300   ${getGradient(level)}  flex justify-between border ${border} items-center p-4 rounded-2xl shadow-xl`}>
            <h1 className={`text-sm ${level !== 0 ? 'text-white' : 'text-[#3E3838]'}`}>{title}</h1>
            <Icon className={`text-2xl ${level !== 0 ? 'text-white' : color}  ${color}`} /> {/* Renderiza el ícono */}
        </div>
    );
}
