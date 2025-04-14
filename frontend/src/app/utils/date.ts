export interface MonthsDTO {
    number: number;
    month: string;
}

export const months: MonthsDTO[] = [
    { month: 'Enero', number: 1 },
    { month: 'Febrero', number: 2 },
    { month: 'Marzo', number: 3 },
    { month: 'Abril', number: 4 },
    { month: 'Mayo', number: 5 },
    { month: 'Junio', number: 6 },
    { month: 'Julio', number: 7 },
    { month: 'Agosto', number: 8 },
    { month: 'Septiembre', number: 9 },
    { month: 'Octubre', number: 10 },
    { month: 'Noviembre', number: 11 },
    { month: 'Diciembre', number: 12 }
];

export interface YearDTO {
    year: number;
}

const currentYear = new Date().getFullYear()//obtenemos el año actual

//rango de años, desde el año 200 hasta el año actual o 2025 (el que sea menor)
export const years: YearDTO[] = Array.from(
    {
        length: 2025 - 2000 + 1
    },
    (_, index) => ({ year: 2000 + index })
)
//si deseas asegurar que siempre este hasta el año actual (no solo hasta 2025)
export const yearsUntilCurrent: YearDTO[] = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, index) => ({ year: 2025 - index })//empieza desde 2025 y resta el indice
);

//buscar nombre por mes
export const getMonthName = (monthNumber: number): string => {
    const month = months.find(m => m.number === monthNumber);
    return month ? month.month : "Mes Inválido"
}

export const DateFormat = (date: string) => {
    const fecha = new Date(date);

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
}