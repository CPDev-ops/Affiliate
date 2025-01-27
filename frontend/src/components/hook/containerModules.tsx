import { useLevel } from "../../context/LevelContext";
import { Navbar } from "../app/user/components/Navbar";
import { motion } from "framer-motion"

interface ContainerModulesProps {
    children: React.ReactNode
    domain: string
}
export function ContainerModules({ children, domain }: ContainerModulesProps) {
    const { level } = useLevel(); // Acceder al valor de 'level'
    return (
        <div className="max-w-full :max-w-full mx-auto bg-[#EBEBEB]  min-h-screen ">
            <Navbar domain={domain} level={level} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=""
            >
                <div className="p-4 px-8 max-h-full sm:max-w-4xl lg:max-w-7xl mx-auto">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}