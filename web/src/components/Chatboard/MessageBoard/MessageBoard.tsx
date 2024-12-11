import { FC } from "react";
import { TMessage, TUser } from "./MessageBoardContainer";
import { Message } from "./Message";

export const MessageBoard: FC<{ messages: TMessage[], user: TUser }> = ({ messages, user }) => {
  return (
    <div className="p-5 space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} user={user} />
      ))}
    </div>
  );
};
