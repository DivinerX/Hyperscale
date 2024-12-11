import { FC, useState } from "react";
import { MessageInput } from "./MessageInput";

export const MessageInputContainer: FC = () => {
  const [status, setStatus] = useState<string>("@broskiman2 and 2 others are typing...");
  const [message, setMessage] = useState<string>("");
  return (
    <MessageInput status={status} message={message} setMessage={setMessage} />
  );
};

