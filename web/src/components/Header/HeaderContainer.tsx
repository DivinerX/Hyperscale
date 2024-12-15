import { FC, useEffect, useState } from "react";
import { Header } from "./Header";
import { SocketService } from "@/services/socket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Loading } from "@/components/Loading";
import { getAllUsers, setOnlineUsers } from "@/store/slices/userSlice";

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
    SocketService.emit(SocketService.event.checkUsers, user);
  }, [dispatch, user])

  useEffect(() => {
    SocketService.on(SocketService.event.onlineUsers, (data) => {
      console.log("online users", data);
      dispatch(setOnlineUsers(data))
    })
  }, [dispatch])

  return (
    user ?
      <Header onlineUsers={onlineUsers} totalUsers={users ? users.length : 0} builtDate={builtDate} version={version} user={user} currentTime={currentTime} />
      : <Loading />
  );
};

