import { HeaderBalanceProps } from "../../../../../types/TypePropsComponents";
import { getTextByLevel } from "../../../../utils/transformData";

export function Header({ visits, level }: HeaderBalanceProps) {
    const color = getTextByLevel(level)
    console.log(color)
    return (
        <div className="flex-col items-center tracking-wider justify-between mb-6">
            <h1 className={`text-base font-bold uppercase  ${color}`}>Detalle</h1>
            <p className={`text-[#3E3838]/90 text-lg font-thin  tracking-wider  `}>Visitas logradas <span className="text-[#06DE0E]">({visits})</span></p>
        </div>
    )
}