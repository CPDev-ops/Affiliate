import { useEffect, useState } from 'react'
import { MdErrorOutline } from "react-icons/md";
import { gradientForModal } from '../../utils/utils';
import { Button } from '../Button';


interface Props {
    onClose: () => void
    /*   deleteUser: () => void */
    title: string | undefined
    subTitle: string | undefined
    buttonText: string | undefined
    domain: string
}
export interface dtoModal {
    title: string
    subTitle: string
}


export function ModalError({ onClose, title, subTitle, buttonText, domain }: Props) {

    /* const [loading, setLoading] = useState<boolean>(false); */
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        // Muestra el modal después de un pequeño retraso para que la animación se reproduzca correctamente
        const timeout = setTimeout(() => setShowModal(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="p-4 flex items-center justify-center h-screen text-white textGothamMedium ">
            <div>
                <div x-show="showModal" className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>

                    <div className={`${gradientForModal(domain.toUpperCase())} rounded-2xl p-8 w-[20rem] sm:w-[30rem] py-8  shadow-2xl transform transition-all duration-300`}>
                        <div className='flex justify-center items-center'>
                            <MdErrorOutline size={60} className='text-[#FFFF00]' />
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <h2 className="text-lg text-center text-backgroundCyanDark text-gray-100 ml-auto mr-auto uppercase sm:text-xl font-semibold">{title}</h2>
                        </div>
                        <div className="flex justify-between items-center py-1">
                            <h2 className="text-sm text-center text-gray-300 ml-auto mr-auto uppercase sm:text-base">{subTitle}</h2>
                        </div>
                        <div className='mx-auto flex justify-center items-center'>
                            {/*  <button onClick={onClose} className={`px-4 mx-auto py-1 rounded-full ${gradientForButtonGeneral(domain.toUpperCase())} min-w-[6rem]  duration-300 sm:text-xl`}>{buttonText}</button> */}
                            <Button click={onClose} domain={domain} text={buttonText && buttonText} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
