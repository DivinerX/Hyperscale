import { FC, useState } from "react";
import { MessageInput } from "./MessageInput";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Loading } from "@/components/Loading";
import { socketService } from "@/services/socket";
import { addMessage } from '@/store/slices/messageSlice';
import { v4 as uuidv4 } from 'uuid';
import { IMessage } from "@/Types";

export const MessageInputContainer: FC<{}> = () => {
  const [status] = useState<string>("@broskiman2 and 2 others are typing...");
  const [message, setMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const sendTextMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: uuidv4(),
        type: "text",
        content: message,
        sender: {
          id: user!.id,
          username: user!.username,
          avatar: user!.avatar,
        },
        receiver: null,
        status: "pending",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(newMessage as IMessage));
      socketService.emit(socketService.event.userMessage, newMessage);
      setMessage('');
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendTextMessage();
    }
  }

  const handleSendMessage = () => {
    sendTextMessage();
  }

  const handleFileUpload = () => {
    console.log('File upload');
  }
  return (
    user ?
      <MessageInput status={status} message={message} setMessage={setMessage} onKeyDown={onKeyDown} handleSendMessage={handleSendMessage} handleFileUpload={handleFileUpload} />
      : <Loading />
  );
};
