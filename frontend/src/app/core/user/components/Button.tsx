


interface ButtonProps {
    click?: () => void
    className?: string
    text: string
    icon?: React.ReactNode; // Prop para aceptar un icono
}
export function ButtonComponent({ click, className, text, icon }: ButtonProps) {
    return (
        <button
            onClick={click}
            className={`${styleButton} ${className}`}
        >
            {icon && <span className="text-lg">{icon}</span>} {/* Renderiza el icono si existe */}
            {text}
        </button>
    )
}

//estilo para el button
export const styleButton = `w-full flex  items-center justify-center gap-2 text-xs  border-2  text-white py-2 rounded-md `



import { gradientForButtonGeneral } from "../../client/game/utils/utils";

interface ButtonPropsGeneral {
    click: () => void
    domain: string
    text: string | undefined
    ref?: React.Ref<HTMLButtonElement>
    className?: string
}
export function ButtonGeneral({ click, domain, text, ref, className }: ButtonPropsGeneral) {
    return (
        <button type="button" {...(ref && { ref })} style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} onClick={click} className={`text-white shadow-lg uppercase border-0 py-2 ${gradientForButtonGeneral(domain.toUpperCase())} mx-[4rem]  rounded-3xl items-center  px-8 sm:px-12 my-4  bebasNeueRegular  text-2xl sm:text-3xl shadow-lg tracking-widest  shadow-black/40 ${className}`}>
            <span className="texto-inclinado">{text}</span>
        </button>
    )
}