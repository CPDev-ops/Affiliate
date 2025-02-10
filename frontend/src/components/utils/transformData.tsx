
// Función personalizada Si amount = 5000, se mostrará como 5.000
export const formatAmount = (amount: number): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
//fuicitno que me retorna el mes actual por mes
export function getCurrentMonth(): number {
    const date = new Date();
    return date.getMonth();

}
//function que puede devolver el mes como nombre (por ejemplo, "Enero" o "February"),
export function getCurrentMonthName(): string {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const date = new Date();
    return months[date.getMonth()]; // Devuelve el nombre del mes
}


//funciton que me retorna las semanas parciadas por mes
export const generateWeekLabels = (year: number, month: number): string[] => {
    const labels: string[] = [];
    const date = new Date(year, month - 1, 1); // Meses en JavaScript son base 0

    // Encuentra el primer lunes del mes
    while (date.getDay() !== 1) {
        date.setDate(date.getDate() + 1);
    }

    // Genera 4 etiquetas, avanzando 7 días por cada semana
    for (let i = 0; i < 4; i++) {
        labels.push(
            date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
            })
        );
        date.setDate(date.getDate() + 7);
    }
    return labels
}

export const getTextByLevel = (level: number): string => {
    switch (level) {
        case 0:
            return 'text-[#45087B]'
        case 1:
            return 'text-[#B02307]';
        case 2:
            return 'text-[#7A032E]';
        case 3:
            return 'text-[#02352B]';
        case 4:
            return 'text-[#031142]';
        case 5:
            return 'text-[#20045A]';
        default:
            return 'text-black'; // Color por defecto
    }
};

export const getTextModalFormByLevel = (level: number): string => {
    switch (level) {
        case 0:
            return 'text-[#540864]'
        case 1:
            return 'text-[#B02307]';
        case 2:
            return 'text-[#7A032E]';
        case 3:
            return 'text-[#02352B]';
        case 4:
            return 'text-[#031142]';
        case 5:
            return 'text-[#20045A]';
        default:
            return 'text-black'; // Color por defecto
    }
}

export const getBackgroundButtonModalForm = (level: number): string => {
    switch (level) {
        case 0:
            return 'bg-[#540864]'
        case 1:
            return 'bg-[#B02307]';
        case 2:
            return 'bg-[#7A032E]';
        case 3:
            return 'bg-[#02352B]';
        case 4:
            return 'bg-[#031142]';
        case 5:
            return 'bg-[#20045A]';
        default:
            return 'bg-black'; // Color por defecto
    }
}

export const getBorderByLevel = (level: number): string => {
    switch (level) {
        case 0:
            return 'border-[#45087B]'
        case 1:
            return 'border-[#B02307]';
        case 2:
            return 'border-[#7A032E]';
        case 3:
            return 'border-[#02352B]';
        case 4:
            return 'border-[#031142]';
        case 5:
            return 'border-[#20045A]';
        default:
            return 'border-black'; // Color por defecto
    }
}

//bacgrkound
export const getColorIcon = (level: number): string => {
    switch (level) {
        case 0:
            return 'text-[#06DE0E]'
        case 1:
            return 'text-[#B02307]';
        case 2:
            return 'text-[#7A032E]';
        case 3:
            return 'text-[#02352B]';
        case 4:
            return 'text-[#6BA9DF]';
        case 5:
            return 'text-[#D64EFA]';
        default:
            return 'text-black'; // Color por defecto
    }
}

export const getColorMoneyText = (level: number): string => {
    switch (level) {
        case 0:
            return 'text-[#3840F7]'
        case 1:
            return 'text-[#F5C74F]';
        case 2:
            return 'text-[#550623]';
        case 3:
            return 'text-[#217469]';
        case 4:
            return 'text-[#031142]';
        case 5:
            return 'text-[#20045A]';
        default:
            return 'text-black'; // Color por defecto
    }
}

//functino que trae el color para el modulo de summary
export const getTextSummaryLevel = (level: number): string => {
    switch (level) {
        case 0:
            return 'text-[#000000]'; // Rojo para nivel 0
        case 1:
            return 'text-[#FFFFFF]'; // Amarillo para nivel 1
        case 2:
            return 'text-[#FFFFFF]'; // Naranja para nivel 2
        case 3:
            return 'text-[#FFFFFF]'; // Verde para nivel 3
        case 4:
            return 'text-[#FFFFFF]'; // Azul para nivel 4
        case 5:
            return 'text-[#FFFFFF]'; // Morado para nivel 5
        default:
            return 'text-[#000000]'; // Color por defecto
    }
}

