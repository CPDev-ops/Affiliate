import { useDeviceType } from "../../../../hook/useDeviceType"
import { Footer } from "../../../auth/components/Footer"
import { ButtonGeneral } from "../../../user/components/Button"
import { getTextButtonAlreadyPlayed, openLinkWeb } from "../../../../utils/changedDomainPage"
import { ImageHome } from "../components/ImageComponent"

const img = `/images/client/game/backMobile.png`
const ups = `/images/client/game/ups.png`
export function AlreadyPlayedPage({ domain }: { domain: string }) {
    const { isDesktop, isMobile, isTablet } = useDeviceType()
    //importamos navigate
    return (
        <div className="min-h-screen flex flex-col   tracking-wider  p-4 relative">
            <div className="absolute z-0 inset-0"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: '50%'
                }}>
            </div>
            <div className="flex-1 z-30 flex flex-col justify-center items-center">
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl space-y-8 ">
                    <Header imageHeader={ups} />
                    <Title />
                    <SubTitle />
                    <div className="flex justify-center items-center">
                        <ButtonGeneral click={() => openLinkWeb(domain)} domain={domain} text={getTextButtonAlreadyPlayed(domain)} className="" />
                    </div>
                    <ImageHome domain={domain} />
                </div>
            </div>
            {/* Footer Logo */}
            <Footer domain={domain} isDesktop={isDesktop} isMobile={isMobile} isTablet={isTablet} />
        </div>
    )
}
function Header({ imageHeader }: { imageHeader: string }) {
    return (
        <div className="w-72 mx-auto  z-40">
            <img
                src={imageHeader}
                className="w-full sm:w-full my-6 mx-auto"
                alt="Titulo Alterno"
            />
        </div>
    )
}
function Title() {
    return (
        <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-[#FFFF00] text-center mb-4 texto-inclinado  text-lg sm:text-xl lg:text-2xl tracking-widest ">
            RECORDÁ QUE ESTA PROMO ES SOLO PARA PERSONAS QUE NO HAYAN RECIBIDO PREMIOS EN PROMOCIONES ANTERIORES.
        </h1>
    )
}

function SubTitle() {
    return (
        <h1 style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className="text-white text-center mb-4 texto-inclinado  text-base sm:text-lg lg:text-xl tracking-widest ">
            ¡Pero no te preocupes! Entrá a nuestra web y enterate todas las cosas que tenemos para vos!
        </h1>
    )
}