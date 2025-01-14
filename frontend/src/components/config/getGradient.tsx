// Función que devuelve el color del gradiente según el nivel
export function getGradient(level: number): string {
    switch (level) {
        case 0:
            return 'from-white to-white border  border-[#FF0000]';
        case 1:
            return 'from-gradientYellow to-gradientYellowDark';
        case 2:
            return 'from-gradientOrange to-gradientRose';
        case 3:
            return 'from-gradientGreen to-gradientGreenDark';
        case 4:
            return 'from-gradientBlueLight to-gradientBlue';
        case 5:
            return 'from-gradientPurple to-gradientPurpleDark';
        default:
            return 'from-defaultGradient to-defaultGradient';
    }
}

export function getColorNav(level: number): string {
    switch (level) {
        case 0:
            return 'bg-[#F6EDED]';
        case 1:
            return 'bg-[#661303]';
        case 2:
            return 'bg-[#7A032E]';
        case 3:
            return 'bg-[#045D4C]';
        case 4:
            return 'bg-[#061E6E]';
        case 5:
            return 'bg-[#2F0585]';
        default:
            return 'bg-[#000000]';
    }
}