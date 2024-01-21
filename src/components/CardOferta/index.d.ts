import {DadosModalidade, OfertaCurso} from "../../stores/sisu";

export interface CardProps {
    oferta: DadosModalidade
    loading?: boolean;
    onClick?: () => void;
    onButtonClick: (id: string) => void;
}

export interface CardSearchProps {
    oferta: OfertaCurso;
    loading?: boolean;
    onClick?: () => void;
    onButtonClick: (id: string) => void;
}