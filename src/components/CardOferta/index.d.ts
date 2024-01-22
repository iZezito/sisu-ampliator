import {DadosModalidade, OfertaCurso} from "../../stores/sisu";
import {Notas} from "../../stores/user";

export interface CardProps {
    oferta: DadosModalidade
    loading?: boolean;
    onClick?: () => void;
    onButtonClick: (id: string) => void;
    notas?: Notas;
}

export interface CardSearchProps {
    oferta: OfertaCurso;
    loading?: boolean;
    onClick?: () => void;
    onButtonClick: (id: string) => void;
}