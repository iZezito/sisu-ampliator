import {makeAutoObservable} from "mobx";
import {RootStore} from "../RootStore.tsx";
import {Notas, User} from "./index";
import GenericService from "../../services/GenericService.ts";
import { message } from "antd";

export class UserStore {
    rootStore: RootStore;
    userService: GenericService
    formData: User = {} as User;
    minhasNotas: Notas = {} as Notas;
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


    // async onSubmit() {
    //     await this.rootStore.fetchData(
    //         this.userService.create<User>(this.formData),
    //         () => {
    //             message.success('Usuário cadastrado com sucesso!');
    //         },
    //         () => {
    //             message.error('Erro ao cadastrar usuário!');
    //         }
    //     );
    // }

    async getMyNotas() {
        await this.rootStore.fetchData(
            this.userService.getOneBySearch<Notas>('sisu/notas', this.rootStore.getConfig()),
            notas => {
                this.minhasNotas = notas;
                console.log('Notas:', notas);
            }
        );
    }
}

export default UserStore;