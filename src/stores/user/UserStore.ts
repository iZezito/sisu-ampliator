import { makeAutoObservable } from "mobx";
import {RootStore} from "../RootStore.tsx";
import {User} from "./index";
import GenericService from "../../services/GenericService.ts";
import { message } from "antd";

export class UserStore {
    rootStore: RootStore;
    userService: GenericService
    formData: User = {} as User;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.userService = new GenericService('users');
        makeAutoObservable(this, {rootStore: false});
    }

    changeFormData<T extends keyof User>(field: T, value: User[T]) {
        this.formData[field] = value;
        console.log(this.formData);
    }

    onSubmit = () => {
        message.loading({ content: 'Loading...', key: 'create-user' });
        this.userService.create(this.formData)
            .then(() => {
                message.success({ content: 'Usuário criado com sucesso!', key: 'create-user', duration: 2 });
            })
            .catch((err) => {
                message.error({ content: 'Erro ao criar usuário!', key: 'create-user', duration: 2 })
                console.log(err);
            });
    };
}

export default UserStore;