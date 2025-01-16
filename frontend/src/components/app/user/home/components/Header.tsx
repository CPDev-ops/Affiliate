import { HeaderProps } from "../../../../../types/TypePropsComponents";
import { LevelBadge, LevelBadgeImage } from "./LevelBadge";

export function Header({ userName, level }: HeaderProps) {
    return (
        <div className="flex items-center tracking-wider justify-between px-2 mb-6">
            <div>
                <h1 className={`text-lg font-bold uppercase  tracking-widest ${level !== 0 ? 'text-white' : 'text-[#CD0101]'}  `}>AFILIATE BINGO OASIS</h1 >
                <p className={`${level !== 0 ? 'text-gray-200' : 'text-gray-700'} text-base font-thin  tracking-wider  `}>Hola, {userName}!</p>
            </div>
            <div className="flex-col justify-center items-center ">
                {level === 0 ? (
                    <LevelBadge level={level} />
                ) : (
                    <LevelBadgeImage level={level} />
                )}
                <h1 className={`mx-auto text-xs font-sans text-center ${level !== 0 ? 'text-white' : 'text-gray-700'}`}>Nivel {level !== 0 ? level : 'Inicial'}</h1>
            </div>
        </div>
    );
}

