import { useLevel } from "../../../../context/LevelContext";
import { ContainerModules } from "../../../hook/containerModules";
import { IconBackHome } from "../components/Icon";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { Card, Dto } from "./components/Card";
import { Modal } from "./components/Modal";
import { Invoices } from "./invoices/Invoices";
import { InvoiceToggle } from "./components/InvoiceToggle";
import { CustomSelect } from "./components/Select";
import { ComponentProp } from "../../../../types/TypePropsComponents";

export function Summary({ domain, type }: ComponentProp) {
    const { level } = useLevel(); // Acceder al valor de 'level'
    const data: Dto[] = [
        {
            month: 'Marzo 2025',
            state: 0,
            amount: 300000
        },
        {
            month: 'Febrero 2025',
            state: 1,
            amount: 200000
        },
        {
            month: 'Enero 2025',
            state: 1,
            amount: 60000
        },
        {
            month: 'Diciembre 2024',
            state: 2,
            amount: 150000
        },
        {
            month: 'Noviembre 2024',
            state: 0,
            amount: 250000
        },
        {
            month: 'Octubre 2024',
            state: 1,
            amount: 180000
        },
        {
            month: 'Septiembre 2024',
            state: 2,
            amount: 220000
        },
        {
            month: 'Agosto 2024',
            state: 0,
            amount: 300000
        },
        {
            month: 'Julio 2024',
            state: 1,
            amount: 90000
        },
        {
            month: 'Junio 2024',
            state: 2,
            amount: 120000
        },
        {
            month: 'Mayo 2024',
            state: 0,
            amount: 400000
        },
        {
            month: 'Abril 2024',
            state: 1,
            amount: 80000
        },
        {
            month: 'Marzo 2024',
            state: 2,
            amount: 170000
        },
        {
            month: 'Febrero 2024',
            state: 0,
            amount: 210000
        },
        {
            month: 'Enero 2024',
            state: 1,
            amount: 50000
        },
    ];
    const values = ["TODOS", "OPCIÓN 1", "OPCIÓN 2", "OPCIÓN 3"]
    const [typeButton, setTypeButton] = useState<number>(0)
    const [isFooterVisible, setIsFooterVisible] = useState(false); // Estado para controlar la visibilidad del footer
    //constante de modal
    const [modal, setModal] = useState<boolean>(false)
    function onClick(data: number) {
        console.log(data)
        if (data === 2) {
            setModal(true)
            return
        }
        setTypeButton(data)
    }
    useEffect(() => {
        console.log('CAMBIO EL VALOR', typeButton)
    }, [typeButton])
    // Usamos useEffect para retrasar la aparición del footer
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFooterVisible(true); // Mostrar el footer después de 1 segundo
        }, 500);

        return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }, []);

    return (
        <ContainerModules type={type} domain={domain}>
            {(typeButton === 0) && (
                <div>
                    <IconBackHome level={level} />
                    {/* PRIMER MODULO RESUMENES */}
                    <Header level={level} />
                    <div className="flex justify-start my-2 items-center">
                        <h1>Periodo</h1>
                        <CustomSelect array={values} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto">
                        {data.map((value) => (
                            <Card level={level} data={value} />
                        ))}
                    </div>
                </div>
            )}
            {/* MODAL */}
            {modal && (
                <Modal level={level} close={() => setModal(false)} />
            )}
            {/* SEGUNDO MODULO MIS FACTURAS */}
            {typeButton === 1 && (
                <Invoices onClick={() => setTypeButton(0)} level={level} />
            )}
            <div
                className={`fixed bottom-8 left-1/2 rounded-2xl -translate-x-1/2 bg-[#C7D0EA] w-5/6 sm:w-1/2 lg:w-1/3 flex justify-between items-center shadow-xl p-4 transition-opacity duration-500 ${isFooterVisible ? "opacity-100" : "opacity-0"
                    }`}
            >
                <InvoiceToggle modalClick={modal} onClick={onClick} typeButton={typeButton} />
            </div>
        </ContainerModules>
    )
}








