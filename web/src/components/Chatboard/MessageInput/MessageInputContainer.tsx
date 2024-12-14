import { FC, useState, useEffect } from "react";
import { MessageInput } from "./MessageInput";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Loading } from "@/components/Loading";
import { SocketService } from "@/services/socket";
import { addMessage, setMode, setWhisper } from '@/store/slices/messageSlice';
import { v4 as uuidv4 } from 'uuid';
import { IMessage } from "@/Types";
import { CommandMessage } from "./CommandMessage";

export const MessageInputContainer: FC<{}> = () => {
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);
  const target = useSelector((state: RootState) => state.messages.target);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleTypingStatus = (data: { username: string; isTyping: boolean }) => {
      setTypingUsers(prev => {
        const newSet = new Set(prev);
        if (data.isTyping) {
          newSet.add(data.username);
        } else {
          newSet.delete(data.username);
        }
        return newSet;
      });
    };

    SocketService.on(SocketService.event.userTyping, handleTypingStatus);
    return () => {
      SocketService.off(SocketService.event.userTyping, handleTypingStatus);
    };
  }, []);

  let typingTimeout: NodeJS.Timeout;
  const notifyTyping = () => {
    SocketService.emit(SocketService.event.userTyping, {
      username: user?.username,
      isTyping: true
    });

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      SocketService.emit(SocketService.event.userTyping, {
        username: user?.username,
        isTyping: false
      });
    }, 2000);
  };

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
    if (newMessage.trim()) {
      notifyTyping();
    }
  };

  const getTypingStatus = () => {
    const typingUsersArray = Array.from(typingUsers).filter(username => username !== user?.username);
    if (typingUsersArray.length === 0) return "";
    if (typingUsersArray.length === 1) return `${typingUsersArray[0]} is typing...`;
    if (typingUsersArray.length === 2) return `${typingUsersArray[0]} and ${typingUsersArray[1]} are typing...`;
    return `${typingUsersArray[0]} and ${typingUsersArray.length - 1} others are typing...`;
  };

  const sendTextMessage = () => {
    if (message.trim() && !message.startsWith('/')) {
      const newMessage = {
        id: uuidv4(),
        type: "text",
        content: message,
        sender: {
          id: user!.id,
          username: user!.username,
          avatar: user!.avatar,
          verified: user!.verified,
        },
        receiver: target,
        status: "pending",
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(newMessage as IMessage));
      SocketService.emit(SocketService.event.userMessage, newMessage);
      setMessage('');
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (message.startsWith('/')) {
        handleCommand();
      } else {
        sendTextMessage();
      }
    }
  }

  const handleSendMessage = () => {
    if (message.startsWith('/')) {
      handleCommand();
    } else {
      sendTextMessage();
    }
  }

  const handleFileUpload = (file: File) => {
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target?.result as string;

          const newMessage = {
            id: uuidv4(),
            type: "image",
            content: imageData,
            sender: {
              id: user!.id,
              username: user!.username,
              avatar: user!.avatar,
              verified: user!.verified,
            },
            receiver: target,
            status: "pending",
            timestamp: new Date().toISOString(),
          };

          dispatch(addMessage(newMessage as IMessage));
          SocketService.emit(SocketService.event.userMessage, newMessage);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image file');
      }
    }
  };

  const handleCommand = () => {
    const [cmd, ...args] = message.trim().split(' ');
    const upperCmd = cmd.toUpperCase();

    switch (upperCmd) {
      case '/WHISPER':
        if (args.length > 0) {
          const username = args[0].replace('@', '');
          handleWhisper(username);
        }
        break;
      case '/MUTE':
        if (args.length > 0) {
          const username = args[0].replace('@', '');
          handleMute(username);
        }
        break;
      case '/GLOBE':
        console.log('Switching to global mode');
        dispatch(setMode('GLOBAL'));
        break
      default:
        console.log(`Unknown command: ${cmd}`);
        break;
    }
  };

  const handleWhisper = (username: string) => {
    console.log(`Whispering to ${username}`);
    dispatch(setWhisper(username));
  };

  const handleMute = (username: string) => {
    console.log(`Muting ${username}`);
  };

  return (
    user ?
      (<>
        <CommandMessage
          message={message}
        />
        <MessageInput status={getTypingStatus()} message={message} setMessage={handleMessageChange} onKeyDown={onKeyDown} handleSendMessage={handleSendMessage} handleFileUpload={handleFileUpload} />
      </>
      )
      : <Loading />
  );
};
