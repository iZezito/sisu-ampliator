import api from './config.ts';
import {AxiosResponse} from "axios";
import {Login} from "../stores/auth";

// type CallbackFunction<T> = (response: AxiosResponse<T>) => void;
class GenericService {

    endpoint: string = '';

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>(): Promise<AxiosResponse<T[]>> {
        return api.get<T[]>(this.endpoint);
    }

    getById<T>(id: string): Promise<AxiosResponse<T>> {
        return api.get<T>(`${this.endpoint}/${id}`);
    }

    create<T>(data: T): Promise<AxiosResponse<T>> {
        return api.post<T>(this.endpoint, data);
    }

    update<T>(id: string, data: T): Promise<AxiosResponse<T>> {
        return api.put<T>(`${this.endpoint}/${id}`, data);
    }

    delete<T>(id: string): Promise<AxiosResponse<T>> {
        return api.delete<T>(`${this.endpoint}/${id}`);
    }

    login<T>(data: Login): Promise<AxiosResponse<T>> {
        return api.post<T>(`${this.endpoint}/login`, data);
    }

    getAllBySearch<T>(search: string): Promise<AxiosResponse<T[]>> {
        return api.get<T[]>(`${this.endpoint}/${search}`);
    }

    getOneBySearch<T>(search: string): Promise<AxiosResponse<T>> {
        return api.get<T>(`${this.endpoint}/${search}`);
    }
}

export default GenericService;