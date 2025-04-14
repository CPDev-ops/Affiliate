import { IoMdDownload } from "react-icons/io"

interface ButtonExportProps {
    onClick: () => void
    name:string
}
export function ButtonExport({ onClick,name }: ButtonExportProps) {
    return (
        <button onClick={onClick} className="px-4 lg:px-8 py-2 bg-[#1D9D22]/40  text-white border border-[#1D9D22] rounded-lg flex items-center gap-2 hover:bg-[#1D9D22]/70 transition-all">
            <IoMdDownload className="text-xl " />
            {name}
        </button>
    )
}