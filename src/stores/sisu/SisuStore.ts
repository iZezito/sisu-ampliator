import {makeAutoObservable} from "mobx";
import {RootStore} from "../RootStore.tsx";
import GenericService from "../../services/GenericService.ts";
import {Cetegoria, OfertaCurso} from "./index";
import {AxiosResponse} from "axios";
export class SisuStore {
    sisuService: GenericService;
    categorias: Cetegoria[] = [];
    ofertas: OfertaCurso[] = [];
    rootStore?: RootStore;
    loading: boolean = false;

    constructor(rootStore?:RootStore) {
        this.rootStore = rootStore;
        this.sisuService = new GenericService('sisu');
        makeAutoObservable(this, {rootStore: false});
    }

    async getCategorias() {
        this.loading = true;
        await this.sisuService.getAllBySearch<Cetegoria>('categoria').then((response: AxiosResponse<Cetegoria[]>) => {
            this.categorias = response.data;
            console.log('Modalidades:', this.categorias);
        }).catch((error) => {
            console.error('Erro na requisição:', error);
        }).finally(() => {
            this.loading = false;
        });
    }

    async getOfertas() {
        this.loading = true;
        await this.sisuService.getAllBySearch<OfertaCurso>('oferta').then((response: AxiosResponse<OfertaCurso[]>) => {
            this.ofertas = response.data;
            console.log('Ofertas:', this.ofertas);
        }).catch((error) => {
            console.error('Erro na requisição:', error);
        }).finally(() => {
            this.loading = false;
        });
    }
}