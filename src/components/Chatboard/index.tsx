import { FC } from "react";
import { TitleContainer } from "./Title/TitleContainer";
import { MessageBoardContainer } from "./MessageBoard/MessageBoardContainer";

export const Chatboard: FC = () => {
  return (
    <div>
      <TitleContainer />
      <MessageBoardContainer />
    </div>
  );
};

