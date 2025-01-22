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
            return 'text-[#CD0101]'; // Rojo para nivel 0
        case 1:
            return 'text-[#F2BF4C]'; // Amarillo para nivel 1
        case 2:
            return 'text-[#FC5D35]'; // Naranja para nivel 2
        case 3:
            return 'text-[#54CA87]'; // Verde para nivel 3
        case 4:
            return 'text-[#6DACE2]'; // Azul para nivel 4
        case 5:
            return 'text-[#CD4AF7]'; // Morado para nivel 5
        default:
            return 'text-[#000000]'; // Color por defecto
    }
};
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
            return 'bg-[#FB5F2F] hover:bg-[#C74922] border-[#FF3B88]';
        case 1:
            return 'bg-[#FB5F2F] hover:bg-[#C74922] border-[#FF3B88]';
        case 2:
            return 'bg-[#FB5F2F] hover:bg-[#C74922] border-[#FF3B88]';
        case 3:
            return 'bg-[#FF00FF] hover:bg-[#BD11BD] border-[#FF3B88]';
        case 4:
            return 'bg-[#FF00FF] hover:bg-[#BD11BD] border-[#FF3B88]';
        case 5:
            return 'bg-[#FF00FF] hover:bg-[#BD11BD] border-[#FF3B88]';
        default:
            return 'bg-[#FB5F2F] hover:bg-[#C74922]';
    }
}

export const getBackgroundButtonModal = (level: number): string => {
    switch (level) {
        case 0:
            return 'bg-[#FFC600] hover:bg-[#CBA009] ';
        case 1:
            return 'bg-[#FFC600] hover:bg-[#CBA009] ';
        case 2:
            return 'bg-[#FFC600] hover:bg-[#CBA009] ';
        case 3:
            return 'bg-[#FFC600] hover:bg-[#CBA009] ';
        case 4:
            return 'bg-[#FF00FF] hover:bg-[#BD11BD] ';
        case 5:
            return 'bg-[#FF00FF] hover:bg-[#BD11BD] ';
        default:
            return 'bg-[#FFC600] hover:bg-[#CBA009]';
    }
}
