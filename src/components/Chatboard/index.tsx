import { FC } from "react";
import { TerminalContainer } from "./Terminal/TitleContainer";
import { MessageBoardContainer } from "./MessageBoard/MessageBoardContainer";

export const Chatboard: FC = () => {
  return (
    <div>
      <TerminalContainer />
      <MessageBoardContainer />
    </div>
  );
};

