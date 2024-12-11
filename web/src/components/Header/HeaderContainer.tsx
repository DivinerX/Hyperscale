import { FC, useEffect, useState } from "react";
import { Header } from "./Header";
import { socketService } from "../../services/socket";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const HeaderContainer: FC = () => {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [totalUsers] = useState(64);
  const [builtDate] = useState('2023-11-02 20:35');
  const [version] = useState('v.0.0.1');

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    socketService.on(socketService.event.onlineUsers, (data: any) => {
      setOnlineUsers(data.length)
    })
  }, [])
  return (
    <Header onlineUsers={onlineUsers} totalUsers={totalUsers} builtDate={builtDate} version={version} user={user}/>
  );
};

