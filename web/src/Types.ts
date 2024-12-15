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
  mode: 'WHISPER' | 'GLOBAL';
  target: IUser | null;
  messages: IMessage[];
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
  loading: boolean;
  error: string | null;
}
