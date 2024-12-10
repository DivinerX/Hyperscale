import { FC } from "react";
import { TMessage, TUser } from "./MessageBoardContainer";

export const MessageBoard: FC<{ messages: TMessage[], user: TUser }> = ({ messages, user }) => {
  return (
    <div className="p-5 space-y-4">
      {messages.map((message) => (
        message.sender.id === user.id ? (
          // User's messages (right-aligned)
          <div key={message.id} className="flex items-start justify-end gap-2">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span>{message.sender.name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="px-3 max-w-[80%]">
                {message.content}
              </div>
            </div>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-sm"
            />
          </div>
        ) : (
          // Other users' messages (left-aligned)
          <div key={message.id} className="flex items-start gap-2">
            <img
              src={message.sender.avatar}
              alt={message.sender.name}
              className="w-8 h-8 rounded-sm"
            />
            <div className="flex flex-col">
              <div className="px-3 max-w-[80%]">
                {message.content}
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        )
      ))}
    </div>
  );
};
