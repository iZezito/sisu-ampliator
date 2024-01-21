import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "../RootStore.tsx";
import GenericService from "../../services/GenericService.ts";
import {Categoria, OfertaCurso} from "./index";
import { AxiosRequestConfig, AxiosResponse} from "axios";
import { message } from "antd";
export class SisuStore {
    sisuService: GenericService;
    categorias: Categoria[] = [];
    ofertas: OfertaCurso[] = [];
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
            this.sisuService.getAllBySearch<OfertaCurso>('ofertas', this.getConfig()),
            ofertas => {
                this.ofertas = ofertas;
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
    //TODO: Implementar

    // async insertOfertaPreferencia(id: string) {
    //     message.loading({ content: 'Loading...', key: 'add-oferta' });
    //     await this.sisuService.createBySearch(`oferta/create/${id}`, {}, this.getConfig()).then(() => {
    //         message.success({ content: 'Oferta adicionada com sucesso!', key: 'add-oferta', duration: 2 });
    //     }).catch((err) => {
    //         message.error({ content: 'Erro ao adicionar oferta!', key: 'add-oferta', duration: 2 })
    //         console.log(err);
    //     });
    // }

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

    //TODO: Implementar
    async removeOfertaPreferencia(id: string) {
        alert(`Oferta ${id} removida com sucesso!`);
    }




    clearOfertas() {
        this.ofertas = [];
    }
}