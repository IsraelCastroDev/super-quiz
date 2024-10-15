import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  notificationSlice,
  NotificationSliceType,
} from "./slices/notificationSlice";
import { stateAppSlice, StateAppType } from "./slices/stateAppSlice";

export const useAppStore = create<NotificationSliceType & StateAppType>()(
  devtools((...a) => ({
    ...notificationSlice(...a),
    ...stateAppSlice(...a),
  }))
);
