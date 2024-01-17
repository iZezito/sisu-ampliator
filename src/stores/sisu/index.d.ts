export interface Cetegoria {
    id: string | number;
    label: string;
    chave: string;
    categoria: string;
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