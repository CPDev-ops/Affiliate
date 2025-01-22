import { Header } from "./components/Header"
import { CardList } from "./components/CardList";
import { getGradient } from "../../../config/getGradient";
import { useLevel } from "../../../../context/LevelContext";
import { IconBackHome } from "../components/Icon";
import { ContainerModules } from "../../../hook/containerModules";

interface BalanceProps {
    domain: string
}
export function Balance({ domain }: BalanceProps) {
    const { level } = useLevel(); // Acceder al valor de 'level'
    // Datos de ejemplo
    const visits = [
        {
            id: 1,
            name: "Juan Villalba",
            date: "10/12/2024",
            time: "20:30hs",
            amount: 5000
        },
        {
            id: 2,
            name: "María Sosa",
            date: "10/12/2024",
            time: "20:30hs",
            amount: 5000
        },
        {
            id: 3,
            name: "Martha Sánchez",
            date: "10/12/2024",
            time: "20:30hs",
            amount: 5000
        },
        {
            id: 4,
            name: "Pedro López",
            date: "10/12/2024",
            time: "20:30hs",
            amount: 5000
        },
        {
            id: 5,
            name: "Luciano Ajmar",
            date: "10/12/2024",
            time: "20:30hs",
            amount: 5000
        },
        // Múltiples entradas para Constanza Peralta
        ...Array(8).fill(null).map((_, index) => ({
            id: 6 + index,
            name: "Constanza Peralta",
            date: "10/12/2024",
            time: "20:30hs",
            amount: 5000
        }))
    ];
    return (
        <ContainerModules domain={domain}>
            {/* HEADER */}
            <IconBackHome level={level} />
            <Header level={level} visits={302} />
            {/* CARD LIST CON LA DATA DE LOS QUE VISITARON */}
            <div className={`max-w-md bg-gradient-to-b ${getGradient(level)} sm:max-w-4xl lg:max-w-7xl   mx-auto shadow-2xl  rounded-xl p-4 `}>
                <ul className="space-y-2 h-[600px] overflow-y-auto">
                    {visits.map((visit) => (
                        <CardList level={level} amount={visit.amount} date={visit.date} id={visit.id} name={visit.name} time={visit.time} />
                    ))}
                </ul>
            </div>
        </ContainerModules>

    )
}