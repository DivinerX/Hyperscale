import { FC, useEffect } from "react";
import { MessageBoard } from "./MessageBoard";
import { IMessage, IUser } from "@/Types";
import { AppDispatch, RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, getMessages, updateMessageStatus } from "@/store/slices/messageSlice";
import { SocketService } from "@/services/socket";


export const MessageBoardContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user: IUser | null = useSelector((state: RootState) => state.user.user);
  const messages: IMessage[] = useSelector((state: RootState) => state.messages.messages);
  const target: IUser | null = useSelector((state: RootState) => state.messages.target);

  useEffect(() => {
    SocketService.on(SocketService.event.sentMessage, (message: IMessage) => {
      dispatch(updateMessageStatus({ id: message.id, status: "sent" }));
    });

    SocketService.on(SocketService.event.serverMessage, (message: IMessage) => {
      dispatch(addMessage(message));
    });
  }, [])
  
  useEffect(() => {
    dispatch(getMessages(target));
  }, [target]);

  return (
    <MessageBoard messages={messages} user={user} />
  );
};
