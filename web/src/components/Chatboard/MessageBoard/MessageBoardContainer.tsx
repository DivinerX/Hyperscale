import { FC, useEffect, useState } from "react";
import { MessageBoard } from "./MessageBoard";
import { IMessage, IUser } from "@/Types";
import { AppDispatch, RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "@/store/slices/messageSlice";
import { Loading } from "@/components/Loading";


export const MessageBoardContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [messagesToShow, setMessagesToShow] = useState<IMessage[] | []>([]);
  const user: IUser | null = useSelector((state: RootState) => state.user.user);
  const messages: IMessage[] = useSelector((state: RootState) => state.messages.messages);
  const target: IUser | null = useSelector((state: RootState) => state.messages.target);
  const loading = useSelector((state: RootState) => state.messages.loading);
  const mode = useSelector((state: RootState) => state.user.mode);

  useEffect(() => {
    dispatch(getMessages({ target }));
  }, [dispatch, target]);

  useEffect(() => {
    setMessagesToShow(messages.filter((message) => {
      if (mode === 'GLOBAL') return message.receiver === null;
      if (mode === 'WHISPER') return message.receiver?.username === target?.username || message.sender.username === target?.username;
    }))
  }, [messages, target, mode]);

  return (
    <div className={`h-full overflow-y-auto p-4`}>
      {loading ? <Loading /> : <MessageBoard messages={messagesToShow} user={user} />}
    </div>
  );
};
