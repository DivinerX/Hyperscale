import { FC, useEffect, useState } from "react";
import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getAllUsers } from "@/store/slices/userSlice";

export const HeaderContainer: FC = () => {
  const [builtDate] = useState('2023-11-02 20:35');
  const [version] = useState('v.0.0.1');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);
  const onlineUsers = useSelector((state: RootState) => state.user.onlineUsers);
  const users = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    dispatch(getAllUsers());
    // socketService.emit(socketEvent.checkUsers, user);
  }, [dispatch])

  useEffect(() => {
    // socketService.on(socketEvent.onlineUsers, (data) => {
    //   dispatch(setOnlineUsers(data))
    // })

    // return () => {
    //   socketService.off(socketEvent.onlineUsers, (data) => {
    //     dispatch(setOnlineUsers(data))
    //   })
    // }
  }, [])

  return (
    <Header onlineUsers={onlineUsers} totalUsers={users ? users.length : 0} builtDate={builtDate} version={version} user={user} currentTime={currentTime} />
  );
};
