import { FC, useState } from "react";
import { Whisper } from "./Whisper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { IUser } from "@/Types";
import { setWhisper } from "@/store/slices/messageSlice";

export const WhisperContainer: FC = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const messages = useSelector((state: RootState) => state.messages.messages);
  const target = useSelector((state: RootState) => state.messages.target);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const setTarget = (user: IUser) => {
    dispatch(setWhisper(user.username));
  };

  const getLastMessage = (user: IUser) => {
    const lastMessage = messages.find((message) => message.sender.id === user.id);
    return lastMessage?.type === "image" ? "Image" : lastMessage?.content && lastMessage?.content.length > 10 ? lastMessage?.content.slice(0, 10) + "..." : lastMessage?.content || "";
  };

  const getLastMessageTime = (user: IUser) => {
    const lastMessage = messages.find((message) => message.sender.id === user.id);
    return lastMessage?.timestamp ? new Date(lastMessage?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
  };

  return (
    <Whisper users={users} target={target} setTarget={setTarget} getLastMessage={getLastMessage} getLastMessageTime={getLastMessageTime} search={search} setSearch={setSearch} />
  );
};