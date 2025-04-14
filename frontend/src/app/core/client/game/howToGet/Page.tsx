import { useDeviceType } from "../../../../hook/useDeviceType"
import { Footer } from "../../../auth/components/Footer"
import { ButtonGeneral } from "../../../user/components/Button"
import { ImageHome } from "../components/ImageComponent"
import { getTextHeaderHowToGet, openMaps } from "../../../../utils/changedDomainPage"
import { getBackgroundImage } from "../utils/utils"


export function HowToGetPage({ domain }: { domain: string }) {
    const { isDesktop, isMobile, isTablet } = useDeviceType()
    //importamos la imagen segun la resolucion
    const backgroundImage = getBackgroundImage({ isDesktop, isTablet })
    return (
        <div className="min-h-screen flex flex-col   tracking-wider  p-4 relative"
        >
            <div className="absolute z-0 inset-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: '50%'
                }}>
            </div>
            <div className="flex-1 z-30 flex flex-col justify-center items-center">
                <div className="w-full max-w-md lg:max-w-2xl space-y-8 ">
                    <Title domain={domain} />
                    <div className="flex justify-center items-center">
                        <ButtonGeneral click={() => openMaps(domain)} domain={domain} text="CÓMO LLEGAR" className="" />
                    </div>
                </div>
            </div>

            <ImageHome domain={domain} />
            <Footer domain={domain} isDesktop={isDesktop} isMobile={isMobile} isTablet={isTablet} />
        </div>
    )
}

function Title({ domain }: { domain: string }) {
    return (
        <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-white text-center mb-4 bisonBoldItallic text-4xl sm:text-5xl lg:text-6xl "><span className="text-[#FFFF00]">TE ESPERAMOS </span>CON TU DNI EN {getTextHeaderHowToGet(domain)} PARA<br />
            <span className="text-[#FFFF00]">CANJEAR TU PREMIO</span>
        </h1>
    )
}

/* 
TE ESPERAMOS CON TU DNI EN Nuevo casino alberdi PARA CANJEAR TU PREMIO

*/
