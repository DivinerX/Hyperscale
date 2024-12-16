import { FC } from "react";
import { HeaderContainer } from "./Header/HeaderContainer";
import { MessageInputContainer } from "./MessageInput/MessageInputContainer";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const WithHeader: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const inputHeight = useSelector((state: RootState) => state.messages.inputHeight);
  return (
    <>
      <HeaderContainer />
      <div className={`h-full pb-[${inputHeight}px] pt-[88px] overflow-y-auto`}>
        {children}
      </div>
      {isAuthenticated && <MessageInputContainer />}
    </>
  );
};