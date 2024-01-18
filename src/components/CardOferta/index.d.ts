import {OfertaCurso} from "../../stores/sisu";

export interface CardProps {
    oferta: OfertaCurso;
    loading?: boolean;
    onClick?: () => void;
}