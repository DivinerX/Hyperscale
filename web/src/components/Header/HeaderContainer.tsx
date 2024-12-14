import { FC, useEffect, useState } from "react";
import { Header } from "./Header";
import { SocketService } from "@/services/socket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Loading } from "@/components/Loading";
import { getTotalUsers } from "@/store/slices/userSlice";

export const HeaderContainer: FC = () => {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [builtDate] = useState('2023-11-02 20:35');
  const [version] = useState('v.0.0.1');

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);
  const totalUsers = useSelector((state: RootState) => state.user.totalUsers);

  useEffect(() => {
    dispatch(getTotalUsers());
    SocketService.emit(SocketService.event.checkUsers, user);
  }, [dispatch, user])

  useEffect(() => {
    SocketService.on(SocketService.event.onlineUsers, (data) => {
      console.log("online users", data);
      setOnlineUsers(data.length)  
    })
  }, [])

  return (
    user ?
      <Header onlineUsers={onlineUsers} totalUsers={totalUsers} builtDate={builtDate} version={version} user={user} />
      : <Loading />
  );
};

