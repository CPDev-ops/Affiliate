import { useEffect, useState } from 'react'
import img from '/images/client/game/18.png'
import { getBackgroundClass, gradientForButtonGeneral, gradientForModal } from '../../utils/utils';

interface Props {
    onClose: () => void
    title: string | undefined
    onCloseOk: () => void
    domain: string
}
export interface dtoModal {
    title: string
    subTitle: string
}

export function ModalAge({ onClose, title, onCloseOk, domain }: Props) {
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
                            <img src={img} className='w-[4rem] sm:w-[6rem]' alt="" />
                        </div>
                        <div className="flex justify-between items-center my-8">
                            <h2 className="text-lg text-center text-backgroundCyanDark text-gray-100 ml-auto mr-auto uppercase sm:text-xl  font-semibold texto-inclinado">{title}</h2>
                        </div>
                        <div className='grid grid-cols-2  bebasNeueRegular  gap-4 items-center'>
                            <button onClick={onClose} className='texto-inclinado px-[2.5rem] sm:px-[3rem] lg:px-12 hover:scale-105 mx-auto uppercase py-1  rounded-full min-w-[6rem]  bg-gradient-to-r from-zinc-50 to-black  text-xl  tracking-widest'>No!</button>
                            <button onClick={onCloseOk} className={`texto-inclinado px-[2.5rem] sm:px-[3rem] lg:px-12 hover:scale-105  mx-auto  uppercase py-1 rounded-full ${gradientForButtonGeneral(domain.toUpperCase())} duration-300 text-xl  tracking-widest`}>Si!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
