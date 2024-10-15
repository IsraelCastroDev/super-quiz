import { UserAuthData } from "@/types";
import { StateCreator } from "zustand";

export type StateAppPersistType = {
  userAuth: UserAuthData | null;
  setUserAuth: (userAuth: UserAuthData | null) => void;
  clearUserAuth: () => void;
};

export const stateAppPersistSlice: StateCreator<StateAppPersistType> = (
  set
) => ({
  userAuth: null,
  setUserAuth: (userAuth) => set({ userAuth }),
  clearUserAuth: () => set({ userAuth: null }),
});
