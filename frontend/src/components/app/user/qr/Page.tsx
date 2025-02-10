import { QRCodeCanvas } from "qrcode.react"; // Importación correcta
import { ContainerModulesQR } from "../../../hook/containerModuleQr";
import { useDeviceType } from "../../../hook/useDeviceType";
import { ComponentProp } from "../../../../types/TypePropsComponents";
const imgMobileTablet = `/images/user/qr/background.jpg`;
const imgDesktop = `/images/user/qr/backgroundDesktop.png`;



export function QrPage({ domain }: ComponentProp) {
    const fullURL = window.location.origin;
    console.log("URL completa:", fullURL);
    const { isMobile, isTablet } = useDeviceType()

    return (
        <div
            className="min-h-screen tracking-wider p-4"
            style={{
                backgroundImage: `url(${isMobile || isTablet ? imgMobileTablet : imgDesktop})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <ContainerModulesQR domain={domain}>
                <div className="min-h-[calc(100vh-100px)]  flex flex-col">

                    {/* CENTRO (Siempre centrado) */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
                        <h1
                            style={{ textShadow: "4px 5px 4px rgba(0, 0, 0, 4.5)" }}
                            className="bisonBoldItallic text-3xl xl:text-5xl my-4 text-[#FFFF00] text-center"
                        >
                            ESCANEÁ, JUGÁ Y GANÁ <br />
                            TU PREMIO
                        </h1>
                        {/* Código QR generado */}
                        <div className="p-4 bg-white rounded-md">
                            {/* PROD */}
                            {/* <QRCodeCanvas value={fullURL + '/client/game?code=2f3766348f'} size={200} level="H" /> */}
                            {/* DESARROLLO */}
                            <QRCodeCanvas value={'https://test.oasiszarate.com.ar/client/game?code=2f3766348f'} size={200} level="H" />
                        </div>
                    </div>
                    {/* FOOTER (Siempre abajo) */}
                    <div className="pb-6 flex justify-center">
                        <img
                            src={`/images/client/game/${domain.toLowerCase()}/logo-dominio.png`}
                            className={`${domain.toUpperCase() !== "SALTA" ? "w-60 sm:w-64" : "w-36 sm:w-40"
                                } mt-8 mx-auto z-20`}
                            alt="Titulo Alterno"
                        />
                    </div>
                </div>
            </ContainerModulesQR>
        </div>
    );
}
