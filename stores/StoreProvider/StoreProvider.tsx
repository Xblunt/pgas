"use client";

import { createContext, ReactNode, FC, useEffect, useState } from "react";
import { AuthStore, UserStore, AdminStore, RootStore } from "@/stores";
import { AUTH_STORE, USER_STORE, ADMIN_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";


interface StoreContextValue {
  rootStore: RootStore;
  authStore: AuthStore;
  userStore: UserStore;
  adminStore: AdminStore;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [rootStore, setRootStore] = useState<StoreContextValue | undefined>();


  useEffect(() => {
    if (typeof window !== "undefined") {
      const rootStr = new RootStore();
      setRootStore({
        rootStore: rootStr,
        authStore: rootStr.authStore,
        userStore: rootStr.userStore,
        adminStore: rootStr.adminStore,
      });
    }
  }, []);

  if (rootStore) {
    Injector.register(AUTH_STORE, rootStore.authStore);
    Injector.register(USER_STORE, rootStore.userStore);
    Injector.register(ADMIN_STORE, rootStore.adminStore);

    return (
      <StoreContext.Provider value={{ ...rootStore }}>
        {children}
      </StoreContext.Provider>
    );
  }

  return null;
};

export default StoreProvider;
