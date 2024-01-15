import {createContext, useContext, PropsWithChildren } from "react";
import {makeAutoObservable} from "mobx";
import { SisuStore } from "./sisu/SisuStore.ts";

export class RootStore {
    sisuStore: SisuStore;
  constructor() {
    this.sisuStore = new SisuStore(this);
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