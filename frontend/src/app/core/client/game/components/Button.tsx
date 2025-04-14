import { gradientForButtonGeneral } from "../utils/utils"

interface ButtonProps {
    click: () => void
    domain: string
    text: string | undefined
    ref?: React.Ref<HTMLButtonElement>
    className?: string
}
export function Button({ click, domain, text, ref, className }: ButtonProps) {
    return (
        <button type="button" {...(ref && { ref })} style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} onClick={click} className={`text-white shadow-lg uppercase border-0 py-2 ${gradientForButtonGeneral(domain.toUpperCase())} mx-[4rem]  rounded-3xl items-center  px-8 sm:px-12 my-4  bebasNeueRegular  text-2xl sm:text-3xl shadow-lg tracking-widest  shadow-black/40 ${className}`}>
            <span className="texto-inclinado">{text}</span>
        </button>
    )
}