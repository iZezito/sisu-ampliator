import {makeAutoObservable} from "mobx";
import {RootStore} from "../RootStore.tsx";
import GenericService from "../../services/GenericService.ts";
import {Modalidade} from "./index";
import api from "../../services/config.ts";
import {AxiosResponse} from "axios";

export class SisuStore {
    sisuService: GenericService;
    modalidades: Modalidade[] = [];
    rootStore?:RootStore;
    loading:boolean = false;

    constructor(rootStore?:RootStore) {
        this.rootStore = rootStore;
        this.sisuService = new GenericService();
        makeAutoObservable(this, {rootStore: false});
    }

    async getModalidades() {
        this.loading = true;
        await api.get<Modalidade[]>('/categoria').then((response: AxiosResponse<Modalidade[]>) => {
            this.modalidades = response.data;
        }).catch((error) => {
            console.error('Erro na requisição:', error);
        }).finally(() => {
            this.loading = false;
        });
    }
}