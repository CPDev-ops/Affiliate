

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