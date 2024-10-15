import { create } from "zustand";
import {
  notificationSlice,
  NotificationSliceType,
} from "./slices/notificationSlice";
import { stateAppSlice, StateAppType } from "./slices/stateAppSlice";

export const useAppStore = create<NotificationSliceType & StateAppType>(
  (...a) => ({
    ...notificationSlice(...a),
    ...stateAppSlice(...a),
  })
);
