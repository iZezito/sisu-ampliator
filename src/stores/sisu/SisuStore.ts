import {makeAutoObservable} from "mobx";
import {RootStore} from "../RootStore.tsx";
import GenericService from "../../services/GenericService.ts";
import {Categoria, DadosModalidade, Modalidade, OfertaCurso} from "./index";
import { message } from "antd";
export class SisuStore {
    sisuService: GenericService;
    categorias: Categoria[] = [];
    ofertas: OfertaCurso[] = [];
    minhasOfertas: DadosModalidade[] = []
    rootStore: RootStore;
    loading: boolean = false;
    modalidades: Modalidade[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.sisuService = new GenericService('sisu');
        makeAutoObservable(this, {rootStore: false});
    }

    async getCategorias() {
        await this.rootStore.fetchData(
            this.sisuService.getAllBySearch<Categoria>('categoria', this.rootStore.getConfig()),
            categorias => {
                this.categorias = categorias;
                console.log('Categorias:', categorias);
            }
        );
    }

    async getOfertas(id: string) {
        this.loading = true;
        await this.rootStore.fetchData(
            this.sisuService.getAllBySearch<OfertaCurso>(`curso/${id}`, this.rootStore.getConfig()),
            ofertas => {
                this.ofertas = ofertas;
                console.log('Ofertas:', ofertas);
            },() => {

            },
                () => {
                this.loading = false;
            }
        );

    }

    async getMyOfertas() {
        await this.rootStore.fetchData(
            this.sisuService.getAllBySearch<DadosModalidade>('ofertas', this.rootStore.getConfig()),
            ofertas => {
                this.minhasOfertas = ofertas;
                console.log('Ofertas:', ofertas);
            }
        );
    }

    async getModalidades(id: string) {
        await this.rootStore.fetchData(
            this.sisuService.getAllBySearch<Modalidade>(`${id}/oferta/modalidades`, this.rootStore.getConfig()),
            modalidades => {
                this.modalidades = modalidades;
                console.log('Modalidades:', modalidades);
            }
        );
    }

    // getConfig(): AxiosRequestConfig {
    //     return {
    //         headers: {
    //             Authorization: `Bearer ${this.rootStore.authStore.token}`
    //         }
    //     }
    // }

    // async fetchData<T>(request: Promise<AxiosResponse<T>>, onSuccess: (data: T) => void, onError?: () => void) {
    //     this.loading = true;
    //     try {
    //         const response = await request;
    //         runInAction(() => {
    //             onSuccess(response.data);
    //         });
    //     } catch (error) {
    //         console.error('Erro na requisição:', error);
    //         if (onError) {
    //             onError();
    //         }
    //     } finally {
    //         runInAction(() => {
    //             this.loading = false;
    //         });
    //     }
    // }

    async insertOfertaPreferencia(id: string) {
        message.loading({ content: 'Loading...', key: 'add-oferta' });
        await this.rootStore.fetchData(
            this.sisuService.createBySearch(`oferta/create/${id}`, {}, this.rootStore.getConfig()),
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
        await this.rootStore.fetchData(
            this.sisuService.delete(id, this.rootStore.getConfig()),
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