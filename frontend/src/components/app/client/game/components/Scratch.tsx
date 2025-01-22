import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../../hook/Modal';
import { ModalError, dtoModal } from './mod/ModalError';
import { baseUrl } from '../../../../../content/dataDomain';
import { fetchMailEnviado } from '../../api/prize';
import { motion } from "framer-motion"
import { getColorBorder, gradientForButtonGeneral } from '../utils/utils';
import { updateBorderColor } from '../utils/utils';
import { ModalOkMail } from './mod/ModalOkMail';
import { LoaderFetch } from './Loader';
import { getTextScratch } from '../utils/utils';
import '../../../../../raspado.css'

interface ScratchRaspadaProps {
    imgRaspado: string;
    buttonGetPrize: () => void
    fetchPrize: boolean;
    code: string
    domain: string
}

interface modalValues {
    boolean: boolean
    number: number
}

export const ScratchRaspada: React.FC<ScratchRaspadaProps> = ({ imgRaspado, buttonGetPrize, fetchPrize, code, domain }) => {
    // loading
    const [loading, setLoading] = useState<boolean>(false)

    //navigate
    const navigate = useNavigate()
    const [email, setEmail] = useState<string | undefined>()
    const [modal, setModal] = useState<modalValues | null>(null)
    const [dataModal, setDataModal] = useState<dtoModal | null>(null)
    const [prize, setPrize] = useState<string | null>(null)

    //constante del scratch
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scratchCardCoverRef = useRef<HTMLDivElement | null>(null);
    const scratchCardCanvasRenderRef = useRef<HTMLImageElement | null>(null);
    const scratchCardCoverContainerRef = useRef<HTMLDivElement | null>(null);
    const scratchCardTextRef = useRef<HTMLParagraphElement | null>(null);
    const scratchCardTextRefApiPrize = useRef<HTMLParagraphElement | null>(null);
    const scratchCardImageRef = useRef<HTMLImageElement | null>(null);
    const getPrizeButtonRef = useRef<HTMLButtonElement | null>(null);
    //aplicando logica para el cambio de color en el border del scratch
    const color = getColorBorder(domain.toUpperCase())

    updateBorderColor(color)
    //logica del premio a obtener
    async function getDataPrize() {
        setLoading(true)

        try {
            /* const response: any = await getPrize(campaignCode)
            const data: Prize = await response.json(); */
            const response = await fetch(`${baseUrl}/obtener_premio?codigo_campana=${code}`, {
                credentials: 'include' as RequestCredentials,
                mode: "cors" as RequestMode,
                redirect: 'follow' as RequestRedirect
            });
            const data = await response.json();
            /*  switch (response.status) { */
            switch (response.status) {
                case 401:
                    const email = await fetchMailEnviado();
                    if (email) {
                        setEmail(email)
                        setModal({ boolean: true, number: 401 })
                        setDataModal({ title: 'El premio ya fue enviado', subTitle: 'Checkeá  tu casilla de mail y busca Promociones Bingo Oasis Pilar.' })
                    }
                    break
                case 402:
                    setPrize(data.premio)
                    break
                case 403:
                    setModal({ boolean: true, number: 403 })
                    setDataModal({ title: '¡Estamos mejorando nuestra plataforma para ofrecerte la mejor experiencia posible!', subTitle: 'Estaremos de vuelta pronto' })
                    break;
                case 404:
                    setModal({ boolean: true, number: 404 })
                    setDataModal({ title: '¡Estamos mejorando nuestra plataforma para ofrecerte la mejor experiencia posible!', subTitle: 'Estaremos de vuelta pronto' })
                    break;
                case 200:
                    setPrize(data.premio)
                    break
                default:
                    console.error('Error desconocido')
                    setModal({ boolean: true, number: 500 })
                    setDataModal({ title: '¡Ocurrio un error desconocido!', subTitle: 'Estaremos de vuelta pronto' })
                    break;
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setModal({ boolean: true, number: 500 })
            setDataModal({ title: '¡Ocurrio un error desconocido!', subTitle: 'Estaremos de vuelta pronto' })
            console.error(error)
            /*   window.location.reload() */
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (fetchPrize) {
            getDataPrize()
        }
    }, [fetchPrize])
    //logica de scrach
    useEffect(() => {
        const isSafari = false;
        const scratchCardCover = scratchCardCoverRef.current;
        const scratchCardCanvasRender = scratchCardCanvasRenderRef.current;
        const scratchCardCoverContainer = scratchCardCoverContainerRef.current;
        const scratchCardText = scratchCardTextRef.current;
        const scratchCardImage = scratchCardImageRef.current;
        const textScratchPrize: any = scratchCardTextRefApiPrize.current;
        const getPrizeButton = getPrizeButtonRef.current;

        const canvas = canvasRef.current;
        if (!canvas || !scratchCardCover || !scratchCardCanvasRender || !scratchCardCoverContainer || !scratchCardText || !scratchCardImage || !getPrizeButton || !textScratchPrize) {
            console.error('One or more refs are null');
            return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            console.error('Failed to get canvas context');
            return;
        }

        /*  let isPointerDown = false; */
        let positionX: number | null = null;
        let positionY: number | null = null;
        let clearDetectionTimeout: number | undefined = undefined;

        const devicePixelRatio = window.devicePixelRatio || 1;
        const canvasWidth = canvas.offsetWidth * devicePixelRatio;
        const canvasHeight = canvas.offsetHeight * devicePixelRatio;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        context.scale(devicePixelRatio, devicePixelRatio);

        if (isSafari) {
            canvas.classList.add('block');
        }

        const getPosition = ({ clientX, clientY }: MouseEvent) => {
            const { left, top } = canvas.getBoundingClientRect();
            return {
                x: clientX - left,
                y: clientY - top,
            };
        };

        const plotline = (context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
            const diffX = Math.abs(x2 - x1);
            const diffY = Math.abs(y2 - y1);
            const dist = Math.sqrt(diffX * diffX + diffY * diffY);
            const step = dist / 50;
            let i = 0;
            let t: number;
            let x: number;
            let y: number;

            while (i < dist) {
                t = Math.min(1, i / dist);
                x = x1 + (x2 - x1) * t;
                y = y1 + (y2 - y1) * t;

                context.beginPath();
                context.arc(x, y, 16, 0, Math.PI * 2);
                context.fill();

                i += step;
            }
        };

        const setImageFromCanvas = () => {
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const previousUrl = scratchCardCanvasRender.src;
                    scratchCardCanvasRender.src = url;
                    if (!previousUrl) {
                        scratchCardCanvasRender.classList.remove('hidden');
                    } else {
                        URL.revokeObjectURL(previousUrl);
                    }
                }
            });
        };

        const checkBlackFillPercentage = async () => {
            const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
            const pixelData = imageData.data;
            let blackPixelCount = 0;
            for (let i = 0; i < pixelData.length; i += 4) {
                const red = pixelData[i];
                const green = pixelData[i + 1];
                const blue = pixelData[i + 2];
                const alpha = pixelData[i + 3];

                if (red === 0 && green === 0 && blue === 0 && alpha === 255) {
                    blackPixelCount++;
                }
            }
            const blackFillPercentage = (blackPixelCount * 100) / (canvasWidth * canvasHeight);

            if (blackFillPercentage >= 30) {
                getPrizeButton.style.display = 'block';
                scratchCardCoverContainer.classList.add('clear');
                scratchCardText.textContent = getTextScratch(domain.toUpperCase());
                /*    scratchCardTextRefApiPrize.current.textContent = prize; */
                getPrizeButton.disabled = false;
                /*  const footer = document.getElementById('footer');
                 footer?.scrollIntoView({ behavior: 'smooth' }); */
                // Scroll suave hacia el botón
                getPrizeButton.scrollIntoView({ behavior: 'smooth' });
                scratchCardImage.classList.add('animate');
                scratchCardCoverContainer.classList.add('bg-red-500');
                scratchCardCoverContainer.addEventListener(
                    'transitionend',
                    () => {
                        scratchCardCoverContainer.classList.add('hidden');
                    },
                    { once: true }
                );
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        };

        const plot = (e: MouseEvent) => {
            const { x, y } = getPosition(e);
            if (positionX !== null && positionY !== null) {
                plotline(context, positionX, positionY, x, y);
            }
            positionX = x;
            positionY = y;
            if (isSafari) {
                clearTimeout(clearDetectionTimeout);
                clearDetectionTimeout = window.setTimeout(() => {
                    setImageFromCanvas();
                }, 5);
            }
        };

        canvas.addEventListener('pointerdown', (e) => {
            scratchCardCover.classList.remove('shine');
            const pos = getPosition(e);
            positionX = pos.x;
            positionY = pos.y;
            clearTimeout(clearDetectionTimeout);
            canvas.addEventListener('pointermove', plot);
            window.addEventListener(
                'pointerup',
                () => {
                    canvas.removeEventListener('pointermove', plot);
                    clearDetectionTimeout = window.setTimeout(() => {
                        checkBlackFillPercentage();
                    }, 500);
                },
                { once: true }
            );
        });
    }, []);

    return (
        <div>
            {loading && ( // Muestra el spinner de carga si isLoading es true
                <LoaderFetch domain={domain} />
            )}
            <motion.div
                initial={{ opacity: 0, y: 20 }} // Estado inicial de la animación
                animate={{ opacity: 1, y: 0 }} // Estado final de la animación
                exit={{ opacity: 0, y: -20 }}  // Animación al desmontar (opcional)
                transition={{ duration: 1 }} // Duración de la animación
                className=""
            >
                <div className="grid grid-cols-1 justify-center   items-center">
                    <div className='flex justify-center  sm:my-4'>
                        <div className="scratch-card ">
                            <div className="scratch-card-cover-container shadow-2xl " ref={scratchCardCoverContainerRef}>
                                <canvas ref={canvasRef} className="scratch-card-canvas" width="320" height="320"></canvas>
                                <img ref={scratchCardCanvasRenderRef} className="scratch-card-canvas-render hidden" alt="" />
                                <div className="scratch-card-cover shine" ref={scratchCardCoverRef}>
                                    <svg className="scratch-card-cover-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
                                        <image className='w-full' href={imgRaspado} />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center text-white bg-black/40  px-4 h-full w-full sm:w-full mx-auto text-center">
                                <h1 className='text-4xl  '>¡Ganaste!</h1>
                                <p ref={scratchCardTextRefApiPrize} className="mt-8   text-xl break-words">
                                    {prize ? prize : 'Sigue Raspando...'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="scratch-card-text text-white mt-4  text-center text-lg  sm:my-8 sm:text-2xl lg:text-xl " ref={scratchCardTextRef}></p>
                    <svg width="0" height="0">
                        <filter id="remove-black" colorInterpolationFilters="sRGB">
                            <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -1 -1 -1 0 1" result="black-pixels"></feColorMatrix>
                            <feComposite in="SourceGraphic" in2="black-pixels" operator="out"></feComposite>
                        </filter>
                        <filter id="noise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" />
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
                    </svg>
                    <img ref={scratchCardImageRef} id="raspado_completo" className="hidden " src={imgRaspado} alt="Raspado Completo" />
                    <button type="button" ref={getPrizeButtonRef} style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} onClick={buttonGetPrize} className={`text-white shadow-lg uppercase  border-0 py-2 ${gradientForButtonGeneral(domain.toUpperCase())} mx-[4rem]  rounded-3xl items-center  px-8 sm:px-12 my-12  bebasNeueRegular  text-2xl sm:text-3xl shadow-lg tracking-widest  shadow-black/40 hidden lg:w-1/2 sm:mx-auto`}>
                        <span className='texto-inclinado '>¡Quiero mi Premio!</span>
                    </button>
                </div>
            </motion.div>
            {modal?.boolean && modal.number === 401 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 401 })}>
                    <ModalOkMail domain={domain} email={email} onClose={() => { setModal({ boolean: false, number: 401 }), navigate('/client/game/howToGet') }} />
                </Modal>
            )}
            {modal?.boolean && modal.number === 403 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError domain={domain} buttonText='Continuar' onClose={() => { setModal({ boolean: false, number: 403 }), navigate('/client/game/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal.number === 404 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 403 })}>
                    <ModalError domain={domain} buttonText='Continuar' onClose={() => { setModal({ boolean: false, number: 403 }), navigate('/client/game/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
            {modal?.boolean && modal.number === 500 && (
                <Modal domain={domain} isOpen={true} onClose={() => setModal({ boolean: false, number: 500 })}>
                    <ModalError domain={domain} buttonText='Continuar' onClose={() => { setModal({ boolean: false, number: 500 }), navigate('/client/game/howToGet') }} title={dataModal?.title} subTitle={dataModal?.subTitle} />
                </Modal>
            )}
        </div>
    )
}
