import { motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Header } from "./components/Header"
import { CardCreditsEarned } from "./components/CardCreditsEarned"
import { ProgressSteps } from "./components/ProgressSteps"
import { useLevel } from "../../../../context/LevelContext"
import { useDeviceType } from "../../../hook/useDeviceType"
import { EmojiOrIconChart } from "./components/EmojiChart"

export function Home() {
    const { level } = useLevel(); // Acceder al valor de 'level'
    const { isDesktop, isMobile, isTablet } = useDeviceType()
    const valuesData = [10, 60, 4, 40]
    return (
        <div className="max-w-md sm:max-w-full mx-auto  min-h-screen ">
            <Navbar level={level} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=""
            >
                <div className="p-4 sm:max-w-4xl lg:max-w-7xl mx-auto">
                    {/* Header */}
                    <Header userName="Alex Becci" level={level} />
                    {/* CARD QUE MUESTRA EL VALOR DE CREDITOS GANADOS */}
                    <div className="sm:grid w-full sm:grid-cols-2 sm:gap-2  md:my-4">
                        <CardCreditsEarned level={level} value={350205} />
                        <div className="my-4 md:my-0">
                            {/* CARD DE TESTEO */}
                            <ProgressSteps level={level} currentStep={level} totalSteps={5} />
                        </div>
                    </div>
                    {/* CARD DE VALUES IN CHARTJS */}
                    <div className="my-4 ">
                        <EmojiOrIconChart isDesktop={isDesktop} isMobile={isMobile} isTablet={isTablet} conversionValues={valuesData} level={level} />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}