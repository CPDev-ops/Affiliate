import { PiArrowsLeftRightBold } from "react-icons/pi";
import { formatAmount } from "../../../../utils/transformData";

interface Visit {
    id: number;
    name: string;
    date: string;
    time: string;
    amount: number;
    level: number
}
export function CardList({ id, amount, date, name, time, level }: Visit) {
    return (
        <li
            key={id}
            className="flex items-center justify-between bg-redCard/0 border-b border-black/50  p-3  transition-colors"
        >
            <div className="flex items-center space-x-3">
                {/* Avatar circle */}
                <PiArrowsLeftRightBold className={`${level === 3 ? 'text-[#FF00FF]' : 'text-[#06DE0E]'}`} size={28} />
                {/* Visit info */}
                <div className="flex flex-col">
                    <div className={`${level !== 0 ? 'text-white' : 'text-black'} text-sm font-medium`}>
                        <span className="text-sm">{name}</span>
                        <span className={`${level !== 0 ? 'text-white' : 'text-stone-800'}`}> realizó una visita</span>
                    </div>
                    <div className={`${level !== 0 ? 'text-zinc-100' : 'text-zinc-600'} text-xs font-light`}>
                        {date} {time}
                    </div> 
                </div>
            </div>
            {/* Amount */}
            <div className={`${level === 4 || level === 5 ? 'text-[#FFFF00]' : 'text-blueSubText'} font-medium`}>
                {/* +{amount.toLocaleString('es-ES')} */}
                +{formatAmount(amount)}
            </div>
        </li>
    )
}

