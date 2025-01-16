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

export const getTextByLevel = (level: number) => {
    switch (level) {
        case 0:
            return '#D00E4D'; // Rojo para nivel 0
        case 1:
            return '#F2BF4C'; // Amarillo para nivel 1
        case 2:
            return '#FC5D35'; // Naranja para nivel 2
        case 3:
            return '#54CA87'; // Verde para nivel 3
        case 4:
            return '#6DACE2'; // Azul para nivel 4
        case 5:
            return '#CD4AF7'; // Morado para nivel 5
        default:
            return '#000000'; // Color por defecto
    }
};

