import { LevelDto } from "../../../../../types/user";
import { getGradient } from "../../../client/game/utils/utils";

interface Level {
    level: LevelDto;
    bgColor: string;
    range: string;
    credits: string;
    colorBorder: string
    img: string
    colorText: string
    userLevel: LevelDto
    index: number;
}

export function Card({ img, level, bgColor, range, credits, colorBorder, colorText, userLevel, index }: Level) {
    console.log(bgColor, userLevel)
    //utilizamos la funcion INTl.NumberFormat
    function formatNumber(value: number) {
        return new Intl.NumberFormat('es-ES').format(value);
    }
    const creditsConvert = formatNumber(parseInt(credits))

    return (
        <div className="relative w-full">
            <div className={`relative overflow-hidden rounded-xl shadow-md  bg-gradient-to-br ${getGradient(index)}  transition-all duration-300 hover:scale-[0.99] group`}>
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center text-white p-4 gap-4">
                    {/* Contenedor del icono con glow */}
                    <div className="relative shrink-0">
                        <div className={`absolute inset-0 /30 blur-xl`} />
                        <div className={`relative flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border-2 ${colorBorder} overflow-hidden`}>
                            <img
                                src={img}
                                alt={`Level ${level}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    {/* Contenido */}
                    <div className="flex flex-col items-center justify-between">
                        <h1 className="text-base text-start mr-auto ">
                            NIVEL {index}
                        </h1>
                        <span className={`text-xs mr-auto ${colorText}`}>
                            ${creditsConvert} Por cliente
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-between ml-auto">
                        <span className={`text-xs   ${colorText}`}>
                            Objetivos de afiliación:
                        </span>
                        <span className=" text-xs ">
                            {range}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

