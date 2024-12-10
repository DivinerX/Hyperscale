import { FC, useState } from "react";
import { MessageBoard } from "./MessageBoard";

export type TUser = {
  id: string
  name: string
  avatar: string
}

export type TMessage = {
  id: string;
  content: string;
  sender: TUser;
  timestamp: string;
};

export const MessageBoardContainer: FC = () => {
  const [user, setUser] = useState<TUser>({
    id: "123",
    name: "@solamimaxi",
    avatar: "/avatar.png"
  })

  const [messages, setMessages] = useState<TMessage[]>([
    {
      id: "1",
      content: "Hey there! How's everyone doing?",
      sender: {
        id: "123",
        name: "@solamimaxi",
        avatar: "/avatar.png"
      },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 24 hours ago
    },
    {
      id: "2",
      content: "Hi! I'm doing great, thanks for asking!",
      sender: {
        id: "456",
        name: "@johndoe",
        avatar: "/avatar.png"
      },
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() // 12 hours ago
    },
    {
      id: "3",
      content: "Has anyone started working on the new feature yet?",
      sender: {
        id: "789",
        name: "@janedoe",
        avatar: "/avatar.png"
      },
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() // 1 hour ago
    }
  ]);

  return (
    <MessageBoard messages={messages} user={user} />
  );
};
