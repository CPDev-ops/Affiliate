import { MdDownloadForOffline } from "react-icons/md";
import { formatAmount } from "../../../../utils/transformData";
import { getGradient } from "../../../client/game/utils/utils";
import { HiTicket } from "react-icons/hi2";

interface CardProps {
    data: Dto
    level: number
}

export interface Dto {
    month: string;
    state: number;
    amount: number
}

export function Card({ data, level }: CardProps) {
    return (
        <div className="w-full max-w-full ">
            <div className={`rounded-md bg-gradient-to-b ${getGradient(level)} p-2 shadow-lg`}>
                <div className=" space-y-2">
                    <div>
                        {data.state === 0 ? (
                            <span className=" rounded-full bg-[#FF0000] px-4 py-1 text-xs flex items-center justify-between  shadow-sm w-full text-start  text-white">
                                <h1>Pendiente de pago</h1>
                            </span>
                        ) : (
                            <span className=" rounded-full bg-[#10BF16] px-4 py-1 text-xs flex items-center justify-between shadow-sm w-full text-start  text-white">
                                <h1>Pagado</h1>
                                <button onClick={() => alert('Descargando comprobante')} className="flex justify-between items-center"><HiTicket size={20} className="mr-2" /> Comprobante</button>
                            </span>
                        )}
                    </div>
                    <div className={`${level !== 0 ? 'text-white' : 'text-[#3E3838]'} flex justify-between  items-center`}>
                        <div className=" flex-col ">
                            <h2 className="text-sm font-semibold ">{data.month}</h2>
                            <div className="flex justify-center items-center">
                                <p className="text-sm ">{data.state === 0 ? 'Total a cobrar: ' : 'Cobrado: '} ${formatAmount(data.amount)}</p>
                            </div>
                        </div>
                        <button onClick={() => alert('Descargando PDF')} className="rounded-full flex-col text-[#6C6C6C] justify-center items-center">
                            <MdDownloadForOffline className="h-6 w-6  mx-auto" />
                            <h1 className="text-xs  lg:text-sm">Descargar <br />resumen</h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
