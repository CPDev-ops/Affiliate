import { domain, facebookPilar, facebookSalta, facebookZarate, instagramPilar, instagramSalta, instagramZarate, whatsappPilar, whatsappSalta, whatsappZarate } from "../../content/dataDomain";

export function setFavicon(domain: string): void {
    //obtener el elemon <LINK> con id favicon q asi se seteo en el index.html 
    const favicon = document.getElementById('favicon') as HTMLLinkElement

    //cambiamos el atributo thres basado en el dominio
    favicon.href = `/images/${domain.toLowerCase()}/logo-index.png`
    /*     switch (domain) {
            case 'PILAR':
                favicon.href = '/images/pilar/logo-index.png';
                break;
            case 'ZARATE':
                favicon.href = '/images/zarate/logo-index.png';
                break;
            case 'SALTA':
                favicon.href = '/images/salta/logo-index.png';
                break;
            default:
                favicon.href = '/images/default-logo.png';  // Logo por defecto
                break;
        } */
}


export function openIconByDomain(icon: string): void {
    if (icon === 'WHATSAPP') {
        const url = domain === 'PILAR'
            ? whatsappPilar
            : domain === 'ZARATE'
                ? whatsappZarate
                : domain === 'SALTA'
                    ? whatsappSalta
                    : '#'; // Puedes definir un valor por defecto o un manejo de error aquí
        window.open(url, '_blank'); // Abrir en una nueva pestaña
        return
    }
    else if (icon === "FACEBOOK") {
        const url = domain === 'PILAR'
            ? facebookPilar
            : domain === 'ZARATE'
                ? facebookZarate
                : domain === 'SALTA'
                    ? facebookSalta
                    : '#'; // Puedes definir un valor por defecto o un manejo de error aquí
        window.open(url, '_blank'); // Abrir en una nueva pestaña
        return
    }
    else if (icon === "INSTAGRAM") {
        const url = domain === 'PILAR'
            ? instagramPilar
            : domain === 'ZARATE'
                ? instagramZarate
                : domain === 'SALTA'
                    ? instagramSalta
                    : '#'; // Puedes definir un valor por defecto o un manejo de error aquí
        window.open(url, '_blank'); // Abrir en una nueva pestaña
        return
    }
}

//variable vacia q cambia los valores

//funcion para cambiar el color del borde segun el domain
export function updateBorderColor(color: string): void {
    //cambiarmos el color segun el valor de la variable a nivel global
    document.documentElement.style.setProperty('--border-color', color);
}







