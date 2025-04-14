import { ContainerModules } from "../../../hook/containerModules";
import { ComponentProp } from "../../../../types/TypePropsComponents";
import { useEffect, useState } from "react";
import { LoaderHover } from "../../../loaders/Loaders";
import { Selects } from "./components/Selects";
import { NavAdmin } from "./components/NavAdmin";
import { Balance } from "./components/Balance";
import { ContainerModulesAdmin } from "./hook/Container";
import { getAdmin } from "../../../../service/get/admin/admin";
import { toast } from "react-toastify";
import { PaymentsInvoices } from "./components/PaymentsInvoices";


export interface GetAdminDataDTO {
    rol: string;
    usuario: string
}
export function AdminHome({ domain, type }: ComponentProp) {
    const [selected, setSelected] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false)
    //constante que se pasa al navbar 
    const [name, setName] = useState<string>('')

    const getName = () => {
        setLoading(true)
        setTimeout(async () => {
            try {
                const response: GetAdminDataDTO = await getAdmin();
                console.log(response)
                setName(response.usuario)
            } catch (error: any) {
                toast.error(error);
            } finally {
                setLoading(false)
            }
        }, 500);
    }

    useEffect(() => {
        getName()
    }, [])
    
    return (
        <div className="text-white tracking-wider text-xs">
            {loading && (
                <LoaderHover />
            )}
            <ContainerModules type={type} domain={domain}>
                <NavAdmin name={name} domain={domain} />
                <Selects selected={selected} setSelected={setSelected} />
                {selected === 0 && (
                    <ContainerModulesAdmin title="Comparativa de afiliados">
                        <Balance loading={loading} setLoading={setLoading} />
                    </ContainerModulesAdmin>
                )}
                {selected === 1 && (
                    <ContainerModulesAdmin title="Resúmenes y Facturas">
                        <PaymentsInvoices loading={loading} setLoading={setLoading} />
                    </ContainerModulesAdmin>
                )}
            </ContainerModules>
        </div>
    )
}

