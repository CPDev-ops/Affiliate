import { useLevel } from "../../../../../context/LevelContext";
import { getGradient } from "../../../../config/getGradient";

interface ProgressStepsProps {
    currentStep: number;
    totalSteps?: number;
    level: number
}


export function ProgressSteps({ currentStep = 4, totalSteps = 5, level }: ProgressStepsProps) {
    const { setLevel } = useLevel()
    return (
        <div className={`bg-gradient-to-b ${getGradient(level)} py-2 sm:py-4 px-3 shadow-2xl sm:h-32 rounded-xl w-full max-w-md sm:max-w-full`}>
            <h2  className={`${level !== 0 ? 'text-white' : 'text-stone-900'} text-base  mb-4`}>Mi progreso</h2>
            <div className="min-h-12 flex flex-col rounded-b-md  ">
                <div className="relative mt-auto mb-2">
                    {/* Línea de fondo */}
                    <div className="absolute h-1 w-full bg-[#F3CDF3] top-1/2 -translate-y-1/2" />
                    {/* Línea de progreso */}
                    <div
                        className="absolute h-1 bg-green-500 top-1/2 -translate-y-1/2 transition-all duration-500"
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
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-yellow-400"
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
                                            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                      ${isCurrent
                                                    ? 'bg-red-500 border-2 border-green-400 text-white'
                                                    : isCompleted
                                                        ? 'bg-gradient-to-r from-pink-500 to-pink-400 border-2 border-yellow-400 text-white'
                                                        : 'bg-gray-700 text-gray-400 border-2 border-pink-200'
                                                }`}
                                        >
                                            <span className="text-sm font-bold">
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
    )
}