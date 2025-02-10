import { useLevel } from "../../../../context/LevelContext";
import { ComponentProp } from "../../../../types/TypePropsComponents";
import { ContainerModules } from "../../../hook/containerModules";
import { ButtonExport } from "../components/ExportButton";
import { Title } from "../invoice/components/Title";
import { List } from "./components/List";
import { SelectTemplates } from "./components/SelectsTemplate";

export function Payments({ domain, type }: ComponentProp) {
    const { level } = useLevel()
    return (
        <ContainerModules type={type} domain={domain}>
            <Title level={level} text="PAGOS" />
            <p className={`text-[#3E3838]/90 text-base font-thin  tracking-wider  `}>Pagos realizados a los partners</p>
            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center justify-between my-4">
                <SelectTemplates />
                <div className=" flex justify-end items-center">
                    <ButtonExport onClick={() => alert('exportando')} />
                </div>
            </div>
            <List />
        </ContainerModules>
    )
}


