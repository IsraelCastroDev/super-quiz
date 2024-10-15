import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  stateAppPersistSlice,
  StateAppPersistType,
} from "./slices/stateAppPersistSlice";

export const useAppPersists = create<StateAppPersistType>()(
  persist(
    (...a) => ({
      ...stateAppPersistSlice(...a),
    }),
    {
      name: "app-storage",
    }
  )
);
