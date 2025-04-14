import { LevelDto } from "./user";

export interface HeaderProps {
    userName: string | undefined;
    level: LevelDto;
    periodoDesde: string | undefined;
    periodoHasta: string | undefined;
}


export interface HeaderBalanceProps {
    visits: number
    level: LevelDto
}

//interface para el tipo esperado para el nav
export type TypeDto = string;

//interface para los componentes q esperan un dominio y un tipo 
export interface ComponentProp {
    type: TypeDto
    domain: string
}