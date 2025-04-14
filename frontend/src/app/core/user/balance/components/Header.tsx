import { HeaderProps } from "../../../../../types/TypePropsComponents";
import { colorTextHome } from "../../../../utils/colors";
import { getTextByLevel } from "../../../../utils/transformData";
import { CardLoader, LevelBadgeLoader } from "./CardLoader";
import { LevelBadge, LevelBadgeImage } from "./LevelBadge";

export function Header({ userName, level, periodoDesde, periodoHasta }: HeaderProps) {
    const color = getTextByLevel(level)
    console.log(color)

    return (
        <div className="flex-col items-center justify-center">
            <div className="flex items-center tracking-wider justify-between  ">
                <div>
                    <h1 className={`text-lg font-bold uppercase  tracking-widest ${color}`}>mi balance</h1 >
                    {!userName ? (
                        <CardLoader width="w-full" />
                    ) : (
                        <p className={`text-[#3E3838]/90 text-lg font-thin  tracking-wider  `}>Hola, {userName}!</p>
                    )}
                </div>
                <div>

                </div>
                <div className="flex-col justify-center items-center">
                    {!level ? (
                        <LevelBadgeLoader />
                    ) : (
                        <>
                            {level === 0 ? (
                                <LevelBadge level={level} />
                            ) : (
                                <LevelBadgeImage level={level} />
                            )}
                            <h1 className={`mx-auto text-xs font-sans text-center text-[#3E3838]`}>
                                Nivel {level !== 0 ? level : 'Inicial'}
                            </h1>
                        </>
                    )}
                </div>
            </div>
            {!periodoDesde || !periodoHasta ? (
                <div>
                    <p className={`${colorTextHome} text-sm font-thin  tracking-wider mb-2`}>Periodo <CardLoader width="w-1/2" /></p>
                </div>
            ) : (
                <p className={`${colorTextHome} text-sm font-thin  tracking-wider mb-2`}>Periodo {periodoDesde} - {periodoHasta}!</p>
            )
            }
        </div >
    );
}

