import { useEffect, useState } from 'react'
import img from '/images/notFound.png'
import { getBackgroundClass, gradientForButtonGeneral, gradientForModal } from '../../utils/utils';

interface Props {
    title: string | undefined
    onClick: () => void
    domain: string
    subTitle: string
}
export interface dtoModal {
    title: string
    subTitle: string
}

export function ModalNoParams({ title, onClick, domain, subTitle }: Props) {
    /* const [loading, setLoading] = useState<boolean>(false); */
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => setShowModal(true), 10);

        // Agregar clase para desactivar el desplazamiento
        document.body.style.overflow = 'hidden';

        return () => {
            clearTimeout(timeout);
            // Quitar clase para activar el desplazamiento
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="p-4 flex items-center justify-center h-screen text-white textGothamMedium ">
            <div>
                <div x-show="showModal" className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto ${getBackgroundClass(domain.toUpperCase())} transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`${gradientForModal(domain.toUpperCase())} rounded-2xl p-8 w-[20rem] sm:w-[24rem] py-8 shadow-2xl transform transition-all duration-300`}>
                        <div className='flex justify-center items-center'>
                            <img src={img} className='w-32 sm:w-[6rem]' alt="" />
                        </div>
                        <div className="flex justify-between items-center my-2">
                            <h2 className="text-base text-center text-backgroundCyanDark text-gray-100 ml-auto mr-auto uppercase sm:text-lg  font-semibold texto-inclinado">{title}</h2>
                        </div>
                        <div className="flex justify-between items-center my-2">
                            <h2 className="text-xs text-center text-backgroundCyanDark text-gray-100 ml-auto mr-auto uppercase sm:text-sm   texto-inclinado">{subTitle}</h2>
                        </div>
                        <div className='grid grid-cols-1  bebasNeueRegular mt-4  gap-4 items-center'>
                            <button onClick={onClick} className={`texto-inclinado px-[2.5rem] sm:px-[3rem] lg:px-12 hover:scale-105  mx-auto  uppercase py-1 rounded-full ${gradientForButtonGeneral(domain.toUpperCase())} duration-300 text-xl  tracking-widest`}>Continuar!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
