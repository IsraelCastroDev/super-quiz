import { create } from "zustand";
import {
  notificationSlice,
  NotificationSliceType,
} from "./slices/notificationSlice";

export const useAppStore = create<NotificationSliceType>((...a) => ({
  ...notificationSlice(...a),
}));
