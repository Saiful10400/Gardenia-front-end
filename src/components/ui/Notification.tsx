"use-client";

import useGetAllNotification from "@/utils/useGetAllNotification";
import SingleNotificationCard, {
  Tnotification,
} from "./SingleNotificationCard";

const Notification = () => {
  const notification = useGetAllNotification();
  return (
    <div className="bg-gray-100 p-1 flex flex-col gap-3 h-[300px] overflow-x-hidden">
      {notification?.map((item: Tnotification) => (
        <SingleNotificationCard key={item._id} notification={item} />
      ))}
    </div>
  );
};

export default Notification;
