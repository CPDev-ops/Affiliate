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
import { useState } from "react";
import { ModalForm } from "./components/CreateCollaborator";
import { ComponentProp } from "../../../../types/TypePropsComponents";

export function Collaborators({ domain,type }: ComponentProp) {
    const { level } = useLevel(); // Acceder al valor de 'level'
    const backgroundButton = getBackgroundButton(level)
    const { isDesktop, isMobile, isTablet } = useDeviceType()
    const valuesData1 = [1, 60, 4, 40];
    const valuesData2 = [1, 40, 20, 60];
    const valuesData3 = [1, 30, 30, 1];
    const valuesData4 = [1, 20, 60, 21];
    const names: string[] = ['Juan Salazar', 'María Salinas', 'Roberta Sánchez', 'Roberto Bolanos']
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
        {
            id: 4,
            name: "Roberto Bolanos",
            imageUrl: "/images/user/collaborators/avatar-4.png",
            isVisible: false,
        },
    ]
    //modal para crear el colaborador
    const [modal, setModal] = useState<boolean>(false)

    return (
        <ContainerModules type={type} domain={domain}>
            <IconBackHome level={level} />
            <Header length={collaborators.length} level={level} />
            {/* CARD COLLABORATORS */}
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center max-h-[300px] overflow-y-auto">
                {collaborators.length > 0 && (
                    collaborators.map((collaborator, index) => (
                        <CollaboratorCard id={index} level={level} key={collaborator.id} name={collaborator.name} imageUrl={collaborator.imageUrl} isVisible={collaborator.isVisible} />
                    ))

                )}
            </div>
            <div className="w-1/2 lg:w-1/6 lg:ml-auto">
                <ButtonComponent text="Crear Colaborador" className={` my-4 font-semibold ${backgroundButton} `} click={() => setModal(true)} icon={<IoMdAdd />} />
            </div>
            <AllCollaboratorsChart
                names={names}
                level={level}
                conversionValuesList={[valuesData1, valuesData2, valuesData3, valuesData4]} // Pasa múltiples datasets
                isDesktop={isDesktop}
                isMobile={isMobile}
                isTablet={isTablet}
            />
            {modal && (
                <ModalForm level={level} close={() => setModal(false)} />
            )}
        </ContainerModules>
    )
}





