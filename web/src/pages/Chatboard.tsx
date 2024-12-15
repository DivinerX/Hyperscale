import { FC } from "react";
import { HeaderContainer } from "@/components/Header/HeaderContainer";
import { Chatboard } from "@/components/Chatboard";

export const ChatboardPage: FC = () => {
  return (
    <div className="bg-black h-[100vh] pt-14 w-full text-xs text-white overflow-y-hidden" >
      <HeaderContainer />
      <Chatboard />
    </div >
  )
};
