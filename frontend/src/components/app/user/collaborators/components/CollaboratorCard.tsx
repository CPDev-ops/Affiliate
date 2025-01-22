import { useState } from "react"
import { getGradient } from "../../../../config/getGradient"
import { RiCloseLargeFill } from "react-icons/ri"
import { getBackgroundButtonModal } from "../../../../utils/transformData"

interface CollaboratorCardProps {
    name: string
    imageUrl: string
    isVisible?: boolean
    level: number
}

export function CollaboratorCard({ name, imageUrl, level }: CollaboratorCardProps) {
    const [modal, setModal] = useState<boolean>(false)
    return (
        <div className="max-w-md w-full">
            <div className={`bg-gradient-to-b ${getGradient(level)} backdrop-blur-sm rounded-xl p-3 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-600/50">
                        {/* Image container with fallback */}
                        {imageUrl ? (
                            <img
                                src={imageUrl || "/placeholder.svg"}
                                alt={`${name}'s avatar`}
                                className="w-full h-full border-2 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-emerald-600/50" />
                        )}
                    </div>
                    <span className="text-white font-medium">{name}</span>
                </div>
                <svg onClick={() => setModal(true)} className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
            </div>
            {modal && (
                <Modal close={() => setModal(false)} />
            )}
        </div>
    )
}

interface ModalProps {
    close: () => void
}

function Modal({ close }: ModalProps) {
    // Sample data
    const sampleUserData = {
        name: "Juan Salazar",
        imageUrl: "/images/user/collaborators/avatar-1.png",
        date: "10/10/2001",
        dni: "37.000.321",
        email: "juansalazar@gmail.com",
        phone: "1137841186",
    }

    return (
        <div className="fixed z-10 inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className={`bg-gradient-to-b ${getGradient(4)} w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden`}>
                <RiCloseLargeFill onClick={close} size={20} className="ml-auto mt-4 text-white mr-4" />
                <div className="flex justify-center items-center gap-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-emerald-600/50">
                        {/* Image container with fallback */}
                        <img
                            src={sampleUserData.imageUrl}
                            alt={`${name}'s avatar`}
                            className="w-full h-full border-4 rounded-full object-cover"
                        />
                    </div>
                </div>
                <h1 className="text-white text-xl text-center my-4 font-medium">{sampleUserData.name}</h1>

                {/* INPUTS */}
                <TemplateInputs level={4} date={sampleUserData.date} dni={sampleUserData.dni} mail={sampleUserData.email} phone={sampleUserData.phone} />
            </div>
        </div>

    )
}

interface TemplateInputsProps {
    mail: string;
    phone: string;
    dni: string;
    level: number
    date: string
}
function TemplateInputs({ level, date, dni, mail, phone }: TemplateInputsProps) {
    return (
        <div className="grid grid-cols-2 text-white text-sm gap-4 mb-4 mx-[1rem]">
            <div>
                <h1 className="text-zinc-100">Fecha nacimiento</h1>
                <h1 className="p-2 border border-yellow-400 rounded-md ">{date}</h1>
            </div>
            <div>
                <h1 className="text-zinc-100">DNI</h1>
                <h1 className="p-2 border border-yellow-400 rounded-md ">{dni}</h1>
            </div>
            <div className="col-span-2">
                <h1 className="text-zinc-100">Mail</h1>
                <h1 className="p-2 border border-yellow-400 rounded-md ">{mail}</h1>
            </div>
            <div className="col-span-2">
                <h1 className="text-zinc-100">Teléfono</h1>
                <h1 className="p-2 border border-yellow-400 rounded-md ">{phone}</h1>
            </div>
            <div className="col-span-2">
                <button className={`text-black w-full ${getBackgroundButtonModal(level)} p-3 rounded-md shadow-lg tracking-widest`}>CERRAR</button>
            </div>
        </div>
    )
}
