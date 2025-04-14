// src/components/GetIcon.tsx
import React, { useEffect } from 'react';
// Función para mapear dominios a íconos
/* const getIconForDomain = (domain: string): string => {
    switch (domain) {
        case 'PILAR':
            return '/images/icons/pilar.png';
        case 'SALTA':
            return '/images/icons/salta.png';
        case 'ZARATE':
            return '/images/icons/zarate.png';
        default:
            return '/images/icons/default.png';
    }
};
// Función para actualizar el favicon
const updateFavicon = (iconPath: string) => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
        favicon.setAttribute('href', iconPath);
    }
}; */
function getIconForDomain(domain: string): string {
    const iconMap: { [key: string]: string } = {
        PILAR: `/images/client/game/${domain.toLowerCase()}/logo-index.png`,
        ZARATE: `/images/client/game/${domain.toLowerCase()}/logo-index.png`,
        SALTA: `/images/client/game/${domain.toLowerCase()}/logo-index.png`,
        DEFAULT: '/icons/default-icon.png',
    };
    return iconMap[domain] || iconMap.DEFAULT; // Devuelve la ruta del icono o un valor predeterminado
}

function updateFavicon(iconPath: string): void {
    const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (link) {
        link.href = iconPath;
    } else {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        newLink.href = iconPath;
        document.head.appendChild(newLink);
    }
}

interface GetIconProps {
    domain: string; // El dominio que llega por props
}
export const GetIcon: React.FC<GetIconProps> = ({ domain }) => {
    useEffect(() => {
        const iconPath = getIconForDomain(domain.toUpperCase()); // Obtén la ruta del icono según el dominio
        updateFavicon(iconPath); // Actualiza el favicon
    }, [domain]); // Reacciona a cambios en el dominio

    return null; // No renderiza nada
};

