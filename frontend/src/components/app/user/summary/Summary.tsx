import { useLevel } from "../../../../context/LevelContext";
import { ContainerModules } from "../../../hook/containerModules";
import { formatAmount } from "../../../utils/transformData";
import { IconBackHome } from "../components/Icon";
import { Header } from "./components/Header";
import { getGradient } from "../../client/game/utils/utils";
import { MdDownloadForOffline } from "react-icons/md";

interface SummaryProps {
    domain: string
}
export function Summary({ domain }: SummaryProps) {
    const { level } = useLevel(); // Acceder al valor de 'level'
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.map((value) => (
                    <Card level={level} data={value} />
                ))}
            </div>
        </ContainerModules>
    )
}



interface CardProps {
    data: dto
    level: number
}
interface dto {
    month: string;
    state: number;
    amount: number
}

function Card({ data, level }: CardProps) {
    return (
        <div className="w-full max-w-full ">
            <div className={`rounded-md bg-gradient-to-b ${getGradient(level)} p-2 shadow-lg`}>
                <div className=" space-y-2">
                    <div>
                        {data.state === 0 ? (
                            <span className="inline-block rounded-full bg-[#FF0000] px-4 py-1 text-xs text-center shadow-sm w-2/4 lg:w-full xl:w-2/4 font-medium text-white">
                                Pendiente de pago
                            </span>
                        ) : (
                            <span className="inline-block rounded-full bg-[#10BF16] px-4 py-1 text-xs text-center shadow-sm w-2/4 lg:w-full xl:w-2/4 font-medium text-white">
                                Pagado
                            </span>
                        )}
                    </div>
                    <div className={`${level !== 0 ? 'text-white' : 'text-[#3E3838]'} flex justify-between  items-center`}>
                        <div className=" flex-col ">
                            <h2 className="text-sm font-semibold ">{data.month}</h2>
                            <div className="flex justify-center items-center">
                                <p className="text-sm ">Total a cobrar: ${formatAmount(data.amount)}</p>
                            </div>
                        </div>
                        <button onClick={() => alert('Descargando PDF')} className="rounded-full">
                            <MdDownloadForOffline className="h-6 w-6 " />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

