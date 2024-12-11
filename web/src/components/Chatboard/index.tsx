import { FC } from "react";
import { TerminalContainer } from "./Terminal/TitleContainer";
import { MessageBoardContainer } from "./MessageBoard/MessageBoardContainer";
import { MessageInputContainer } from "./MessageInput/MessageInputContainer";

export const Chatboard: FC = () => {
  return (
    <div className="flex flex-col h-full pb-20">
      <TerminalContainer />
      <MessageBoardContainer />
      <MessageInputContainer />
    </div>
  );
};
