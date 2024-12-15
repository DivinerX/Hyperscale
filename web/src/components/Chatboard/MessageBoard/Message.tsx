import { FC, useEffect, useRef } from "react";
import verified from "@/assets/verified.svg";
import unverified from "@/assets/unverified.svg";
import { IMessage, IUser } from "@/Types";

export const Message: FC<{ message: IMessage, user: IUser }> = ({ message, user }) => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div key={message.id} className={`flex items-start gap-2 ${message.sender.id === user.id ? "flex-row-reverse justify-start" : ""}`}>
      <img
        src={message.sender.avatar}
        alt={message.sender.username}
        className="w-8 h-8 rounded-sm"
      />
      <div className="flex flex-col gap-1">
        <div className={`flex items-center gap-2 ${message.sender.id === user.id ? "flex-row-reverse" : ""}`}>
          <span>@{message.sender.username}</span>
          <img src={message.sender.verified ? verified : unverified} alt={message.sender.verified ? "verified" : "unverified"} className="w-4 h-4" />
          <span className="text-xs text-gray-500">
            {new Date(message.timestamp).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            }).replace(/(\d+)\/(\d+)\/(\d+),\s/, '$3-$1-$2 ')}
          </span>
        </div>
        {
          message.type === "text" ? (
            <div className={`${message.sender.id === user.id ? "text-right" : ""}`}>
              {message.content}
            </div>
          ) :
          message.type === "image" ? (
            <div className={`${message.sender.id === user.id ? "flex justify-end" : ""}`}>
              <img src={message.content} alt="message" className="w-1/2 h-auto max-w-[50vw] rounded-sm object-cover" />
            </div>
            ) :
          message.type === "audio" ? (
            <div className={`${message.sender.id === user.id ? "" : ""}`}>
              <audio src={message.content} controls />
            </div>
          ) : null
        }
        <div ref={messageEndRef} />
      </div>
    </div>
  )
}