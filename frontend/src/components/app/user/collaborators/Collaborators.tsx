import { IoMdAdd } from "react-icons/io";
import { useLevel } from "../../../../context/LevelContext";
import { ContainerModules } from "../../../hook/containerModules";
import { ButtonComponent } from "../components/Button";
import { IconBackHome } from "../components/Icon";
import { Header } from "./components/Header";
import { getBackgroundButton } from "../../../utils/transformData";
import { AllCollaboratorsChart } from "./components/ChartData";
import { useDeviceType } from "../../../hook/useDeviceType";
import { CollaboratorCard } from "./components/CollaboratorCard";

interface CollaboratorsProps {
    domain: string
}
export function Collaborators({ domain }: CollaboratorsProps) {
    const { level } = useLevel(); // Acceder al valor de 'level'
    const backgroundButton = getBackgroundButton(level)
    const { isDesktop, isMobile, isTablet } = useDeviceType()
    const valuesData1 = [1, 60, 4, 40];
    const valuesData2 = [1, 40, 20, 60];
    const valuesData3 = [1, 30, 30, 1];
    const names: string[] = ['Juan Salazar', 'María Salinas', 'Roberta Sánchez']
    const collaborators = [
        {
            id: 1,
            name: "Juan Salazar",
            imageUrl: "/images/user/collaborators/avatar-1.png",
            isVisible: true,
        },
        {
            id: 2,
            name: "Maria Salinas",
            imageUrl: "/images/user/collaborators/avatar-2.png",
            isVisible: false,
        },
        {
            id: 3,
            name: "Roberta Sánchez",
            imageUrl: "/images/user/collaborators/avatar-3.png",
            isVisible: false,
        },
    ]
    return (
        <ContainerModules domain={domain}>
            <IconBackHome level={level} />
            <Header level={level} />
            {/* CARD COLLABORATORS */}
            <div className="space-y-2 py-4">
                {collaborators.map((collaborator) => (
                    <CollaboratorCard level={level} key={collaborator.id} name={collaborator.name} imageUrl={collaborator.imageUrl} isVisible={collaborator.isVisible} />
                ))}
            </div>
            <ButtonComponent text="Crear Colaborador" className={`w-1/2 font-semibold ${backgroundButton} `} click={() => console.log('lsdmamklds')} icon={<IoMdAdd />} />
            <div className="my-4">
                <AllCollaboratorsChart
                    names={names}
                    level={level}
                    conversionValuesList={[valuesData1, valuesData2, valuesData3]} // Pasa múltiples datasets
                    isDesktop={isDesktop}
                    isMobile={isMobile}
                    isTablet={isTablet}
                />
            </div>
        </ContainerModules>
    )
}

