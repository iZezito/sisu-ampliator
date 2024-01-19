import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "../RootStore.tsx";
import GenericService from "../../services/GenericService.ts";
import {Categoria, OfertaCurso} from "./index";
import {AxiosResponse} from "axios";
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
            this.sisuService.getAllBySearch<Categoria>('categoria'),
            categorias => {
                this.categorias = categorias;
                console.log('Categorias:', categorias);
            }
        );
    }

    async getOfertas(id: string) {
        await this.fetchData(
            this.sisuService.getAllBySearch<OfertaCurso>(`curso/${id}`),
            ofertas => {
                this.ofertas = ofertas;
                console.log('Ofertas:', ofertas);
            }
        );
    }

    async fetchData<T>(request: Promise<AxiosResponse<T>>, onSuccess: (data: T) => void) {
        this.loading = true;
        try {
            const response = await request;
            runInAction(() => {
                onSuccess(response.data);
            });
        } catch (error) {
            console.error('Erro na requisição:', error);
            // Tratar ou lançar exceção, conforme necessário
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    //TODO: Implementar
    async insertOfertaPreferencia(id: string) {
        alert(`Oferta ${id} inserida com sucesso!`);
    }

    //TODO: Implementar
    async removeOfertaPreferencia(id: string) {
        alert(`Oferta ${id} removida com sucesso!`);
    }




    clearOfertas() {
        this.ofertas = [];
    }
    // async getCategorias() {
    //     this.loading = true;
    //     await this.sisuService.getAllBySearch<Categoria>('categoria').then((response: AxiosResponse<Categoria[]>) => {
    //         runInAction(() => {
    //             this.categorias = response.data;
    //             console.log('Categorias:', this.categorias);
    //         });
    //     }).catch((error) => {
    //         console.error('Erro na requisição:', error);
    //     }).finally(() => {
    //           runInAction(() => {
    //              this.loading = false;
    //           });
    //     });
    // }
    //
    // async getOfertas(id: string) {
    //     this.loading = true;
    //     await this.sisuService.getAllBySearch<OfertaCurso>(`curso/${id}`).then((response: AxiosResponse<OfertaCurso[]>) => {
    //         runInAction(() => {
    //             this.ofertas = response.data;
    //             console.log('Ofertas:', this.ofertas);
    //         });
    //     }).catch((error) => {
    //         console.error('Erro na requisição:', error);
    //     }).finally(() => {
    //        runInAction(() => {
    //             this.loading = false;
    //        });
    //     });
    // }
}