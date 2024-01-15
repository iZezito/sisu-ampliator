import api from './config.ts';
import {AxiosResponse} from "axios";

type CallbackFunction<T> = (response: AxiosResponse<T>) => void;
class GenericService {
    // async getAll<T>(uri: string, loading: boolean, callback: CallbackFunction<T[]>): Promise<void> {
    //     try {
    //         const response = await api.get<T[]>(uri);
    //         callback(response);
    //     } catch (error) {
    //         // Trate os erros aqui, se necessário
    //         console.error('Erro na requisição:', error);
    //     }
    // }

    async getAll<T>(uri: string, callback: CallbackFunction<T[]>): Promise<void> {
        await api.get<T[]>(uri).then((response) => callback(response)).catch((error) => {
            console.error('Erro na requisição:', error);
        });
    }

    async getOne<T>(uri: string, callback: CallbackFunction<T>): Promise<void> {
        try {
            const response = await api.get<T>(uri);
            callback(response);
        } catch (error) {
            // Trate os erros aqui, se necessário
            console.error('Erro na requisição:', error);
        }
    }

    async create<T>(uri: string, data: T, callback: CallbackFunction<T>): Promise<void> {
        try {
            const response = await api.post<T>(uri, data);
            callback(response);
        } catch (error) {
            // Trate os erros aqui, se necessário
            console.error('Erro na requisição:', error);
        }
    }

    async update<T>(uri: string, data: T, callback?: CallbackFunction<T>): Promise<void> {
        try {
            const response = await api.put<T>(uri, data);
            if (callback) {
                callback(response);
            }

        } catch (error) {
            // Trate os erros aqui, se necessário
            console.error('Erro na requisição:', error);
        }
    }

    async delete<T>(uri: string, callback?: CallbackFunction<T>): Promise<void> {
        try {
            const response = await api.delete<T>(uri);
            if (callback) {
                callback(response);
            }
        } catch (error) {
            // Trate os erros aqui, se necessário
            console.error('Erro na requisição:', error);
        }
    }
}

export default GenericService;