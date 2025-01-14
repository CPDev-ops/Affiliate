// src/components/GetIcon.tsx
import React, { useEffect } from 'react';
// Función para mapear dominios a íconos
const getIconForDomain = (domain: string): string => {
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
};
export const GetIcon: React.FC = () => {
    useEffect(() => {
        const fetchUserDomain = async () => {
            try {
                /*      const response = await fetch('/api/user'); // Cambia esta URL según tu backend */
                // Simula el response del backend
                const response = {
                    json: async () => ({
                        domain: "PILAR", // Cambia esto a "SALTA" o "ZARATE" para probar
                    }),
                };
                const data = await response.json();
                const domain = data.domain || 'DEFAULT'; // Valor por defecto si no hay dominio
                const iconPath = getIconForDomain(domain);
                updateFavicon(iconPath);
            } catch (error) {
                console.error('Error fetching user domain:', error);
                const defaultIconPath = getIconForDomain('DEFAULT');
                updateFavicon(defaultIconPath);
            }
        };
        fetchUserDomain();
    }, []);
    return null; // No retorna nada
};


//
