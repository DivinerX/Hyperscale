import { FC, useRef } from "react";

interface MessageInputProps {
  status: string;
  message: string;
  setMessage: (message: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  handleFileUpload: (file: File) => void;
}

export const MessageInput: FC<MessageInputProps> = ({ status, message, setMessage, onKeyDown, handleSendMessage, handleFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] border-gray-800 border-t px-4 py-2">
      <span className="text-sm text-gray-500 block mb-2">{status}</span>
      <div className="flex items-center bg-black border-[0.25px] border-gray-800">
        <input
          type="text"
          placeholder="CLICK HERE TO TYPE"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-black px-3 py-1 focus:outline-0"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 px-4 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Add attachment"
        >
          <svg width="18" height="18" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.034 5.55211C3.1251 5.64321 3.26175 5.62803 3.35285 5.55211L4.87117 4.03379C4.97745 3.92751 5.15965 3.91232 5.2963 4.03379C5.43294 4.15525 5.41776 4.36782 5.2963 4.48928L3.42876 6.32645C3.01881 6.7364 2.33557 6.7364 1.92562 6.32645L1.91044 6.31127C1.50049 5.90132 1.50049 5.21808 1.91044 4.80813L5.2052 1.51337C5.61514 1.10343 6.29839 1.10343 6.70833 1.51337L6.72352 1.52856C7.13347 1.9385 7.13347 2.62175 6.72352 3.0317L6.70833 3.04688C6.63242 3.1228 6.61724 3.22908 6.67797 3.32018C6.76907 3.48719 6.84498 3.66939 6.89053 3.85159C6.9209 3.97305 7.05755 4.00342 7.14865 3.92751C7.27011 3.80604 7.3764 3.68457 7.3764 3.68457C8.15074 2.91023 8.15074 1.65002 7.3764 0.87568H7.34603C6.57169 0.101336 5.31148 0.101336 4.53714 0.87568L1.24238 4.15525C0.468035 4.9296 0.468035 6.1898 1.24238 6.96415L1.27275 6.99451C2.04709 7.76886 3.29211 7.76886 4.06646 6.99451L5.94917 5.12698C6.43504 4.64112 6.41985 3.85159 5.91881 3.36573C5.43294 2.89505 4.64342 2.92541 4.17274 3.41128L2.68478 4.89923C2.59368 4.99033 2.59368 5.14216 2.68478 5.23326L3.034 5.55211Z" fill="white" />
          </svg>
        </button>
        <div className="h-5 w-[1px] bg-gray-800" />
        <button
          onClick={handleSendMessage}
          className="px-4 py-1 bg-black"
        >
          SEND
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};