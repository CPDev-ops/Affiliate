
import { useState, useEffect } from 'react';

export default function LoadingBalance() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Simulación de fetch
        setTimeout(() => {
            setData({
                name: "Sofitel Cardales",
                credit: "350.205",
                persons: 5,
                level: 1
            });
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="w-12 h-12 relative">
                    {isLoading ? (
                        <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-800 animate-spin" />
                    ) : (
                        <img src="/casino-logo.png" alt="Casino Logo" className="w-full h-full object-contain" />
                    )}
                </div>
                <button className="text-2xl">☰</button>
            </div>

            {/* Balance Section */}
            <div className="mb-8">
                <h1 className="text-purple-900 text-2xl font-bold mb-1">MI BALANCE</h1>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600">
                        {isLoading ? (
                            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                        ) : (
                            `Hola, ${data?.name}!`
                        )}
                    </span>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs">N1</span>
                    </div>
                </div>
                <div className="text-sm text-gray-500 mb-4">Periodo 01/03/2025 - 31/03/2025</div>

                {/* Credit Card */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                    <h2 className="text-gray-600 mb-2">CRÉDITO GANADO</h2>
                    {isLoading ? (
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full border-4 border-purple-200 border-t-purple-800 animate-spin" />
                            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                        </div>
                    ) : (
                        <div className="text-4xl font-bold text-purple-900">
                            ${data?.credit}
                        </div>
                    )}
                    <div className="mt-4 border-t pt-4">
                        <div className="text-gray-600">INGRESOS TOTALES</div>
                        <div className="text-gray-600">Personas:</div>
                        {isLoading ? (
                            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-1" />
                        ) : (
                            <div className="text-4xl font-bold text-purple-900">{data?.persons}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Levels */}
            <div className="mb-8">
                <h2 className="text-gray-600 mb-4">Mis Niveles</h2>
                <div className="flex justify-between items-center">
                    {[1, 2, 3, 4, 5].map((level) => (
                        <div
                            key={level}
                            className={`w-10 h-10 rounded-full flex items-center justify-center
                                ${isLoading 
                                    ? 'bg-gray-200 animate-pulse' 
                                    : level <= (data?.level || 0) 
                                        ? 'bg-purple-900 text-white' 
                                        : 'bg-gray-200'
                                }`}
                        >
                            {!isLoading && level}
                        </div>
                    ))}
                    <div className="absolute w-3/4 h-0.5 bg-gray-200 -z-10" />
                </div>
            </div>

            {/* Invite Section */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-purple-900 font-bold">INVITAR CLIENTES</h2>
                    <span className="text-yellow-400 text-2xl">🏆</span>
                </div>
                {['Cargar por formulario', 'Compartir link', 'Mostrar Qr'].map((action, index) => (
                    <button
                        key={index}
                        className={`w-full mb-3 p-4 rounded-lg border-2 border-purple-900 text-purple-900 flex items-center justify-between
                            ${isLoading ? 'opacity-50 cursor-not-allowed animate-pulse' : 'hover:bg-purple-50'}`}
                        disabled={isLoading}
                    >
                        <span>{action}</span>
                        {isLoading ? (
                            <div className="w-6 h-6 rounded-full border-2 border-purple-200 border-t-purple-800 animate-spin" />
                        ) : (
                            <span className="text-xl">→</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
