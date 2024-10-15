import { StateCreator } from "zustand";

export type StateAppType = {
  showTokenPinForm: boolean;
  tokenResetPassword: string | null;
  setShowTokenPinForm: (showTokenPinForm: boolean) => void;
  setTokenResetPassword: (tokenResetPassword: string | null) => void;
};

export const stateAppSlice: StateCreator<StateAppType> = (set) => ({
  showTokenPinForm: false,
  tokenResetPassword: null,
  setShowTokenPinForm: (showTokenPinForm) => set({ showTokenPinForm }),
  setTokenResetPassword: (tokenResetPassword) => set({ tokenResetPassword }),
});
