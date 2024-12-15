import { FC, useEffect, useRef, useState } from "react";
import { MessageBoard } from "./MessageBoard";
import { IMessage, IUser } from "@/Types";
import { AppDispatch, RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, getMessages, updateMessageStatus } from "@/store/slices/messageSlice";
import { SocketService } from "@/services/socket";
import { Loading } from "@/components/Loading";
import { toast } from "react-toastify";


export const MessageBoardContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user: IUser | null = useSelector((state: RootState) => state.user.user);
  const messages: IMessage[] = useSelector((state: RootState) => state.messages.messages);
  const target: IUser | null = useSelector((state: RootState) => state.messages.target);
  const loading = useSelector((state: RootState) => state.messages.loading);
  const messageBoardRef = useRef<HTMLDivElement | null>(null);
  
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    SocketService.on(SocketService.event.sentMessage, (message: IMessage) => {
      dispatch(updateMessageStatus({ id: message.id, status: "sent" }));
    });

    SocketService.on(SocketService.event.serverMessage, (message: IMessage) => {
      dispatch(addMessage(message));
      if (message.receiver !== null) {
        if (message.receiver.id !== target?.id) {
          toast.info(`${message.receiver.username} sent you a message`);
        }
      }
    });

    const handleScroll = () => {
      if (messageBoardRef.current) {
        const { scrollTop } = messageBoardRef.current;
        if (scrollTop === 0 && !loading) {
          setCurrentPage(prevPage => prevPage + 1);
          dispatch(getMessages({ target: target, page: currentPage }));
        }
      }
    };

    const messageBoardElement = messageBoardRef.current;
    if (messageBoardElement) {
      messageBoardElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageBoardElement) {
        messageBoardElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [dispatch, target, loading, currentPage]);

  useEffect(() => {
    dispatch(getMessages({ target: target, page: currentPage }));
  }, [dispatch, target, currentPage]);

  return (
    <div ref={messageBoardRef}>
      {loading ? <Loading /> : <MessageBoard messages={messages} user={user} />}
    </div>
  );
};
