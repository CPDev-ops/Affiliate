import { useMediaQuery } from "react-responsive";

export function useDeviceType() {
    const isMobile = useMediaQuery({ maxWidth: 639 })// hasta sm
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 })//desde sm hasta md
    const isDesktop = useMediaQuery({ minWidth: 1024 });//desde md en adelante

    return { isMobile, isTablet, isDesktop }
}


//function que cambia valorres segun el tamaño de la pantalla
export function getDeviceConfig(isDesktop: boolean, isTablet: boolean, isMobile: boolean) {
    if (isDesktop) {
        return {
            barThickness: 60,
            fontSize: 24,
        }
    }
    if (isTablet) {
        return {
            barThickness: 40,
            fontSize: 16,
        }
    }
    if (isMobile) {
        return {
            barThickness: 20,
            fontSize: 12,
        }
    }
}
