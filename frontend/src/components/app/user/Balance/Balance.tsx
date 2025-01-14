import { motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Header } from "./components/Header"
import { CardList } from "./components/CardList";
import { getGradient } from "../../../config/getGradient";
import { useLevel } from "../../../../context/LevelContext";

export function Balance() {
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
        <div className="max-w-md sm:max-w-full mx-auto min-h-screen">
            <Navbar level={level} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=""
            >
                <div className="p-4 sm:max-w-4xl lg:max-w-7xl  mx-auto">
                    {/* HEADER */}
                    <Header level={level} visits={302} />
                    {/* CARD LIST CON LA DATA DE LOS QUE VISITARON */}
                    <div className={`max-w-md bg-gradient-to-b ${getGradient(level)} sm:max-w-4xl lg:max-w-7xl   mx-auto shadow-2xl  rounded-xl p-4 `}>
                        <ul className="space-y-2 h-[600px] overflow-y-auto">
                            {visits.map((visit) => (
                                <CardList level={level} amount={visit.amount} date={visit.date} id={visit.id} name={visit.name} time={visit.time} />
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}