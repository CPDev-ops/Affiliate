
export const SelectTemplates = () => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4  mb-4">
            <div className="text-[#3E3838]">
                <label className="block text-sm mb-1">Filtrar por partner</label>
                <select className="w-full px-3 py-2 border rounded-md bg-white border-[#6C6C6C]">
                    <option>TODOS</option>
                </select>
            </div>
            <div className="text-[#3E3838]">
                <label className="block text-sm mb-1">Filtrar por estado</label>
                <select className="w-full px-3 py-2 border rounded-md bg-white border-[#6C6C6C]">
                    <option>NO PAGADOS</option>
                </select>
            </div>
            <div className="text-[#3E3838]">
                <label className="block text-sm mb-1">Filtrar por período</label>
                <select className="w-full px-3 py-2 border rounded-md bg-white border-[#6C6C6C]">
                    <option>FEBRERO 2025</option>
                </select>
            </div>
            <div className="text-[#3E3838]">
                <label className="block text-sm mb-1">N° de factura</label>
                <input className="w-full px-3 py-1.5 border rounded-md bg-white border-[#6C6C6C]" placeholder="00 . . . . . . ." type="text" />
            </div>
        </div>
    );
};