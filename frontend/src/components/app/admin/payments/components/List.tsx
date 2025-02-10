import { RiAttachmentFill } from "react-icons/ri";
import { formatAmount } from "../../../../utils/transformData"

export const List = () => {
    const list = [
        {
            partner: "SOFITEL CARDALES",
            amount: 800000,
            state: 1,
            collaborators: 10,
            level: 5,
            n_factura: "00 785654" // Added n_factura
        },
        {
            partner: "HOTEL LA PERLA",
            amount: 1000000,
            state: 0,
            collaborators: 5,
            level: 1,
            n_factura: "00 123456" // Added n_factura
        },
        {
            partner: "HOTEL LEON",
            amount: 200000,
            state: 1,
            collaborators: 8,
            level: 3,
            n_factura: "00 987654" // Added n_factura
        },
        {
            partner: "HOTEL SAN MARTÍN",
            amount: 1000000,
            state: 0,
            collaborators: 20,
            level: 2,
            n_factura: "00 456789" // Added n_factura
        },
        {
            partner: "HOTEL SALTA",
            amount: 500000,
            state: 0,
            collaborators: 1,
            level: 2,
            n_factura: "00 112233" // Added n_factura
        },
        {
            partner: "HOTEL SALTA",
            amount: 500000,
            state: 0,
            collaborators: 1,
            level: 2,
            n_factura: "00 112233" // Added n_factura
        },
        {
            partner: "HOTEL SALTA",
            amount: 500000,
            state: 0,
            collaborators: 1,
            level: 2,
            n_factura: "00 112233" // Added n_factura
        },
        {
            partner: "HOTEL SALTA",
            amount: 500000,
            state: 0,
            collaborators: 1,
            level: 2,
            n_factura: "00 112233" // Added n_factura
        },
    ];

    return (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full ">
                {/* Table Header */}
                <thead>
                    <tr className="border-b text-sm uppercase">
                        <th className="text-left  px-2"></th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">PARTNER</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">N° FACTURA</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">MONTO </th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">Factura</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">comprobante</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">ACCIÓN</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody className="">
                    {list.map((row, index) => (
                        <tr
                            key={index}
                            className="bg-white text-sm shadow-md hover:bg-gray-50 transition-all border border-gray-200 rounded-lg"
                        >
                            <td className="px-2  mx-auto">
                                <div className={`h-2 w-2 lg:h-3 lg:w-3 mx-auto rounded-full ${row.state === 1 ? 'bg-[#06DE0E]' : 'bg-[#FF0000]'}`}></div>
                            </td>
                            <td className="py-4 px-4 ">
                                <div className="flex items-center">
                                    <span>{row.partner}</span>
                                </div>
                            </td>
                            <td className="py-4 text-start px-4">{row.n_factura}</td>
                            <td className="py-4 text-start px-4">{formatAmount(row.amount)}</td>
                            <td className="py-4 text-start px-4 ">
                                <button className="p-2 border flex gap-2 items-center border-[#6C6C6C] text-[#3E3838] hover:text-white rounded-lg bg-[#EDF3F8] hover:bg-[#cdd3d6] transition-all duration-300 ">{row.state === 1 ? 'Ver' : 'Ver'} factura  <RiAttachmentFill className="" size={24} /></button>

                            </td>
                            <td className="py-4 text-start px-4 ">
                                <button className="p-2 border flex gap-2 items-center border-[#6C6C6C] text-[#3E3838] hover:text-white rounded-lg bg-[#EDF3F8] hover:bg-[#cdd3d6] transition-all duration-300 ">{row.state === 1 ? 'Cargar' : 'Cargar'} archivo {row.state === 1 && <RiAttachmentFill className="" size={24} />}</button>

                            </td>
                            <td className="py-4 text-start px-4"><ButtonSaveChanges state={row.state} title="Guardar cambios" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const ButtonSaveChanges = ({ title, state }: { title: string, state: number }) => {
    return (
        <button className={`p-2 border border-[#3840F7]/50 text-[#FFFFFF] hover:text-white rounded-lg ${state === 1 ? 'bg-[#3840F7] hover:bg-[#363dc9]' : 'bg-[#3840F7]/50 cursor-not-allowed'}  transition-all duration-300 `}>{title}</button>
    )
}

/* const ProgressBarCompleted = () => {
    return (
        <div className="space-y-6 p-4">
            <div>
                <p className=" text-black">Archivo cargado</p>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                    <div className="h-1 bg-[#06DE0E] rounded-full w-full"></div>
                </div>
            </div>
        </div>
    )
}

const ProgressBarInCompleted = () => {
    return (
        <div className="space-y-6 p-4">
            <div>
                <p className=" text-black">Sin archivo</p>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                    <div className="h-1 bg-[#D9D9D9] rounded-full w-fu"></div>
                </div>
            </div>
        </div>
    )
} */