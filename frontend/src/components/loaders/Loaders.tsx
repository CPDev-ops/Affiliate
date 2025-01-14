import { BiLoaderAlt } from "react-icons/bi";
export function LoaderHover() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <BiLoaderAlt size={80} className="animate-spin text-blue-500" />
        </div>
    )
}