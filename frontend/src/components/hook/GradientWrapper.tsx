
import { useDeviceType } from "./useDeviceType"

interface GradientWrapperProps {
    domain: string
    children: React.ReactNode
}

export function GradientWrapper({ domain, children }: GradientWrapperProps) {
    const { isDesktop } = useDeviceType()
    return (
        <div className="min-h-screen" style={getBackgroundStyle(domain, { isDesktop })}>
            {children}
        </div>
    )
}

function getBackgroundStyle(domain: string, { isDesktop }: { isDesktop: boolean }): React.CSSProperties {
    const styles: Record<string, string> = {
        PILAR: `radial-gradient(${isDesktop ? '50%' : '100%'} 65% at 50% 50%, #FB2B54 0%, #FB2B54 10%, rgba(251, 43, 84, 0.8) 20%, rgba(251, 43, 84, 0.6) 35%, rgba(35, 15, 0, 0.8) 55%, rgba(35, 15, 0, 1) 85%, #000000 100%)`,
        ZARATE: `radial-gradient(${isDesktop ? '50%' : '100%'} 65% at 50% 50%, #FF0000 0%, #FF0000 10%, rgba(255, 0, 0, 0.8) 20%, rgba(255, 0, 0, 0.6) 35%, rgba(35, 15, 0, 0.8) 55%, rgba(35, 15, 0, 1) 85%, #000000 100%)`,
        SALTA: `radial-gradient(${isDesktop ? '50%' : '100%'} 65% at 50% 50%, #530127 0%, #530127 15%, rgba(83, 1, 39, 0.8) 20%, rgba(109, 15, 180, 0.6) 35%, rgba(109, 15, 180, 0.8) 55%, rgba(109, 15, 180, 1) 85%, #6D0FB4 100%)`,
    };

    return {
        background: styles[domain] || styles.PILAR,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        minHeight: '100vh',
    };
}

