import { FC, useEffect, useRef, useState } from "react";
import { MessageBoard } from "./MessageBoard";
import { IMessage, IUser } from "@/Types";
import { AppDispatch, RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "@/store/slices/messageSlice";
import { Loading } from "@/components/Loading";


export const MessageBoardContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user: IUser | null = useSelector((state: RootState) => state.user.user);
  const messages: IMessage[] = useSelector((state: RootState) => state.messages.messages);
  const target: IUser | null = useSelector((state: RootState) => state.messages.target);
  const loading = useSelector((state: RootState) => state.messages.loading);
  const messageBoardRef = useRef<HTMLDivElement | null>(null);
  const inputHeight = useSelector((state: RootState) => state.messages.inputHeight);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {

    const handleScroll = () => {
      if (messageBoardRef.current) {
        const { scrollTop } = messageBoardRef.current;
        // if (scrollTop === 0 && !loading) {
        //   setCurrentPage(prevPage => prevPage + 1);
        //   dispatch(getMessages({ target: target, page: currentPage }));
        // }
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

  useEffect(() => {
    if (messageBoardRef.current) {
      messageBoardRef.current.style.height = `calc(100%-${inputHeight + 56}px)`;
    }
  }, [inputHeight]);

  return (
    <div ref={messageBoardRef} className={`h-full overflow-y-auto p-4`}>
      {loading ? <Loading /> : <MessageBoard messages={messages} user={user} />}
    </div>
  );
};
