interface ProgressStepProps {
    currentStep: number
}
export function ProgressIndicator({ currentStep }: ProgressStepProps) {
    return (
        <div className="bg-redCard py-4 px-3 shadow-xl h-32 rounded-xl w-full max-w-md sm:max-w-full">
            <div className="text-white mb-4 font-medium">Mi progreso</div>
            <div className="relative flex bg-gradient-to-t shadow-lg  rounded-md from-black to-redCard min-h-12   items-center justify-between">
                {/* Progress line background */}
                <div className="absolute h-1 w-full bg-pink-200"></div>
                {/* Active progress line */}
                <div
                    className="absolute h-1 bg-gradient-to-r from-green-500 to-green-400"
                    style={{ width: `${(currentStep - 1) * 25}%` }}
                ></div>
                {/* Steps */}
                {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="relative flex flex-col items-center">
                        {/* Star for step 3 */}
                        {step === currentStep && (
                            <div className="absolute -top-6">
                                <svg
                                    className="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        )}
                        {/* Circle */}
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
        ${step === currentStep
                                    ? 'bg-red-500 border-2 border-green-400 text-white' // Cambiar color si el step es igual a currentStep
                                    : step < currentStep
                                        ? 'bg-[#FF00FF] border-2 border-yellow-400 text-white' // Color para pasos anteriores
                                        : 'bg-gray-700 text-gray-400 border-2 border-pink-200' // Color para pasos futuros
                                }`}
                        >
                            <h1 className="text-xs">{step}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}