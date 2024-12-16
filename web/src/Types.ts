export interface IMessage {
  id: string;
  type: 'text' | 'image' | 'audio' | 'video' | 'file';
  content: string;
  sender: IUser;
  receiver: IUser | null;
  status: 'pending' | 'sent' | 'delivered' | 'read';
  timestamp: string;
}

export interface IMessageState {
  target: IUser | null;
  messages: IMessage[];
  inputHeight: number;
  typingUsers: string[];
  loading: boolean;
  error: string | null;
}

export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}

export interface IDecodedToken {
  sub: string;
  username: string;
  avatar: string;
  verified: boolean;
  iat: number;
  exp: number;
}

export interface IUser {
  id: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface IUserState {
  user: IUser | null;
  users: IUser[];
  onlineUsers: IUser[];
  isAuthenticated: boolean;
  mode: 'WHISPER' | 'GLOBAL' | 'PORTFOLIO' | 'AUTH';
  loading: boolean;
  error: string | null;
}

export interface IHolding {
  assets: string;
  holding: number;
  price: number;
  ROI: number | null;
  image: string | null;
}

export const socketEvent = {
  onlineUsers: "onlineUsers",
  checkUsers: "checkUsers",
  userIdentify: "userIdentify",
  userMessage: "userMessage",
  sentMessage: "sentMessage",
  serverMessage: "serverMessage",
  userTyping: "userTyping",
}
