import { FC } from "react";

export const CommandMessage: FC<{ message: string }> = ({ message }) => {
  if (message.charAt(0) === '/') {
    return <span className="text-sm block mb-2">{message}</span>
  }
  return null;
}
