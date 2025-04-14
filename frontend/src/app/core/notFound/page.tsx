import { FaHome, FaSearch } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center px-4 text-white">
            <div className="text-center max-w-md mx-auto">
                {/* Icono de error */}
                <div className="mb-6 flex justify-center">
                    <div className="relative">
                        <MdErrorOutline className="text-red-500 text-9xl animate-pulse" />
                    </div>
                </div>
                {/* Texto de error */}
                <h1 className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    404
                </h1>
                <h2 className="text-2xl font-bold mb-4">Página no encontrada</h2>
                <p className="text-slate-300 mb-8">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
                </p>
                {/* Ilustración */}
                <div className="mb-8 relative">
                    <div className="w-24 h-24 mx-auto bg-slate-700 rounded-full flex items-center justify-center">
                        <FaSearch className="text-slate-400 text-3xl animate-bounce" />
                    </div>
                    <div className="absolute w-full h-4 bg-slate-700/50 bottom-0 left-0 rounded-full blur-md"></div>
                </div>
                {/* Botón para volver a la página principal */}
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-medium text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center mx-auto group"
                >
                    <FaHome className="mr-2 group-hover:animate-pulse" />
                    Volver al inicio
                </button>
            </div>
            {/* Elementos decorativos */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white/5 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 6 + 1}px`,
                            height: `${Math.random() * 6 + 1}px`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 10 + 10}s`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}