//function qu eme retorna el color para el el componente de ingresos diarios
export const getColorByChartText = (level: number): string => {
    switch (level) {
        case 0:
            return 'black';
        case 1:
            return 'white';
        case 2:
            return 'white';
        case 3:
            return 'white';
        case 4:
            return 'white';
        case 5:
            return 'white';
        default:
            return 'text-[#000000]';
    }
}

//function que me retorna el color de laas lineas de background del componente
export const getColorLinesChartBackground = (level: number): string => {
    switch (level) {
        case 0:
            return 'rgba(0, 0, 0, 0.6)'; // Negro con opacidad del 50%
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return 'rgba(255, 255, 255, 0.8)'; // Blanco con opacidad del 20%
        default:
            return 'rgba(0, 0, 0, 1)'; // Por defecto, negro sólido
    }
};

//funcion flecha que retorna el color de la linea MAIN
export const getColorLineMain = (level: number): string => {
    switch (level) {
        case 0:
            return 'rgba(255, 0, 0, 1)';
        case 1:
            return 'rgba(255, 0, 0, 1)';
        case 2:
            return 'rgba(255, 255, 0, 1)';
        case 3:
            return 'rgba(255, 255, 0, 1)';
        case 4:
            return 'rgba(255, 0, 255, 1)';
        case 5:
            return 'rgba(255, 0, 0, 1)';
        default:
            return 'rgba(0, 0, 0, 1)';
    }
}

//obtener gradiente de button segund el level
export const getBackgroundButton = (level: number): string => {
    switch (level) {
        case 0:
            return 'bg-[#540864] hover:bg-[#4A0758] ';
        case 1:
            return 'bg-[#B02307] hover:bg-[#A6240A] ';
        case 2:
            return 'bg-[#7A032E] hover:bg-[#6A0228] ';
        case 3:
            return 'bg-[#02352B] hover:bg-[#022F26] ';
        case 4:
            return 'bg-[#031142] hover:bg-[#030E34] ';
        case 5:
            return 'bg-[#20045A] hover:bg-[#1D0452] ';
        default:
            return 'bg-[#FB5F2F] hover:bg-[#C74922] ';
    }
}

export const getBackgroundButtonModal = (level: number): string => {
    switch (level) {
        case 0:
            return 'bg-[#540864] hover:bg-[#540864] ';
        case 1:
            return 'bg-[#B02307] hover:bg-[#7A032E] ';
        case 2:
            return 'bg-[#7A032E] hover:bg-[#70022A] ';
        case 3:
            return 'bg-[#02352B] hover:bg-[#022E25] ';
        case 4:
            return 'bg-[#031142] hover:bg-[#020F3D] ';
        case 5:
            return 'bg-[#20045A] hover:bg-[#1B034B] ';
        default:
            return 'bg-[#000000] hover:bg-[#000000]';
    }
}


export function borderByIndex(index: number): string {
    const colors = [
        "border-red-500",    // Rojo
        "border-blue-500",   // Azul
        "border-green-500",  // Verde
        "border-yellow-500", // Amarillo
        "border-purple-500", // Morado
        "border-pink-500",   // Rosa
        "border-orange-500", // Naranja
        "border-teal-500",   // Turquesa
        "border-gray-500",   // Gris
        "border-indigo-500", // Índigo
    ];

    // Usa el módulo para evitar que el índice supere la longitud del array
    return colors[index % colors.length];
}


export function backgroundByIndex(index: number): string {
    const colors = [
        "bg-red-500",    // Rojo
        "bg-blue-500",   // Azul
        "bg-green-500",  // Verde
        "bg-yellow-500", // Amarillo
        "bg-purple-500", // Morado
        "bg-pink-500",   // Rosa
        "bg-orange-500", // Naranja
        "bg-teal-500",   // Turquesa
        "bg-gray-500",   // Gris
        "bg-indigo-500", // Índigo
    ];

    // Usa el módulo para evitar que el índice supere la longitud del array
    return colors[index % colors.length];
}