import {createContext, useContext, PropsWithChildren } from "react";
import {makeAutoObservable, runInAction} from "mobx";
import { SisuStore } from "./sisu/SisuStore.ts";
import AuthStore from "./auth/AuthStore.ts";
import UserStore from "./user/UserStore.ts";
import {AxiosRequestConfig, AxiosResponse} from "axios";

export class RootStore {
    sisuStore: SisuStore;
    authStore: AuthStore;
    userStore: UserStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.sisuStore = new SisuStore(this);
    this.authStore = new AuthStore(this);
    makeAutoObservable(this);
  }

  getConfig(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${this.authStore?.token}`
      }
    }
  }


  async fetchData<T>(request: Promise<AxiosResponse<T>>, onSuccess: (data: T) => void, onError?: () => void, finallyCallback?: () => void) {
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
        if(finallyCallback) {
            finallyCallback();
        }
    }
  }
}

const RootStoreContext = createContext<RootStore | undefined>({} as RootStore);

export const RootStoreProvider = ({children}: PropsWithChildren) => {
  const store = new RootStore();
  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
}

export const useRootStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }
  return store;
}