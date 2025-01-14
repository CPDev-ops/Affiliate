import { FaUserPlus } from "react-icons/fa";

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
                <div className="p-2  bg-gradient-to-tl from-blueSubText to-blueHover rounded-full flex items-center justify-center">
                    <FaUserPlus className="text-yellowText" size={20} />
                </div>

                {/* Visit info */}
                <div className="flex flex-col">
                    <div className={`${level !== 0 ? 'text-white' : 'text-black'} text-sm font-medium`}>
                        <span className="text-sm">{name}</span>
                        <span className={`${level !== 0 ? 'text-rose-100' : 'text-stone-800'}`}> realizó una visita</span>
                    </div>
                    <div className={`${level !== 0 ? 'text-yellowSubText' : 'text-stone-700'} text-xs font-light`}>
                        {date} {time}
                    </div>
                </div>
            </div>

            {/* Amount */}
            <div className={`${level === 4 || level === 5 ? 'text-yellowSubText' : 'text-blueSubText'} font-medium`}>
                +{amount.toLocaleString()}
            </div>
        </li>
    )
}