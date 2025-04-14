import { formatAmount } from "../../../../utils/transformData";
import { ButtonExport } from "../../components/ExportButton";
import { PiUploadSimpleBold } from "react-icons/pi";
import { TfiReload } from "react-icons/tfi";
import { AiOutlineEye } from "react-icons/ai";
import { optionBaseStyles, selectBaseStyles } from "../../../../utils/css/styles";
import { months, yearsUntilCurrent } from "../../../../utils/date";

interface PaymentsProps {
    loading: boolean;
    setLoading: (boolean: boolean) => void
}
export const Payments: React.FC<PaymentsProps> = ({ loading, setLoading }) => {
    console.log(loading, setLoading)

    const list = [
        {
            partner: "SOFITEL CARDALES",
            amount: 800000,
            state: 1,
            collaborators: 10,
            level: 5,
            n_factura: "00--785654" // Added n_factura
        },
        {
            partner: "HOTEL LA PERLA",
            amount: 1000000,
            state: 0,
            collaborators: 5,
            level: 1,
            n_factura: "00--123456" // Added n_factura
        },
        {
            partner: "HOTEL LEON",
            amount: 200000,
            state: 1,
            collaborators: 8,
            level: 3,
            n_factura: "00--987654" // Added n_factura
        },
        {
            partner: "HOTEL SAN MARTÍN",
            amount: 1000000,
            state: 0,
            collaborators: 20,
            level: 2,
            n_factura: "00--456789" // Added n_factura
        },
        {
            partner: "HOTEL SALTA",
            amount: 500000,
            state: 0,
            collaborators: 1,
            level: 2,
            n_factura: "00--112233" // Added n_factura
        },
        {
            partner: "HOTEL SALTA",
            amount: 500000,
            state: 0,
            collaborators: 1,
            level: 2,
            n_factura: "00--112233" // Added n_factura
        },
        {
            partner: "HOTEL SALTA",
            amount: 500000,
            state: 0,
            collaborators: 1,
            level: 2,
            n_factura: "00--112233" // Added n_factura
        },
        {
            partner: "HOTEL SALTA",
            amount: 500000,
            state: 0,
            collaborators: 1,
            level: 2,
            n_factura: "00--112233" // Added n_factura
        },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 items-center mb-4 gap-4">
                <div className="min-w-[200px] w-full   ">
                    <label className="block  mb-1 text-white/60 ">Filtrar por partner</label>
                    <select className={selectBaseStyles}>
                        <option>TODOS</option>
                    </select>
                </div>
                <div className="min-w-[200px] w-full   ">
                    <label className="block  mb-1 text-white/60  ">Filtrar por estado</label>
                    <select className={selectBaseStyles}>
                        <option className={optionBaseStyles}>NO PAGADOS</option>
                        <option className={optionBaseStyles}>PAGADOS</option>
                    </select>
                </div>
                <div className="min-w-[200px] w-full   ">
                    <label className="block  mb-1 text-white/60  ">Filtrar por Mes</label>
                    <select className={selectBaseStyles}>
                        {months.map((option, index) => (
                            <option className={optionBaseStyles} value={option.number} key={index}>{option.month}</option>
                        ))}
                    </select>
                </div>
                <div className="min-w-[200px] w-full   ">
                    <label className="block  mb-1 text-white/60  ">Filtrar por Año</label>
                    <select className={selectBaseStyles}>
                        {yearsUntilCurrent.map((option, index) => (
                            <option className={optionBaseStyles} value={option.year} key={index}>{option.year}</option>
                        ))}
                    </select>
                </div>
                <div className="mx-auto col-span-full xl:col-span-1 sm:mr-0 sm:ml-auto mt-auto ">
                    <ButtonExport name="Exportar Excel" onClick={() => alert('exportando')} />
                </div>
            </div>
            {/* TABLE */}
            <div className="overflow-x-auto border border-gray-300/20 max-h-[500px] overflow-y-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border border-gray-300/20 bg-black/40  text-white/80">
                            <td colSpan={2} className="text-start  py-3 px-4 ">PARTNER</td>
                            {/* <td className="text-center  py-3 px-4 ">FECHA</td> */}
                            <td className="text-center  py-3 px-4 ">N°FACTURA</td>
                            <td className="text-center  py-3 px-4 ">MONTO</td>
                            <td className="text-center  py-3 px-4 ">FACTURA</td>
                            {/*  <td className="text-center  py-3 px-4 ">CANT. COLABORADORES</td> */}
                            {/*  <td className="text-center  py-3 px-4 ">ESTADO</td> */}
                            <td className="text-center  py-3 px-4 ">COMPROBANTE</td>
                            <td colSpan={2} className="text-center  py-3 px-4 ">ACCIÓN</td>
                        </tr>
                    </thead>
                    <tbody className=" text-white/70 shadow-md transition-all border bg-slate-800 border-gray-300/20">
                        {list.map((row, index) => (
                            <tr
                                key={index}
                                className="  shadow-md  transition-all border border-gray-300/20 rounded-lg"
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
                                    <button className={`p-2 border flex gap-2 items-center border-[#6C6C6C] text-white hover:text-white rounded-lg bg-slate-700 hover:bg-slate-600 transition-all duration-300 ${row.state === 0 && 'cursor-not-allowed bg-white/40'} `}>  <AiOutlineEye className="" size={24} />{row.state === 1 ? 'Ver' : 'Ver'} factura</button>

                                </td>
                                <td className="py-4 text-start px-4 ">
                                    <button className={`p-2 border flex gap-2 items-center border-[#6C6C6C] text-white hover:text-white rounded-lg bg-slate-700 hover:bg-slate-600 transition-all duration-300  `}>{row.state === 1 ? <PiUploadSimpleBold className="" size={24} /> : <TfiReload size={24} />}{row.state === 1 ? 'Actualizar' : 'Cargar'} archivo </button>

                                </td>
                                <td className="py-4 text-start px-4"><ButtonSaveChanges state={row.state} title="Guardar cambios" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


const ButtonSaveChanges = ({ title, state }: { title: string, state: number }) => {
    return (
        <button className={`p-2 border border-[#3840F7]/50 text-[#FFFFFF] hover:text-white rounded-lg ${state === 1 ? 'bg-[#3840F7] hover:bg-[#363dc9]' : 'bg-[#3840F7]/50 cursor-not-allowed'}  transition-all duration-300 `}>{title}</button>
    )
}