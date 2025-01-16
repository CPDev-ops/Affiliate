import { HeaderBalanceProps } from "../../../../../types/TypePropsComponents";
import { getTextByLevel } from "../../../../utils/transformData";

export function Header({ visits, level }: HeaderBalanceProps) {
    const color = getTextByLevel(level)
    return (
        <div className="flex-col items-center tracking-wider justify-between mb-6">
            <h1 className={`text-base font-bold uppercase  text-[${color}]`}>Balance</h1>
            <p className={`${level !== 0 ? 'text-gray-200' : 'text-stone-700'} text-base  `}>Visitas logradas <span className="text-greenMain">({visits})</span></p>
        </div>
    )
}