export interface Categoria {
    id: string | number;
    label: string;
    chave: string;
    categoria: string;
}
export interface Search {
    label: string;
    value: string;
}

interface OfertaCurso {
    co_oferta: string;
    co_termo_adesao: string;
    co_ies: string;
    co_curso: string;
    no_curso: string;
    qt_vagas_sem1: string;
    qt_vagas_sem2: string;
    co_grau: string;
    no_grau: string;
    co_turno: string;
    no_turno: string;
    st_turno_m: string;
    st_turno_v: string;
    st_turno_n: string;
    ds_documentacao: string;
    co_campus: string;
    no_campus: string;
    sg_uf_campus: string;
    co_municipio_campus: string;
    no_municipio_campus: string;
    no_ies: string;
    sg_ies: string;
    sg_uf_ies: string;
    co_municipio_ies: string;
    no_municipio_ies: string;
    nu_nmin_cn: string;
    nu_peso_cn: string;
    nu_nmin_ch: string;
    nu_peso_ch: string;
    nu_nmin_l: string;
    nu_peso_l: string;
    nu_nmin_m: string;
    nu_peso_m: string;
    nu_nmin_r: string;
    nu_peso_r: string;
    nu_media_minima: string;
    ds_complemento: string;
    st_possui_afirmativa: string;
    no_sitio_ies: string;
    co_curso_emec: string;
    ds_protocolo: string;
    ds_autenticidade: string;
}

export interface Modalidade{
    dia: Date;
    co_oferta_modalidade: string;
    co_oferta: string;
    co_concorrencia: string;
    no_concorrencia: string;
    st_lei_ppi: string;
    ds_documentacao: string | null;
    qt_vagas: string;
    qt_vagas_concorrencia: string;
    qt_bonus_perc: string;
    nu_nota_corte: string | null;
    dt_nota_corte: string | null;
    tp_mod_concorrencia: string;
    tp_cota: string | null;
    tp_salario_minimo: string | null;
    nu_ordem: string;
    titulo_modalidade: string;
    titulo_renda: string;
    titulo_cota: string | null;
}

export interface DadosModalidade {
    oferta: OfertaCurso
    historico: Modalidade[]
}