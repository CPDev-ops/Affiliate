interface Level {
    level: number;
    bgColor: string;
    range: string;
    credits: string;
    colorBorder: string
    img: string
    colorText: string
    userLevel: number
}

export function CardListV3({ img, level, bgColor, range, credits, colorBorder, colorText, userLevel }: Level) {
    //utilizamos la funcion INTl.NumberFormat
    function formatNumber(value: number) {
        return new Intl.NumberFormat('es-ES').format(value);
    }
    const creditsConvert = formatNumber(parseInt(credits))

    return (
        <div className="relative w-full">
            <h1 className={`uppercase ${userLevel !== 0 ? 'text-white' : 'text-stone-700'} font-bold `}>NIVEL {level}</h1>
            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b ${bgColor} shadow-2xl transition-all duration-300 hover:scale-[1.02] group`}>
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center p-4 gap-4">
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
                        <span className="text-2xl  text-white">
                            ${creditsConvert}
                        </span>
                        <span className={`text-xs ${colorText}`}>
                            Por cliente
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-between lg:ml-auto">
                        <span style={{ textShadow: '4px 6px 6px rgba(0, 0, 0, 0.5)' }} className={`text-xs   ${colorText}`}>
                            Objetivos de afiliación:
                        </span>
                        <span className="text-white text-xs ">
                            {range}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}