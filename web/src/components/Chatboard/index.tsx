import { FC } from "react";
import { MessageBoardContainer } from "./MessageBoard/MessageBoardContainer";
import { MessageInputContainer } from "./MessageInput/MessageInputContainer";
import { WhisperContainer } from "./Whisper/WhisperContainer";
import { TerminalContainer } from "../Terminal/TerminalContainer";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const Chatboard: FC = () => {
  const mode = useSelector((state: RootState) => state.messages.mode);

  return (
    <div className="flex flex-row w-full h-full">
      <div className={`flex flex-col h-[calc(100%-5rem)] overflow-y-auto ${mode === 'WHISPER' ? 'w-3/4' : 'w-full'}`}>
        <TerminalContainer />
        <MessageBoardContainer />
        <MessageInputContainer />
      </div>
      {
        mode === 'WHISPER' && <div className="flex flex-col w-1/4 h-full overflow-y-auto">
          <WhisperContainer />
        </div>
      }
    </div>
  );
};
