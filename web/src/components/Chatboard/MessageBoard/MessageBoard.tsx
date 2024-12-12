import { FC } from "react";
import { IMessage, IUser } from "@/Types";
import { Message } from "./Message";

export const MessageBoard: FC<{ messages: IMessage[], user: IUser | null }> = ({ messages, user }) => {
  return (
    user && (<div className="p-5 space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} user={user} />
      ))}
    </div>)
  );
};
