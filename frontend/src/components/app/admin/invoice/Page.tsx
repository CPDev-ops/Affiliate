import { useLevel } from "../../../../context/LevelContext";
import { ComponentProp } from "../../../../types/TypePropsComponents";
import { ContainerModules } from "../../../hook/containerModules";
import { PdfGrid } from "../../user/summary/invoices/components/PdfGrid";
import { SelectTemplates } from "./components/SelectsTemplate";
import { Title } from "./components/Title";


export function Invoices({ domain, type }: ComponentProp) {
    const { level } = useLevel()
    return (
        <ContainerModules type={type} domain={domain}>
            <Title text="Facturas" level={level} />
            <SelectTemplates />
            <div className="my-8">
                <PdfGrid />
            </div>
        </ContainerModules>
    )
}



