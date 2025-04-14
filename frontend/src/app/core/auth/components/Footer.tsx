import { useEffect, useState } from "react";
import { BsWhatsapp, BsInstagram, BsFacebook } from "react-icons/bs";
//importamos lo de domain
import { openIconByDomain } from "../../../utils/changedDomainPage";
//importamos la imagen segun el domain


interface PropsFooter {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    domain: string
}

export function Footer({ isDesktop, domain }: PropsFooter) {
    const [iconSize, setIconSize] = useState<number>(24);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640 && window.innerWidth < 1023) {
                setIconSize(24); // Tamaño para tabletas
            } else if (window.innerWidth >= 1023) {
                setIconSize(28); // Tamaño para pantallas más grandes
            } else {
                setIconSize(24); // Tamaño para móviles
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial icon size
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        /* custom-gradient */
        <div className={`w-full z-20  ${isDesktop ? '' : ''}`}>
            <div className=" bebasNeueRegular   flex flex-col sm:flex-row sm:mx-4 justify-center lg:justify-between lg:px-[5rem] items-center py-8">
                <img src={`/images/client/game/${domain.toLowerCase()}/loteria.png`} className="w-40 sm:w-44 lg:w-[12rem] p-2 " alt="Logo Loteria" />
                <h1 className=" text-lg sm:text-lg 2xl:text-xl  text-zinc-200 mx-8 tracking-normal   text-center">
                    Solo para mayores de 18 años, <span className="hidden lg:block lg:-my-3"><br /></span> el juego compulsivo es perjudicial para la salud.
                </h1>
                <div className="flex justify-center gap-4 py-4 items-center text-white">
                    <BsWhatsapp className="cursor-pointer hover:text-greenMain duration-300" onClick={() => openIconByDomain('WHATSAPP',domain)} size={iconSize} />
                    <BsInstagram className="cursor-pointer hover:text-redMain duration-300" onClick={() => openIconByDomain('INSTAGRAM',domain)} size={iconSize} />
                    <BsFacebook className="cursor-pointer hover:text-blue-500 duration-300" onClick={() => openIconByDomain('FACEBOOK',domain)} size={iconSize} />
                </div>
            </div>
        </div>
    );
}
