import { Title } from "./components/Title"
import { IconBackSummary } from "./components/IconBack"
import { PdfGrid } from "./components/PdfGrid"
import { CustomSelect } from "./components/Select"

interface InvoicesProps {
    level: number
    onClick: () => void
}

export function Invoices({ level, onClick }: InvoicesProps) {
    const values = ["MAS RECIENTES", "OPCIÓN 1", "OPCIÓN 2", "OPCIÓN 3"]
    return (
        <div>
            <IconBackSummary onClick={onClick} />
            <Title level={level} />
            <div className="flex justify-start mb-6 items-center">
                <h1>Ordenar</h1>
                <CustomSelect array={values} />
            </div>
            <PdfGrid />
        </div>
    )
}




