export const SelectTemplates = () => {
    return (
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
            <div className="flex flex-wrap gap-4">
                <div className="min-w-[200px] w-full sm:w-1/3 lg:w-1/3 text-[#3E3838]">
                    <label className="block text-sm mb-1 ">Filtrar por partner</label>
                    <select className="w-full px-3 py-2 border rounded-md bg-white border-[#6C6C6C]">
                        <option>TODOS</option>
                    </select>
                </div>
                <div className="min-w-[200px] w-full sm:w-1/3 lg:w-1/3 text-[#3E3838]">
                    <label className="block text-sm mb-1  ">Filtrar por período</label>
                    <select className="w-full px-3 py-2 border rounded-md bg-white border-[#6C6C6C]">
                        <option>FEBRERO 2025</option>
                    </select>
                </div>
            </div>
        </div>
    )
}