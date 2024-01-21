import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "../RootStore.tsx";
import GenericService from "../../services/GenericService.ts";
import {Categoria, DadosModalidade, OfertaCurso} from "./index";
import { AxiosRequestConfig, AxiosResponse} from "axios";
import { message } from "antd";
export class SisuStore {
    sisuService: GenericService;
    categorias: Categoria[] = [];
    ofertas: OfertaCurso[] = [];
    minhasOfertas: DadosModalidade[] = []
    rootStore?: RootStore;
    loading: boolean = false;

    constructor(rootStore?: RootStore) {
        this.rootStore = rootStore;
        this.sisuService = new GenericService('sisu');
        makeAutoObservable(this, {rootStore: false});
    }

    async getCategorias() {
        await this.fetchData(
            this.sisuService.getAllBySearch<Categoria>('categoria', this.getConfig()),
            categorias => {
                this.categorias = categorias;
                console.log('Categorias:', categorias);
            }
        );
    }

    async getOfertas(id: string) {
        await this.fetchData(
            this.sisuService.getAllBySearch<OfertaCurso>(`curso/${id}`, this.getConfig()),
            ofertas => {
                this.ofertas = ofertas;
                console.log('Ofertas:', ofertas);
            }
        );

    }

    async getMyOfertas() {
        await this.fetchData(
            this.sisuService.getAllBySearch<DadosModalidade>('ofertas', this.getConfig()),
            ofertas => {
                this.minhasOfertas = ofertas;
                console.log('Ofertas:', ofertas);
            }
        );
    }

    getConfig(): AxiosRequestConfig {
        return {
            headers: {
                Authorization: `Bearer ${this.rootStore?.authStore.token}`
            }
        }
    }

    async fetchData<T>(request: Promise<AxiosResponse<T>>, onSuccess: (data: T) => void, onError?: () => void) {
        this.loading = true;
        try {
            const response = await request;
            runInAction(() => {
                onSuccess(response.data);   
            });
        } catch (error) {
            console.error('Erro na requisição:', error);
            if (onError) {
                onError();
            }
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async insertOfertaPreferencia(id: string) {
        message.loading({ content: 'Loading...', key: 'add-oferta' });
        await this.fetchData(
            this.sisuService.createBySearch(`oferta/create/${id}`, {}, this.getConfig()),
            () => {
                message.success({ content: 'Oferta adicionada com sucesso!', key: 'add-oferta', duration: 2 });
            },
            () => {
                message.error({ content: 'Erro ao adicionar oferta!', key: 'add-oferta', duration: 2 });
            }
        );
    }
    async removeOfertaPreferencia(id: string) {
        message.loading({ content: 'Removendo oferta...', key: 'remove-oferta' });
        await this.fetchData(
            this.sisuService.delete(id, this.getConfig()),
            () => {
                message.success({ content: 'Oferta removida com sucesso!', key: 'remove-oferta', duration: 2 });
                this.minhasOfertas = this.minhasOfertas.filter(oferta => oferta.oferta.co_oferta !== id);
            },
            () => {
                message.error({ content: 'Erro ao remover oferta!', key: 'remove-oferta', duration: 2 });
            }
        );
    }




    clearOfertas() {
        this.ofertas = [];
    }
}