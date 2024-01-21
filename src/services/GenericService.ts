import api from './config.ts';
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {Login} from "../stores/auth";

// type CallbackFunction<T> = (response: AxiosResponse<T>) => void;
class GenericService {

    endpoint: string = '';

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>(config?: AxiosRequestConfig): Promise<AxiosResponse<T[]>> {
        return api.get<T[]>(this.endpoint, config);
    }

    getById<T>(id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return api.get<T>(`${this.endpoint}/${id}`, config);
    }

    create<T>(data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return api.post<T>(this.endpoint, data, config);
    }

    update<T>(id: string, data: T, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return api.put<T>(`${this.endpoint}/${id}`, data, config);
    }

    delete<T>(id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return api.delete<T>(`${this.endpoint}/${id}`, config);
    }

    login<T>(data: Login): Promise<AxiosResponse<T>> {
        return api.post<T>(`${this.endpoint}/login`, data);
    }

    getAllBySearch<T>(search: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T[]>> {
        return api.get<T[]>(`${this.endpoint}/${search}`, config);
    }

    getOneBySearch<T>(search: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return api.get<T>(`${this.endpoint}/${search}`, config);
    }

    createBySearch<T>(search: string, data?: T, config?: AxiosRequestConfig ): Promise<AxiosResponse<T>> {
        return api.post<T>(`${this.endpoint}/${search}`, data, config);
    }
}

export default GenericService;