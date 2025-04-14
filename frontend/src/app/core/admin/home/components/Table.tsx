import { GetAdminDTO } from "../../../../../types/admin"

interface TableProps {
    list: GetAdminDTO[]
}
export function Table({ list }: TableProps) {
    /*   const list = [
          {
              partner: "SOFITEL CARDALES",
              mails: 1000,
              visits: 250,
              money: "$200.000",
              collaborators: 10,
              level: "NIVEL 2",
          },
          {
              partner: "HOTEL LA PERLA",
              mails: 1000,
              visits: 250,
              money: "$200.000",
              collaborators: 5,
              level: "NIVEL 2",
          },
          {
              partner: "HOTEL LEON",
              mails: 1000,
              visits: 250,
              money: "$200.000",
              collaborators: 8,
              level: "NIVEL 2",
          },
          {
              partner: "HOTEL SAN MARTÍN",
              mails: 1000,
              visits: 250,
              money: "$200.000",
              collaborators: 20,
              level: "NIVEL 2",
          },
          {
              partner: "HOTEL SALTA",
              mails: 1000,
              visits: 250,
              money: "$200.000",
              collaborators: 1,
              level: "NIVEL 2",
          },
          {
              partner: "HOTEL SALTA",
              mails: 1000,
              visits: 250,
              money: "$200.000",
              collaborators: 1,
              level: "NIVEL 2",
          },
          {
              partner: "HOTEL SALTA",
              mails: 1000,
              visits: 250,
              money: "$200.000",
              collaborators: 1,
              level: "NIVEL 2",
          },
      ] */
    return (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full">
                {/* Table Header */}
                <thead>
                    <tr className="border-b ">
                        <th className="text-left  py-3 px-4 text-[#45087B]">PARTNER</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">MAILS ENVIADOS</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">VISITAS LOGRADAS</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">DINERO PAGADO</th>
                        {/*  <th className="text-left  py-3 px-4 text-[#45087B]">CANT. COLABORADORES</th> */}
                        <th className="text-left  py-3 px-4 text-[#45087B]">NIVEL ALCANZADO</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {list.map((row, index) => (
                        <tr
                            key={index}
                            className="bg-white text-black  shadow-md hover:bg-gray-50 transition-all border border-gray-200 rounded-lg"
                        >
                            <td className="py-4 px-4 font-medium">{row.razon_social_empresa}</td>
                            <td className="py-4 text-start px-4">{row.mails_enviados}</td>
                            <td className="py-4 text-start px-4">{row.visitas_logradas}</td>
                            <td className="py-4 text-start px-4">{row.monto}</td>
                            {/*   <td className="py-4 text-start px-4">{row.}</td> COLLABORADORES */}
                            <td className="py-4 text-start px-4">{row.orden_nivel}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}


export function ListLoader() {
    return (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="w-full">
            {/* Table Header */}
            <thead>
                <tr className="border-b text-sm">
                    <th className="text-left py-3 px-4 text-[#45087B]">PARTNER</th>
                    <th className="text-left py-3 px-4 text-[#45087B]">MAILS ENVIADOS</th>
                    <th className="text-left py-3 px-4 text-[#45087B]">VISITAS LOGRADAS</th>
                    <th className="text-left py-3 px-4 text-[#45087B]">DINERO PAGADO</th>
                    <th className="text-left py-3 px-4 text-[#45087B]">NIVEL ALCANZADO</th>
                </tr>
            </thead>
            {/* Table Body con efecto de carga */}
            <tbody>
                {[...Array(5)].map((_, index) => (
                    <tr
                        key={index}
                        className="bg-white text-sm shadow-md hover:bg-gray-50 transition-all border border-gray-200 rounded-lg"
                    >
                        {Array(5).fill(null).map((_, i) => (
                            <td key={i} className="py-4 px-4">
                                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-md"></div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        {/* Mensaje visual indicando carga */}
       {/*  <div className="flex justify-center items-center mt-4">
            <span className="text-gray-500 text-sm animate-pulse">Cargando datos...</span>
        </div> */}
    </div>
    )
}