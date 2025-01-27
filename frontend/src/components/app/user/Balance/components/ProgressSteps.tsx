import { useLevel } from "../../../../../context/LevelContext";
import { getGradient } from "../../../client/game/utils/utils";

interface ProgressStepsProps {
    currentStep: number;
    totalSteps?: number;
    level: number
}


export function ProgressSteps({ currentStep = 4, totalSteps = 5, level }: ProgressStepsProps) {
    const { setLevel } = useLevel()
    return (
        <div>
            <h2 className={`text-black text-base lg:text-lg `}>Mi progreso</h2>
            <div className={`bg-gradient-to-b ${getGradient(level)} py-2 sm:py-4 lg:pt-12 px-3 mb-4 shadow-2xl sm:h-32 rounded-xl w-full max-w-md sm:max-w-full`}>
                <div className="min-h-14 flex flex-col  ">
                    <div className="relative mt-auto ">
                        {/* Línea de fondo */}
                        <div className="absolute h-2 w-full bg-[#D9D9D9] top-1/2 -translate-y-1/2" />
                        {/* Línea de progreso */}
                        <div
                            className="absolute h-2 bg-[#06DE0E] top-1/2 -translate-y-1/2 transition-all duration-500"
                            style={{
                                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`
                            }}
                        />
                        {/* Puntos y números */}
                        <div className="relative flex justify-between">
                            {[...Array(totalSteps)].map((_, index) => {
                                const stepNumber = index + 1
                                const isCompleted = stepNumber <= currentStep
                                const isCurrent = stepNumber === currentStep
                                return (
                                    <div key={stepNumber} className="flex flex-col items-center">
                                        <div className="relative">
                                            {/* Estrella para el paso actual */}
                                            {isCurrent && (
                                                <div className="absolute -top-6 lg:-top-12 left-1/2 -translate-x-1/2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 lg:w-10 lg:h-10 text-yellow-400"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                            {/* Punto */}
                                            <div onClick={() => setLevel(stepNumber)}
                                                className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center z-10 
                      ${isCurrent
                                                        ? 'bg-[#FF0000] border-2 border-[#FBC609] text-white'
                                                        : isCompleted
                                                            ? 'bg-[#FF00FF] border-2 border-[#FFFF00] text-white'
                                                            : 'bg-[#000000] text-gray-400 border-2 border-[#D9D9D9]'
                                                    }`}
                                            >
                                                <span className="text-sm lg:text-2xl font-bold">
                                                    {stepNumber}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}