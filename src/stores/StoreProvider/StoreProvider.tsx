"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import RootStore from "@/stores/root.store";
import Injector from "@/utils/injector";
import { AUTH_STORE } from "@/stores/identifiers";

export const StoreContext = createContext<RootStore | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

const StoreProvider: React.FC<Props> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  const store = useMemo(() => new RootStore(), []);

  useEffect(() => {
    Injector.register(AUTH_STORE, store.authStore);

    store.authStore.hydrate();
    setIsReady(true);

    return () => {
      store.authStore.dispose();
    };
  }, [store]);

  if (!isReady || !store.authStore.isHydrated) {
    return null;
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
