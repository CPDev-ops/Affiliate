
export interface HeaderProps {
    userName: string;
    level: number;
}

export interface HeaderBalanceProps {
    visits: number
    level: number
}

//interface para el tipo esperado para el nav
export type TypeDto = 'admin' | 'user';

//interface para los componentes q esperan un dominio y un tipo 
export interface ComponentProp {
    type: TypeDto
    domain: string
}