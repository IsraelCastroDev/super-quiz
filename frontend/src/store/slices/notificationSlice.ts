import { StateCreator } from "zustand";

export type Notification = {
  title: string;
  type: "success" | "error";
};

export type NotificationSliceType = {
  notification: Notification | null;
  addNotification: (notification: Notification) => void;
  closeNotification: () => void;
};

export const notificationSlice: StateCreator<NotificationSliceType> = (
  set,
  get
) => ({
  notification: null,
  addNotification: (notification) => {
    set({ notification });

    setTimeout(() => {
      get().closeNotification();
    }, 5000);
  },
  closeNotification: () => set({ notification: null }),
});
