import { FC, useState } from "react";
import { Header } from "./Header";

export const HeaderContainer: FC = () => {
  const [onlineUsers] = useState(24);
  const [totalUsers] = useState(64);
  const [builtDate] = useState('2023-11-02 20:35');
  const [version] = useState('v.0.0.1');
  const [user] = useState({
    name: '@solamimaxi',
    isVerified: true,
  });
  return (
    <Header onlineUsers={onlineUsers} totalUsers={totalUsers} builtDate={builtDate} version={version} user={user}/>
  );
};

