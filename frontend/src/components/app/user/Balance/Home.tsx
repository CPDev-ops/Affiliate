import { Header } from "./components/Header"
import { CardCreditsEarned } from "./components/CardCreditsEarned"
import { ProgressSteps } from "./components/ProgressSteps"
import { useLevel } from "../../../../context/LevelContext"
/* import { useDeviceType } from "../../../hook/useDeviceType" */
/* import { EmojiOrIconChart } from "./components/EmojiChart" */
import { ContainerModules } from "../../../hook/containerModules"

interface HomeProps {
    domain: string
}
export function Home({ domain }: HomeProps) {
    const { level } = useLevel(); // Acceder al valor de 'level'
    /*   const { isDesktop, isMobile, isTablet } = useDeviceType() */
    /* const valuesData = [10, 60, 4, 40] */
    return (
        <ContainerModules domain={domain}>
            {/* Header */}
            <Header userName="Alex Becci" level={level} />
            {/* CARD QUE MUESTRA EL VALOR DE CREDITOS GANADOS */}
            <CardCreditsEarned income={5} level={level} value={350205} />
            <div className="my-4">
                {/* CARD DE TESTEO */}
                <ProgressSteps level={level} currentStep={level} totalSteps={5} />
            </div>
            {/* CARD DE VALUES IN CHARTJS */}
            {/*  <div className="my-4 ">
                <EmojiOrIconChart isDesktop={isDesktop} isMobile={isMobile} isTablet={isTablet} conversionValues={valuesData} level={level} />
            </div> */}
        </ContainerModules >
    )
}

//funciones q retornan valores hardcodeados para el testeo rapido
