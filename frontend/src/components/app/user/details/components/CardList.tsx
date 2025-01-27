import { PiArrowsLeftRightBold } from "react-icons/pi";
import { formatAmount, getColorIcon, getColorMoneyText } from "../../../../utils/transformData";

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
            className="flex justify-between items-center   border-b border-black/50  p-2  transition-colors"
        >
            <div className="flex items-center space-x-3 ">
                {/* Avatar circle */}
                <PiArrowsLeftRightBold className={`${getColorIcon(level)}`} size={24} />
            </div>
            <div className="flex items-center md:mr-auto md:ml-4 space-x-3">
                {/* Visit info */}
                <div className="flex flex-col  justify-center  ">
                    <div className={`text-[#3E3838] text-sm sm:text-sm font-medium`}>
                        <span className="text-sm sm:text-sm">{name}</span>
                        <span className={`text-[#3E3838]`}> realizó una visita</span>
                    </div>
                    <h1 className={`text-[#6C6C6C] text-xs font-light text-start`}>
                        {date} {time}
                    </h1>
                </div>
            </div>
            {/* Amount */}
            <div className={`${getColorMoneyText(level)} font-semibold text-sm`}>
                {/* +{amount.toLocaleString('es-ES')} */}
                +{formatAmount(amount)}
            </div>
        </li>
    )
}

