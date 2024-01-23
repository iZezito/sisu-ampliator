import {RootStore} from "../RootStore.tsx";
import {makeAutoObservable, observable} from "mobx";
import {Credentials, Login} from "./index";
import GenericService from "../../services/GenericService.ts";
import { message } from "antd";
import {NavigateFunction} from "react-router-dom";


class AuthStore {
    isAuth: boolean;
    login: Login = {username: '', password: ''};
    rootStore: RootStore;
    authService: GenericService;
    token: string = '';

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.authService = new GenericService('sisu/auth');
        makeAutoObservable(this, {rootStore: false, isAuth: observable, login: observable, token: observable});
        this.isAuth = !!localStorage.getItem('token');
        this.token = localStorage.getItem('token') || '';
    }

    async logar(navigate: NavigateFunction): Promise<void> {
        console.log(this.login);
        message.loading({ content: 'Carregando...', key: 'login' });
        try {
            const response = await this.authService.login<Credentials>(this.login);
            localStorage.setItem('token', response.data.token);
            this.isAuth = true;
            this.token = response.data.token;
            message.success({ content: 'Login efetuado com sucesso!', key: 'login', duration: 2 });
            navigate('/');
        } catch (e) {
            message.error({ content: 'Erro ao efetuar login!', key: 'login', duration: 2 });
            console.log(e);
        }
    }

    changeLogin<T extends keyof Login>(field: T, value: Login[T]) {
        this.login[field] = value;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('idUser');
        this.isAuth = false;
        this.token = '';
    }
}

export default AuthStore;