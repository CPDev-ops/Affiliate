import { FaFileDownload } from "react-icons/fa";
import { useLevel } from "../../../../context/LevelContext";
import { ContainerModules } from "../../../hook/containerModules";
import { getTextSummaryLevel } from "../../../utils/transformData";
import { IconBackHome } from "../components/Icon";
import { Header } from "./components/Header";
import { level } from "../../../../content/dataDomain";

interface SummaryProps {
    domain: string
}
export function Summary({ domain }: SummaryProps) {
    const { level } = useLevel(); // Acceder al valor de 'level'
    const color = getTextSummaryLevel(level)//obtenemos el color segun el level de usuario
    const data: dto[] = [
        {
            month: 'Marzo 2025',
            state: 0,
            amount: 300000
        },
        {
            month: 'Febrero 2025',
            state: 1,
            amount: 200000
        },
        {
            month: 'Enero 2025',
            state: 1,
            amount: 60000
        },
    ]
    return (
        <ContainerModules domain={domain}>
            <IconBackHome level={level} />
            <Header level={level} />
            {data.map((value) => (
                <Card data={value} color={color} />
            ))}
        </ContainerModules>
    )
}



interface CardProps {
    color: string;
    data: dto

}
interface dto {
    month: string;
    state: number;
    amount: number
}

function Card({ color, data }: CardProps) {
    return (
        <div className="my-4">
            <h2 className={`${color} mb-1 font-semibold`}>{data.month}</h2>
            <div className="border border-[#FF0000] rounded-xl backdrop-blur-sm overflow-hidden">
                <div className="p-2 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 ${data.state === 0 ? 'bg-[#FF0000]' : 'bg-[#10BF16]'} w-full   rounded-full text-white`}>{data.state === 0 ? 'Pendiente de Pago' : 'Pagado'}</span>
                    </div>
                    <div className={`flex  items-center justify-between border-t border-white/10 pt-2`}>
                        <span className={`${color} `}>Total a cobrar:</span>
                        <span className={`${color} mr-auto ml-4`}>${data.amount}</span>
                        <div className="flex items-center gap-2">
                            <FaFileDownload className={`${level !== 0 ? 'text-[#FFFFFF]' : 'text-[#6C6C6C]'}`} size={24} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

