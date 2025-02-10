import { useLocation } from "react-router-dom";
import { facebookPilar, facebookSalta, facebookZarate, googleMapsPilar, googleMapsSalta, googleMapsZarate, instagramPilar, instagramSalta, instagramZarate, urlWebPilar, urlWebSalta, urlWebZarate, whatsappPilar, whatsappSalta, whatsappZarate } from "../../content/dataDomain";

export function setFavicon(domain: string): void {
    //obtener el elemon <LINK> con id favicon q asi se seteo en el index.html 
    const favicon = document.getElementById('favicon') as HTMLLinkElement

    //cambiamos el atributo thres basado en el dominio
    favicon.href = `/images/${domain.toLowerCase()}/logo-index.png`
}

//funciton que me redirecciona a la web segun el dominio
export function openLinkWeb(domain: string): void {
    const url = domain === 'PILAR' ? urlWebPilar : domain === 'ZARATE' ? urlWebZarate : domain === 'SALTA' ? urlWebSalta : '#';//aca se puede definir otra direccion en caso de q no tenga domain que no deberia
    window.open(url, '_blank');
}
export function openMaps(domain: string): void {
    const url = domain === 'PILAR' ? googleMapsPilar : domain === 'ZARATE' ? googleMapsZarate : domain === 'SALTA' ? googleMapsSalta : '#';//aca se puede definir otra direccion en caso de q no tenga domain que no deberia
    window.open(url, '_blank');
}

export function openIconByDomain(icon: string, domain: string): void {
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

//funcino que me trae el valor segun el param q le paso si es q esa url justo obtiene un valor 
export function getQueryParam(paramName: string): string | null {
    const location = useLocation();//obtenemos la ubicacion actual de la url
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(paramName)
}

//funcion para cambiar el color del borde segun el domain
export function updateBorderColor(color: string): void {
    //cambiarmos el color segun el valor de la variable a nivel global
    document.documentElement.style.setProperty('--border-color', color);
}

//function que me retorna el nombre para el header del juego
export function getTextHeader(domain: string): string {
    switch (domain) {
        case 'PILAR':
            return 'BINGO OASIS PILAR'; // Gradiente rojo
        case 'ZARATE':
            return 'BINGO OASIS ZARATE'; // Gradiente naranja
        case 'SALTA':
            return 'NUEVO CASINO ALBERDI'; // Gradiente violeta
        default:
            return 'No hay dominio asociado'; // Gradiente por defecto
    }
}

//functino que me trae el texto para howToGet segun el dominio
export function getTextHeaderHowToGet(domain: string): string {
    switch (domain) {
        case 'PILAR':
            return 'NUESTRO STAND DE ATENCIÓN AL CLIENTE ';
        case 'ZARATE':
            return 'NUESTRO STAND DE ATENCIÓN AL CLIENTE';
        case 'SALTA':
            return 'NUEVO CASINO ALBERDI';
        default:
            return 'No hay dominio asociado';
    }
}

//texto para el modulo de alreadyPlayed
export function getTextButtonAlreadyPlayed(domain: string): string {
    switch (domain) {
        case 'PILAR':
            return 'entrar a bingo oasis pilar ';
        case 'ZARATE':
            return 'entrar a bingo oasis zarate';
        case 'SALTA':
            return 'entrar a nuevo casino alberdi';
        default:
            return 'No hay dominio asociado';
    }
}

export function getDomainInfo(): { domainName: string, domain: string } {
    /* 
    afiliate.bingopilar.com.ar 
afiliate.oasiszarate.com.ar
afiliate.nuevocasinoalberdi.com.ar 
    */
    /* const hostnamePROD = window.location.hostname; *///obtenemos el hostname 

    const hostname = 'afiliate.nuevocasinoalberdi.com.ar ';//obtenemos el hostname 

    //extraemos el nombre del dominio principal 
    const matches = hostname.match(/afiliate\.(\w+)\.(com\.ar)/);
    if (!matches) {
        throw new Error("El formato del dominio no es válido.");
    }
    const domainName = matches[1]; // Extrae "bingopilar", "oasiszarate", etc.
    // Define el mapeo de nombres de dominio a regiones
    const domainMap: { [key: string]: string } = {
        bingopilar: "PILAR",
        oasiszarate: "ZARATE",
        nuevocasinoalberdi: "SALTA",
    };

    const domain = domainMap[domainName] || "DESCONOCIDO"; // Devuelve el valor correspondiente o "DESCONOCIDO"

    return { domainName, domain };

}






