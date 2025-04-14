import { CgFileDocument } from "react-icons/cg";
import { MdDownloadForOffline } from "react-icons/md"
import { months, yearsUntilCurrent } from "../../../../utils/date";
import { optionBaseStyles } from "../../../../utils/css/styles";

export const Invoices = () => {


    const documentos = [
        "13/02/2024",
        "15/02/2024",
        "20/02/2024",
        "10/03/2024",
        "11/03/2024",
        "15/03/2024"
    ];

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-center mb-4 gap-4">
                <div className="min-w-[200px] w-full   ">
                    <label className="block  mb-1 text-white/60 ">Filtrar por partner</label>
                    <select className="w-full px-3 py-2 border rounded-md bg-slate-700 border-[#6C6C6C]">
                        <option>TODOS</option>
                    </select>
                </div>
                <div className="min-w-[200px] w-full   ">
                    <label className="block  mb-1 text-white/60  ">Filtrar por Mes</label>
                    <select className="w-full px-3 py-2 border rounded-md bg-slate-700 border-[#6C6C6C]">
                        {months.map((option, index) => (
                            <option className={optionBaseStyles} value={option.number} key={index}>{option.month}</option>
                        ))}
                    </select>
                </div>
                <div className="min-w-[200px] w-full   ">
                    <label className="block  mb-1 text-white/60  ">Filtrar por Año</label>
                    <select className="w-full px-3 py-2 border rounded-md bg-slate-700 border-[#6C6C6C]">
                        {yearsUntilCurrent.map((option, index) => (
                            <option className={optionBaseStyles} value={option.year} key={index}>{option.year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-8">
                {documentos.map((fecha, i) => (
                    <div key={i} className="flex flex-col my-2 shadow-lg">
                        {/* Contenido */}
                        <div className="flex flex-col items-center p-4 bg-slate-600/80 rounded-md">
                            {/* Ícono PDF */}
                            <div className="flex items-center justify-center w-16 h-16 my-4">
                                <CgFileDocument size={36} className="text-white" />
                            </div>
                            {/* Fecha (AHORA EN EL MEDIO) */}
                        </div>
                        <p className=" text-white/70 my-1 text-center">{fecha}</p>
                        {/* Botón de descarga */}
                        <button
                            onClick={() => alert(`Descargando PDF de ${fecha}...`)}
                            className="flex justify-center items-center gap-2 bg-white rounded-md w-full text-[#6C6C6C] hover:text-gray-800  py-2"
                        >
                            <MdDownloadForOffline className="h-6 w-6" />
                            Descargar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}