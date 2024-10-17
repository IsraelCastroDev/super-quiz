import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAppStore } from "../../store/useAppStore";

export function Notification() {
  const notification = useAppStore((state) => state.notification);
  const closeNotification = useAppStore((state) => state.closeNotification);

  return (
    <>
      {notification && (
        <div
          className={`${
            notification.type === "success" ? "bg-green-400" : "bg-red-500"
          } text-black font-bold rounded fixed bottom-4 left-4 p-2 w-[300px] z-50 flex items-center justify-between`}
        >
          <div className="w-2/3">
            <p>{notification.title}</p>
          </div>
          <button onClick={closeNotification}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}
