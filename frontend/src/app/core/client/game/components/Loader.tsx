import { backgroundLoader } from "../utils/utils";

export function LoaderFetch({ domain }: { domain: string }) {
    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 opacity-75 flex justify-center items-center ">
            <div className="flex justify-center items-center h-screen">
                <div className={`rounded-full h-20 w-20 ${backgroundLoader(domain.toUpperCase())}  animate-ping`}></div>
            </div>
        </div>
    )
}