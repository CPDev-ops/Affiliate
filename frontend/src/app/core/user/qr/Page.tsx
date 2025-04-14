import { QRCodeCanvas } from "qrcode.react"; // Importación correcta
import { ContainerModulesQR } from "../../../hook/containerModuleQr";
import { useDeviceType } from "../../../hook/useDeviceType";
import { ComponentProp } from "../../../../types/TypePropsComponents";
import { useSearchParams } from "react-router-dom";


export function QrPage({ domain }: ComponentProp) {
    const fullURL = window.location.hostname;
    console.log("URL completa:", fullURL);
    const { isMobile, isTablet } = useDeviceType()
    const imgMobileTablet = `/images/user/qr/mobile/${domain.toLowerCase()}.jpg`;
    const imgDesktop = `/images/user/qr/desktop/${domain.toLowerCase()}.png`

    const [searchParams] = useSearchParams()
    const code = searchParams.get('code');//obtener el valor del parametro


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
                        <div className="p-2 bg-white rounded-md">
                            {/* PROD */}
                            {/* <QRCodeCanvas value={fullURL + '/client/game?code=2f3766348f'} size={200} level="H" /> */}
                            {/* DESARROLLO */}
                            <QRCodeCanvas value={`${fullURL}/client/game?code=${code}`} size={220} level="H" />
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
