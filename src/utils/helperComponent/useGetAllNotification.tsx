import { useGetNotificationQuery } from '@/Redux/api/api';
import { useAppSelector } from '@/Redux/hoocks/Convaying';
import { Tuser } from '@/Types';
import { socket } from '@/Wsocket';
import  { useEffect, useState } from 'react';

const useGetAllNotification = () => {

    const [notification, setNotification] = useState([]);
    const { loggedInUser }: { loggedInUser: Tuser | null } = useAppSelector(
      (e) => e.authStore
    );
    const [skip, setSkip] = useState(true);
    const { data } = useGetNotificationQuery(loggedInUser?._id, { skip });
    useEffect(() => {
      if (loggedInUser) setSkip(false);
    }, [loggedInUser]);
  
    useEffect(() => {
      setNotification(data?.data);
    }, [data]);
  
    useEffect(() => {
      socket.on("notification", (data) => {
        setNotification(data);
      });
    }, []);
  

    return notification
};

export default useGetAllNotification;