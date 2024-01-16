import {makeAutoObservable} from "mobx";
import {RootStore} from "../RootStore.tsx";
import GenericService from "../../services/GenericService.ts";
import {Modalidade} from "./index";
import {AxiosResponse} from "axios";
export class SisuStore {
    sisuService: GenericService;
    modalidades: Modalidade[] = [];
    rootStore?: RootStore;
    loading: boolean = false;

    constructor(rootStore?:RootStore) {
        this.rootStore = rootStore;
        this.sisuService = new GenericService('categoria');
        makeAutoObservable(this, {rootStore: false});
    }

    async getModalidades() {
        this.loading = true;
        await this.sisuService.getAll<Modalidade>().then((response: AxiosResponse<Modalidade[]>) => {
            this.modalidades = response.data;
            console.log('Modalidades:', this.modalidades);
        }).catch((error) => {
            console.error('Erro na requisição:', error);
        }).finally(() => {
            this.loading = false;
        });
    }
}