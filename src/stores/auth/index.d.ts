export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    cienciasNatureza: number;
    cienciasHumanas: number;
    linguagens: number;
    matematica: number;
    redacao: number;
}

export interface Login {
    username: string;
    password: string;
}

export interface Credentials {
    token: string;
    idUser: string;
}