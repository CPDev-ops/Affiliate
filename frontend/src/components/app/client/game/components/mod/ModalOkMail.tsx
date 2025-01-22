import { useEffect, useState } from 'react'
import { gradientForButtonGeneral, gradientForModal } from '../../utils/utils';


interface Props {
    onClose: () => void
    email: string | undefined
    domain: string
}
export interface dtoModal {
    title: string
    subTitle: string
}

export function ModalOkMail({ onClose, email, domain }: Props) {
    /* const [loading, setLoading] = useState<boolean>(false); */
    const [showModal, setShowModal] = useState<boolean>(false);
    console.log('DOMINO PARA MODAL', domain)
    useEffect(() => {
        // Muestra el modal después de un pequeño retraso para que la animación se reproduzca correctamente
        const timeout = setTimeout(() => setShowModal(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="p-4 flex items-center  justify-center h-screen text-white ">
            <div>
                <div x-show="showModal" className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto  transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`${gradientForModal(domain.toUpperCase())}  rounded-2xl p-8 w-[20rem] sm:w-[24rem] xl:w-[26rem] py-8  shadow-2xl transform transition-all duration-300 `}>
                        <div className="flex  flex-col justify-between  items-center py-1 flex-shrink">
                            <h2 className="text-4xl lg:text-3xl texto-inclinado text-[#FFFF00]  bebasNeueRegular text-center tracking-wide gradientTextRevert  px-2  break-words w-full  mx-auto uppercase ">{'YA TENÉS TU PREMIO'}</h2>
                        </div>
                        <div style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className='flex lg:ml-4  texto-inclinado flex-col justify-center   items-center py-1 flex-shrink'>
                            <h3 className='text-xl lg:text-xl   text-center tracking-wide text-white  my-2  break-words w-full'><span className='text-[#FFFF00]'>Ingresá</span> a tu casilla de correo <br />
                                <h1 className='text-base my-1'>{email}</h1><span className='text-[#FFFF00] text-xl'>y disfrutá!</span></h3>
                        </div>
                        <div className='flex   texto-inclinado flex-col justify-between  items-center py-1 flex-shrink'>
                            <h1 className='text-sm lg:text-xl text-center tracking-wide text-white  my-2  break-words w-full'>Revisá la casilla de SPAM si no lo ves en bandeja de ENTRADA</h1>
                        </div>
                        <div className='w-full flex justify-center items-center'>
                            <button id="btnReclamaTuPremio" className={`     rounded-3xl   px-8 py-1 sm:px-12 my-4  bebasNeueRegular texto-inclinado text-3xl sm:text-3xl shadow-lg tracking-widest  shadow-black/70 ${gradientForButtonGeneral(domain.toUpperCase())}`} type="button" onClick={onClose}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
