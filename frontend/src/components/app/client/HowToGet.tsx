import { googleMapsPilar, googleMapsSalta, googleMapsZarate } from "../../../content/dataDomain";
import { useDeviceType } from "../../hook/useDeviceType";
import { Footer } from "../auth/components/Footer";

const img = `/images/backgroundImage.png`

export function HowToGet({ domain }: { domain: string }) {
    const { isDesktop, isMobile, isTablet } = useDeviceType()

    //funcion que hace la logica del open para cada sede segun el dominio
    function openLink(domain: string) {
        const url = domain === 'PILAR'
            ? googleMapsPilar
            : domain === 'ZARATE'
                ? googleMapsZarate
                : domain === 'SALTA'
                    ? googleMapsSalta
                    : '#'; // Puedes definir un valor por defecto o un manejo de error aquí
        window.open(url, '_blank'); // Abrir en una nueva pestaña
        return
    }

    return (
        <div style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            /* backgroundBlendMode: 'overlay', */ // Cambia de 'backgroundBlend' a 'backgroundBlendMode'
        }} className="min-h-screen flex flex-col   tracking-wider  p-4">
            {/* HOW TO GET */}
            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="w-full max-w-md space-y-8">
                    <div className="bg-black   p-6 rounded-xl space-y-6">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <div className="w-full    max-w-xs">
                                <img
                                    src={`/images/${domain.toLowerCase()}/logo-dominio.png`}
                                    alt="Beach Oasis Zarate"
                                    className="w-40 mx-auto   h-auto"
                                />
                            </div>
                        </div>
                        <h2 className="text-white bisonBoldItallic   text-xl text-center ">
                            Acercate a Bingo Oasis {domain} con tu DNI para canjear tu premio y disfrutar
                        </h2>
                        <div className="space-y-4">
                            <button
                                type="button"
                                onClick={() => openLink(domain)}
                                className={`w-full bg-[#FF0000] hover:bg-red-700   text-white py-3 rounded-full text-sm tracking-widest  gothamBook uppercase  transition-colors`}
                            >
                                Como llegar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Logo */}
            <Footer domain={domain} isDesktop={isDesktop} isMobile={isMobile} isTablet={isTablet} />
        </div>
    )
}