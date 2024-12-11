import { FC } from "react";

interface MessageInputProps {
  status: string;
  message: string;
  setMessage: (message: string) => void;
}

export const MessageInput: FC<MessageInputProps> = ({ status, message, setMessage }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-gray-800 border-t px-4 py-2">
      <span className="text-sm text-gray-500 block mb-2">{status}</span>
      <input
        type="text"
        placeholder="CLICK HERE TO TYPE"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full text-sm bg-black border border-gray-800 px-3 py-1 focus:outline-none focus:border-gray-500"
      />
    </div>
  );
};