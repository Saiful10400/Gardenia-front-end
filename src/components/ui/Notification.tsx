"use-client";

import useGetAllNotification from "@/utils/helperComponent/useGetAllNotification";
import SingleNotificationCard, {
  Tnotification,
} from "./SingleNotificationCard";

const Notification = () => {
  const notification = useGetAllNotification();
  return (
    <div className="bg-gray-300 rounded-md p-1 flex flex-col gap-3 pt-4 min-h-[300px] overflow-x-hidden">
      {notification?.map((item: Tnotification) => (
        <SingleNotificationCard key={item._id} notification={item} />
      ))}
    </div>
  );
};

export default Notification;
