import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'



interface Props {
    onClose: () => void
    email: string | undefined
}
export interface dtoModal {
    title: string
    subTitle: string
}


export function ModalMail({ onClose, email }: Props) {
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        // Muestra el modal después de un pequeño retraso para que la animación se reproduzca correctamente
        const timeout = setTimeout(() => setShowModal(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="p-4 flex items-center  justify-center h-screen text-white ">
            <div>
                <div x-show="showModal" className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>

                    <div className="bg-white border-4 border-redMain  rounded-2xl p-8 w-[20rem] sm:w-[24rem] xl:w-[26rem] py-8  shadow-2xl transform transition-all duration-300 ">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-black hover:text-yellowMain text-2xl"
                            aria-label="Close"
                        >
                            <AiOutlineClose />
                        </button>
                        <div className='flex  flex-col justify-between  items-center py-1 flex-shrink'>
                            <h3 className='text-xl lg:text-2xl text-center tracking-wide text-black uppercase my-2  break-words w-full'>TE HEMOS ENVIADO EL PREMIO A LA CASILLA DE CORREO <br />
                                <span className='text-red-500 text-sm'>{email}</span></h3>
                        </div>
                        <div className="flex flex-col justify-between items-center py-1">
                            <h2 className="text-sm lg:text-xs text-center tracking-wide mx-auto uppercase  text-black/80">SI NO TE LLEGÓ VERIFICÁ EN TU CASILLA DE SPAM O CORREO NO DESEADO</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 