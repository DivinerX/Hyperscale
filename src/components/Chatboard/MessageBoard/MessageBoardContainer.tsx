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
  type: "text" | "image" | "audio" | "video" | "file";
  status: "pending" | "sent" | "delivered" | "read";
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
      type: "text",
      status: "read",
      sender: {
        id: "123",
        name: "@solamimaxi",
        avatar: "/avatar.png"
      },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "2",
      content: "Hi! I'm doing great, thanks for asking!",
      type: "text",
      status: "pending",
      sender: {
        id: "456",
        name: "@johndoe",
        avatar: "/avatar.png"
      },
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "3",
      content: "Has anyone started working on the new feature yet?",
      type: "text",
      status: "read",
      sender: {
        id: "789",
        name: "@janedoe",
        avatar: "/avatar.png"
      },
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "4",
      content: "https://images.unsplash.com/photo-1649336321305-3fe272852c94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww",
      type: "image",
      status: "read",
      sender: {
        id: "123",
        name: "@solamimaxi",
        avatar: "/avatar.png"
      },
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString() // 45 minutes ago
    },
    {
      id: "5",
      content: "Check out this mockup I created!",
      type: "text",
      status: "read",
      sender: {
        id: "456",
        name: "@johndoe",
        avatar: "/avatar.png"
      },
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 minutes ago
    },
    {
      id: "6",
      content: "https://images.unsplash.com/photo-1649336321305-3fe272852c94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww",
      type: "image",
      status: "read",
      sender: {
        id: "456",
        name: "@johndoe",
        avatar: "/avatar.png"
      },
      timestamp: new Date(Date.now() - 29 * 60 * 1000).toISOString() // 29 minutes ago
    },
    {
      id: "7",
      content: "Looks great! I'll review it in detail later.",
      type: "text",
      status: "read",
      sender: {
        id: "789",
        name: "@janedoe",
        avatar: "/avatar.png"
      },
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15 minutes ago
    }
  ]);

  return (
    <MessageBoard messages={messages} user={user} />
  );
};
