import { useLevel } from "../../../../context/LevelContext";
import { ContainerModules } from "../../../hook/containerModules";
import { ComponentProp } from "../../../../types/TypePropsComponents";
import { Header } from "./components/Header";
import { PartnerTable } from "./components/PartnerTable";
import { Table } from "./components/Table";


export function AdminHome({ domain, type }: ComponentProp) {
const { level } = useLevel()
    return (
        <ContainerModules type={type} domain={domain}>
            <Header userName="Roberto Roberspiere" level={level} />
            <PartnerTable />
            <Table />
        </ContainerModules>
    )
}






