import { HeaderBalanceProps } from "../../../../../types/TypePropsComponents";

export function Header({ visits, level }: HeaderBalanceProps) {
    return (
        <div className="flex items-center tracking-wider justify-between mb-6">
            <div>
                <h1 className={`text-base font-bold uppercase  ${level !== 0 ? 'text-white' : 'text-[#CF0144]'}`}>Balance</h1>
                <p className={`${level !== 0 ? 'text-gray-200' : 'text-stone-700'} text-base  `}>Visitas logradas <span className="text-greenMain">({visits})</span></p>
            </div>
        </div>
    )
}