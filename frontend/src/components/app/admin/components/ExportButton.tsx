import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi"

interface ButtonExportProps {
    onClick: () => void
}
export function ButtonExport({ onClick }: ButtonExportProps) {
    return (
        <button onClick={onClick} className="px-4 lg:px-8 py-2  text-black border border-[#1D9D22] rounded-lg flex items-center gap-2 hover:bg-green-100 transition-colors">
            <PiMicrosoftExcelLogoDuotone className="text-xl text-[#1D9D22]" />
            Exportar Excel
        </button>
    )
}