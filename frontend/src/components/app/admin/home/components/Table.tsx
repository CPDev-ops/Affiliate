export function Table() {
    const list = [
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
    ]
    return (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full">
                {/* Table Header */}
                <thead>
                    <tr className="border-b text-sm">
                        <th className="text-left  py-3 px-4 text-[#45087B]">PARTNER</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">MAILS ENVIADOS</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">VISITAS LOGRADAS</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">DINERO PAGADO</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">CANT. COLABORADORES</th>
                        <th className="text-left  py-3 px-4 text-[#45087B]">NIVEL ALCANZADO</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {list.map((row, index) => (
                        <tr
                            key={index}
                            className="bg-white text-sm shadow-md hover:bg-gray-50 transition-all border border-gray-200 rounded-lg"
                        >
                            <td className="py-4 px-4 font-medium">{row.partner}</td>
                            <td className="py-4 text-start px-4">{row.mails}</td>
                            <td className="py-4 text-start px-4">{row.visits}</td>
                            <td className="py-4 text-start px-4">{row.money}</td>
                            <td className="py-4 text-start px-4">{row.collaborators}</td>
                            <td className="py-4 text-start px-4">{row.level}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}