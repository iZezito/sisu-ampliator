import {createContext, useContext, PropsWithChildren } from "react";
import {makeAutoObservable} from "mobx";
import { SisuStore } from "./sisu/SisuStore.ts";
import AuthStore from "./auth/AuthStore.ts";
import UserStore from "./user/UserStore.ts";

export class RootStore {
    sisuStore: SisuStore;
    authStore: AuthStore;
    userStore: UserStore;
  constructor() {
    this.sisuStore = new SisuStore(this);
    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
    makeAutoObservable(this);
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