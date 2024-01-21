import {DadosModalidade } from "../../stores/sisu";

export interface CardProps {
    oferta: DadosModalidade
    loading?: boolean;
    onClick?: () => void;
    onButtonClick: (id: string) => void;
}