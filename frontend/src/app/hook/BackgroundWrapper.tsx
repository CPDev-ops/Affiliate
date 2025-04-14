
interface BackgroundWrapperProps {
    children: React.ReactNode
    domain: string
}
export function BackgroundWrapper({ children, domain }: BackgroundWrapperProps) {
    return (
        <div className={`min-h-screen ${domain.toLowerCase() !== 'SALTA' ? 'bg-[#230F00]' : ' bg-[#6D0FB4]'} text-white`} >
            {children}
        </div>
    )
}