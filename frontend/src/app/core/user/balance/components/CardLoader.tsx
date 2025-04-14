import { FaSpinner } from "react-icons/fa"

interface CardLoaderProps {
    width?: string;
}
export const CardLoader = ({ width = 'w-32' }: CardLoaderProps) => {
    return (
        <div className={`relative h-10 ${width} bg-gray-300/50 rounded-md animate-pulse flex items-center justify-center`}>
            <FaSpinner className="absolute text-gray-500 animate-spin text-xl" />
        </div>
    )
}


export const LevelBadgeLoader = () => {
    return (
        <div className="mi-nivel">
            <div className="absolute object-center cursor-pointer">
                <div className="w-11 h-11 z-10 rounded-full bg-gray-300/50 animate-pulse flex justify-center items-center">
                    <FaSpinner className="  text-gray-500 animate-spin text-xl" />
                </div>
            </div>
        </div>
    )
}