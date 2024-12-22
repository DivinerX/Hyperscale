import { FC, useEffect, useRef } from "react";
import { HeaderContainer } from "./Header/HeaderContainer";
import { MessageInputContainer } from "./MessageInput/MessageInputContainer";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const WithHeader: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const inputHeight = useSelector((state: RootState) => state.messages.inputHeight);
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.style.cssText = `padding-bottom: ${inputHeight}px;`;
    }
  })

  return (
    <>
      <HeaderContainer />
      <div ref={messageRef} className={`h-full pt-[88px]`}>
        {children}
      </div>
      {isAuthenticated && <MessageInputContainer />}
    </>
  );
};