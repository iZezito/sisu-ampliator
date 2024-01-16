import {RootStore} from "../RootStore.tsx";
import {makeAutoObservable, observable} from "mobx";
import {Credentials, Login} from "./index";
import GenericService from "../../services/GenericService.ts";


class AuthStore {
    isAuth: boolean;
    login: Login = {username: '', password: ''};
    rootStore: RootStore;
    authService: GenericService;
    credentials: Credentials = { idUser: '', token: ''};

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.authService = new GenericService('/auth');
        makeAutoObservable(this, {rootStore: false, isAuth: observable, login: observable, credentials: observable});
        this.isAuth = !!localStorage.getItem('token');
        this.credentials.idUser = localStorage.getItem('idUser') || '';
        this.credentials.token = localStorage.getItem('token') || '';
    }

    async logar(): Promise<boolean> {
        try {
            const response = await this.authService.login<Credentials>(this.login);
            localStorage.setItem('token', response.data.token);
            this.isAuth = true;
            this.credentials.idUser = response.data.idUser;
            this.credentials.token = response.data.token;
            localStorage.setItem('idUser', response.data.idUser);
            return this.isAuth;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('idUser');
        this.isAuth = false;
        this.credentials.idUser = '';
        this.credentials.token = '';
    }
}

export default AuthStore;