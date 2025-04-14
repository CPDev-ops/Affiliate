
interface ContainerModulesProps {
    children: React.ReactNode
    title: string
}
export const ContainerModulesAdmin: React.FC<ContainerModulesProps> = ({ children, title }) => {
    return (
        <div className="bg-gray-300/10 rounded-md shadow-sm my-4 p-4">
            {/* TITLE */}
            <h1 className="my-2"> {title}</h1>
            {children}
        </div>
    )
}






