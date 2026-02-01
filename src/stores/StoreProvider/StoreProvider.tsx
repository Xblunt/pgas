"use client";

import { createContext, ReactNode, FC, useEffect, useState } from "react";
import { AuthStore, UserStore, RootStore, CategoryStore, ProfileStore, RaitingStore, AchievementStore } from "@/stores";
import { AUTH_STORE, CATEGORY_STORE, PROFILE_STORE, RAITING_STORE, USER_STORE, ACHIEVEMENT_STORE } from "@/stores/identifiers";
import Injector from "@/utils/injector";

interface StoreContextValue {
  rootStore: RootStore;
  authStore: AuthStore;
  userStore: UserStore;
  profileStore: ProfileStore;
  categoryStore: CategoryStore;
  raitingStore: RaitingStore;
  achievementStore: AchievementStore;
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
        profileStore: rootStr.profileStore,
        categoryStore: rootStr.categoryStore,
        raitingStore: rootStr.raitingStore,
        achievementStore: rootStr.achievementStore,
      });
    }
  }, []);

  if (rootStore) {
    Injector.register(AUTH_STORE, rootStore.authStore);
    Injector.register(USER_STORE, rootStore.userStore);
    Injector.register(PROFILE_STORE, rootStore.profileStore);
    Injector.register(CATEGORY_STORE, rootStore.categoryStore);
    Injector.register(RAITING_STORE, rootStore.raitingStore);
    Injector.register(ACHIEVEMENT_STORE, rootStore.achievementStore);

    return (
      <StoreContext.Provider value={{ ...rootStore }}>
        {children}
      </StoreContext.Provider>
    );
  }

  return null;
};

export default StoreProvider;
