import { FC, useEffect } from "react";
import { MessageBoard } from "./MessageBoard";
import { IMessage, IUser } from "@/Types";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, updateMessageStatus } from "@/store/slices/messageSlice";
import { SocketService } from "@/services/socket";


export const MessageBoardContainer: FC = () => {
  const dispatch = useDispatch();
  const user: IUser | null = useSelector((state: RootState) => state.user.user);
  const messages: IMessage[] = useSelector((state: RootState) => state.messages.messages);

  useEffect(() => {
    SocketService.on(SocketService.event.sentMessage, (message: IMessage) => {
      dispatch(updateMessageStatus({ id: message.id, status: "sent" }));
    });

    SocketService.on(SocketService.event.serverMessage, (message: IMessage) => {
      dispatch(addMessage(message));
    });
  }, [])

  return (
    <MessageBoard messages={messages} user={user} />
  );
};
