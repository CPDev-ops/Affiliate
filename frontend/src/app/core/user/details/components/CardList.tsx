import { PiArrowsLeftRightBold } from "react-icons/pi";
import { formatAmount, getColorIcon, getColorMoneyText } from "../../../../utils/transformData";
import { LevelDto } from "../../../../../types/user";

interface Visit {
    id: number;
    name: string;
    date: string;
    amount: number;
    level: LevelDto
}
export function CardList({ id, amount, date, name, level }: Visit) {
    return (
        <li
            key={id}
            className="flex justify-between items-center text-sm   border-b border-black/50  p-2  transition-colors"
        >
            <div className="flex items-center space-x-3 ">
                {/* Avatar circle */}
                <PiArrowsLeftRightBold className={`${getColorIcon(level)}`} size={24} />
            </div>
            {/* Info de la visita */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mr-auto sm:ml-4 space-y-1 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <div className="flex flex-col justify-center w-full  sm:w-auto">
                    <div className="text-[#3E3838] font-medium leading-tight">
                        <span className="">{name}</span>
                        <span className="text-[#3E3838]"> realizó una visita</span>
                    </div>
                    <h1 className="text-[#6C6C6C] text-xs font-light">{date} Hs</h1>
                </div>
            </div>
            {/* Amount */}
            <div className={`${getColorMoneyText(level)} font-semibold`}>
                {/* +{amount.toLocaleString('es-ES')} */}
                +{formatAmount(amount)}
            </div>
        </li>
    )
}

