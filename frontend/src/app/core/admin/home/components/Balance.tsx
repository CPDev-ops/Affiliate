import { useEffect, useState } from "react";
import { AffiliatePeriodDTO, GetAdminDTO } from "../../../../../types/admin";
import { getAffiliatePeriod, getDataAdmin } from "../../../../../service/get/admin/admin";
import { ButtonExport } from "../../components/ExportButton";
import { toast } from "react-toastify";
import { months, yearsUntilCurrent } from "../../../../utils/date";
import axios from "axios";
import { baseUrl } from "../../../../../content/dataDomain";
import SelectYear from "./SelectYear";
import SelectMonth from "./SelectMonth";
import SelectPartners from "./SelectsPartners";
import { formatAmount } from "../../../../utils/transformData";
interface BalanceProps {
    loading: boolean;
    setLoading: (boolean: boolean) => void;
}

export const Balance: React.FC<BalanceProps> = ({ loading, setLoading }) => {

    //variables pra filtrar
    const [selectedPartner, setSelectedPartner] = useState<string>(''); // "" = TODOS
    const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth()+1).toString()); // default: enero  
    const [selectedYears, setSelectedYears] = useState<string>(new Date().getFullYear().toString())
    const [list, setList] = useState<GetAdminDTO[]>([])
    const [partners, setPartners] = useState<AffiliatePeriodDTO[]>([])
    //export
    const [exporting, setExporting] = useState<boolean>(false)

    const getDataPartners = async () => {
        try {
            setLoading(true)
            const response = await getAffiliatePeriod();
            setPartners(response)
        } catch (error) {
            console.error(error)
            setPartners([])
            // No lances de nuevo el error
            // Podés mostrar un toast u otro indicador visual
            toast.error("No se pudieron cargar los datos. Intentalo más tarde.");
        } finally {
            setLoading(false)
        }
    }
    const getData = () => {
        setLoading(true);
        setTimeout(async () => {
            try {
                const params: any = {
                    year: selectedYears,
                };
                if (selectedMonth !== "") {
                    params.month = selectedMonth;
                }
                if (selectedPartner !== "") {
                    params.id_affiliate = selectedPartner;
                }
                const response = await getDataAdmin(params);
                console.log(response);
                setList(response);
            } catch (error: any) {
                toast.error(error.message);
                setList([]);
            } finally {
                setLoading(false);
            }
        }, 500);
    };

    const exportData = async () => {
        if (exporting) return; // Evitar múltiples clics
        setExporting(true)
        const params: any = {
            year: selectedYears,
        };
        if (selectedMonth !== "") {
            params.month = selectedMonth
        }
        if (selectedPartner !== "") {
            params.id_affiliate = selectedPartner;
        }

        try {
            const response = await axios.get(`${baseUrl}/export_admin_home_data`, {
                params,
                responseType: 'blob', // 👈 importante para recibir archivo
                withCredentials: true,
            });

            // Crear enlace de descarga
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Si tu backend incluye un nombre de archivo en los headers, podés usarlo. Si no, ponés uno fijo:
            link.setAttribute('download', `reporte-admin-${selectedMonth}-${selectedYears}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error: any) {
            console.error(error);
            toast.error("Error al exportar los datos.");
        } finally {
            setExporting(false)
        }
    };

    useEffect(() => {
        getData();
    }, [selectedMonth, selectedYears, selectedPartner]);

    const getNivelColor = (nivel: number) => {
        const colors: Record<number, string> = {
            1: "bg-yellow-400 text-black",
            2: "bg-purple-500 text-white",
            3: "bg-blue-500 text-white",
            4: "bg-green-500 text-white",
            5: "bg-red-500 text-white",
        };
        return colors[nivel] || "bg-gray-300 text-black"; // Color por defecto si el nivel no está definido
    };
    useEffect(() => {
        getDataPartners()
    }, [])

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 items-center mb-4 gap-4">
                <SelectPartners selectedPartner={selectedPartner} setSelectedPartner={setSelectedPartner} data={partners} />
                <SelectMonth months={months} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                <SelectYear years={yearsUntilCurrent} selectedYear={selectedYears} setSelectedYear={setSelectedYears} />
                <div className="mx-auto col-span-full xl:col-span-1 sm:mr-0 sm:ml-auto  mt-auto">
                    <ButtonExport name={exporting ? "Exportando..." : "Exportar"} onClick={exportData} />
                </div>
            </div>
            {/* TABLE */}
            <div className="overflow-x-auto border border-gray-300/20 max-h-[500px] overflow-y-auto">
                <table className="w-full">
                    {/* Table Header */}
                    <thead>
                        <tr className="border border-gray-300/20 bg-black/40  text-white/80">
                            <td className="text-start  py-3 px-4 ">PARTNER</td>
                            <td className="text-center  py-3 px-4 ">MAILS ENVIADOS</td>
                            <td className="text-center  py-3 px-4 ">VISITAS LOGRADAS</td>
                            <td className="text-center  py-3 px-4 ">DINERO PAGADO</td>
                            {/*  <td className="text-center  py-3 px-4 ">CANT. COLABORADORES</td> */}
                            <td className="text-center  py-3 px-4 ">NIVEL ALCANZADO</td>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {loading ? (
                            // Skeleton Loading
                            [...Array(6)].map((_, index) => (
                                <tr key={index} className="bg-slate-800  shadow-md border border-gray-300/20">
                                    {Array(5).fill(null).map((_, i) => (
                                        <td key={i} className="py-4 px-4">
                                            <div className="w-full h-5 bg-gray-700 animate-pulse rounded-md"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))

                        ) : list.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 px-4 text-center text-white/70">
                                    No hay datos disponibles.
                                </td>
                            </tr>
                        ) : (
                            // Datos reales
                            list.map((row, index) => (
                                <tr key={index} className=" text-white/70 shadow-md transition-all border bg-slate-800 border-gray-300/20">
                                    <td className="py-4 px-4 font-medium text-white">{row.razon_social_empresa}</td>
                                    <td className="py-4 text-center px-4">{row.mails_enviados}</td>
                                    <td className="py-4 text-center px-4">{row.visitas_logradas}</td>
                                    <td className="py-4 text-center px-4">{formatAmount(parseInt(row.monto ?? "0"))}</td>
                                    <td className="py-4 text-center px-4">
                                        <div>
                                            <h1 className={`inline-block ${getNivelColor(row.orden_nivel)} rounded-full px-4 py-1`}>
                                                Nivel {row.orden_nivel}
                                            </h1>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}






