import { FC } from "react";
import { HeaderContainer } from "../components/Header/HeaderContainer";
import { Chatboard } from "../components/Chatboard";

export const ChatboardPage: FC = () => {
  return (
    <div className="bg-black h-full w-full text-xs text-white" >
      <HeaderContainer />
      <Chatboard />
    </div >
  )
};
