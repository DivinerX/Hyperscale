import { FC, useState } from "react";
import { MessageInput } from "./MessageInput";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useNavigate, useLocation } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { sendMessage, setTarget, setWhisper, typing } from '@/store/slices/messageSlice';
import { setMode } from '@/store/slices/userSlice';
import { v4 as uuidv4 } from 'uuid';
import { IMessage } from "@/Types";
import { CommandMessage } from "./CommandMessage";

export const MessageInputContainer: FC = () => {
  const [message, setMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);
  const target = useSelector((state: RootState) => state.messages.target);
  const mode = useSelector((state: RootState) => state.user.mode);
  const typingUsers = useSelector((state: RootState) => state.messages.typingUsers);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  let typingTimeout: NodeJS.Timeout;
  const notifyTyping = () => {
    dispatch(typing({
      username: user!.username,
      isTyping: true
    }));

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      dispatch(typing({
        username: user!.username,
        isTyping: false
      }));
    }, 2000);
  };

  const handleMessageChange = (newMessage: string) => {
    if (location.pathname !== '/' && !newMessage.startsWith('/')) {
      setMessage('');
      return;
    }
    setMessage(newMessage);
    if (newMessage.trim()) {
      notifyTyping();
    }
  };

  const getTypingStatus = () => {
    const typingUsersArray = typingUsers.filter(username => username !== user?.username);
    if (typingUsersArray.length === 0) return "";
    if (typingUsersArray.length === 1) return `${typingUsersArray[0]} is typing...`;
    if (typingUsersArray.length === 2) return `${typingUsersArray[0]} and ${typingUsersArray[1]} are typing...`;
    return `${typingUsersArray[0]} and ${typingUsersArray.length - 1} others are typing...`;
  };

  const sendTextMessage = () => {
    if (location.pathname !== '/') {
      return;
    }
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
      dispatch(sendMessage(newMessage as IMessage));
      setMessage('');
    }
  }

  const commands = ['/WHISPER', '/MUTE', '/GLOBE', '/PORTFOLIO'];

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (message.startsWith('/')) {
        handleCommand();
      } else {
        sendTextMessage();
      }
    } else if (e.key === 'Tab' && message.startsWith('/')) {
      e.preventDefault();
      const commandPrefix = message.trim();
      const matchingCommand = commands.find(cmd => cmd.startsWith(commandPrefix.toUpperCase()));
      if (matchingCommand) {
        setMessage(matchingCommand);
      }
    }
    if (e.key === 'Escape') {
      setMessage('');
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
    if (file && location.pathname === '/') {
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

          dispatch(sendMessage(newMessage as IMessage));
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
        if (location.pathname !== '/') {
          navigate('/');
        }
        if (args.length > 0) {
          const username = args[0].replace('@', '');
          handleWhisper(username);
        }
        else {
          dispatch(setMode('WHISPER'));
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
        if (location.pathname !== '/') {
          navigate('/');
        }
        dispatch(setMode('GLOBAL'));
        dispatch(setTarget(null));
        break
      case '/PORTFOLIO':
        console.log('Switching to portfolio mode');
        if (location.pathname !== '/portfolio') {
          navigate('/portfolio');
        }
        dispatch(setMode('PORTFOLIO'));
        dispatch(setTarget(null));
        break
      default:
        console.log(`Unknown command: ${cmd}`);
        break;
    }
    setMessage('');
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
        <CommandMessage message={message} />
        <MessageInput
          status={getTypingStatus()}
          message={message}
          mode={mode}
          handleMessageChange={handleMessageChange}
          onKeyDown={onKeyDown}
          handleSendMessage={handleSendMessage}
          handleFileUpload={handleFileUpload}
        />
      </>
      )
      : <Loading />
  );
};
