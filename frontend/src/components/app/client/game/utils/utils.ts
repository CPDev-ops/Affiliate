//funcion que me retorna el texto para el scratch segun el dominio
export function getTextScratch(domain: string) {
    if (domain === 'PILAR') {
        return '¡Tenés un premio de Bingo Oasis Pilar!';
    }
    if (domain === 'ZARATE') {
        return '¡Tenés un premio de Bingo Oasis Zarate!'
    }
    if (domain === 'SALTA') {
        return '¡Tenés un premio de Nuevo Casino Alberdi!'
    }
    else {
        return ''
    }
}

export function getBackgroundImage({ isDesktop, isTablet }: { isDesktop: boolean, isTablet: boolean }): string {
    const backgroundImage = isDesktop
        ? '/images/client/game/backDesktop.png'
        : isTablet
            ? '/images/client/game/backTablet.png'
            : '/images/client/game/backMobile.png';
    return backgroundImage
}

//funciton q me da el bacgrkound para el loading
export function backgroundLoader(domain: string): string {
    switch (domain) {
        case 'PILAR':
            return 'bg-rose-800';
        case 'ZARATE':
            return 'bg-red-800';
        case 'SALTA':
            return 'bg-violet-800';
        default:
            return 'bg-black'; // Gradiente por defecto
    }
}

//funcion para cambiar el color del borde segun el domain
export function updateBorderColor(color: string): void {
    //cambiarmos el color segun el valor de la variable a nivel global
    document.documentElement.style.setProperty('--border-color', color);
}

//function q retorna el color para el border de la card
export function getColorBorder(domain: string): string {
    switch (domain) {
        case 'PILAR':
            return '#FFFF5A';
        case 'ZARATE':
            return '#FFFF5A';
        case 'SALTA':
            return '#FF00FF';
        default:
            return '#000000'; // color por defecto
    }
}

//gradiente para los buttons q necesitan gradiente y sean diferentes en distintas sedes
export function gradientForButtonGeneral(domain: string): string {
    switch (domain) {
        case 'PILAR':
            return 'bg-gradient-to-t from-[#FF0001] to-[#FC5B02] hover:bg-gradient-to-t hover:from-[#CB1818] hover:to-[#D75108]';
        case 'ZARATE':
            return 'bg-gradient-to-t from-[#FF0001] to-[#FC5B02] hover:bg-gradient-to-t hover:from-[#CB1818] hover:to-[#D75108] ';
        case 'SALTA':
            return 'bg-gradient-to-t from-[#FF0001] to-[#FF00FF] hover:bg-gradient-to-t hover:from-[#CB1818] hover:to-[#C619C6]';
        default:
            return 'bg-gradient-to-t from-black to-zinc-100'; // Gradiente por defecto
    }

}

//function que retrna el gradiente para el modal de mails
export function gradientForModal(domain: string): string {
    switch (domain) {
        case 'PILAR':
            return 'bg-gradient-to-b from-[#FB0250] to-[#95012F]';
        case 'ZARATE':
            return 'bg-gradient-to-b from-[#FB0250] to-[#95012F]';
        case 'SALTA':
            return 'bg-gradient-to-b from-[#6B0EAB] to-[#570340]';
        default:
            return 'bg-gradient-to-b from-black to-zinc-100'; // Gradiente por defecto
    }
}

//funcion que me da el bg opaco y el color para cada dominio
export function getBackgroundClass(domain: string): string {
    return domain.toUpperCase() === 'SALTA' ? 'bg-white bg-opacity-30' : 'bg-black bg-opacity-30'
}