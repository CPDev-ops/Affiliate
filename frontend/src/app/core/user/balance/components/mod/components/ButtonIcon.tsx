import { IconType } from "react-icons";

interface ButtonIconProps {
    click: () => void
    text: string;
    icon: IconType
    color: string
}
export const ButtonIcon = ({ click, text, icon: Icon, color }: ButtonIconProps) => {
    return (
        <div className="flex items-center justify-start">
            <button
                type="button"
                onClick={click}
                className={`flex items-center border-4 justify-center w-10 h-10 ${color} transition-all duration-100 text-white rounded-full shadow-lg`}
            >
                <Icon size={24} />
            </button>
            <h1 className="text-[#6C6C6C] text-sm transform skew-x-[-10deg]">
                {text}
            </h1>
        </div>
    )
}