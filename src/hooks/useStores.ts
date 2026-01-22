import { useContext } from "react";
import { StoreContext } from "@/stores/StoreProvider/StoreProvider";

export function useStores () {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStores must be used within a StoreProvider");
  }
  return context;
};

