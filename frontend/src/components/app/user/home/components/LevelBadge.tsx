// Componente MiNivel
import { useNavigate } from 'react-router-dom';
import './css/LevelBadge.css'; // Importa el archivo de estilo
import { HiMiniUserCircle } from 'react-icons/hi2';
interface LevelBadgeProp {
    level: number
    imageSrc?: string
}
export function LevelBadge({ level }: LevelBadgeProp) {
    return (
        <div className={`mi-nivel ml-4  ${level !== 0 ? '' : 'bg-[#3E3838] border-2 border-[#FFED00]'}`}>
            {/* Estrella para el nivel */}
            <div className="absolute  object-center">
                {/* <svg
                    className="w-10 h-10 z-10 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg> */}
                <HiMiniUserCircle size={50} color='black' className='' />
            </div>
            {/* Número dentro del círculo */}
            {/*   <span className="text-black text-base z-20">{level}</span> */}
        </div>
    );
};

export function LevelBadgeImage({ level }: LevelBadgeProp) {
    const navigate = useNavigate()
    return (
        <div className="mi-nivel">
            {/* Imagen personalizada con diseño circular */}
            <div className="absolute object-center cursor-pointer">
                <img onClick={() => navigate('/user/goals')}
                    src={`/images/goals/level${level}.png`}
                    alt={`Nivel ${level}`}
                    className="w-11 h-11 z-10 rounded-full "
                />
            </div>
        </div>
    )
}


