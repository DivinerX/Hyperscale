
export interface IUser {
  id: string;
  username: string;
  avatar: string;
}

export interface IConnectedUser {
  socketId: string;
  id?: string;
  username?: string;
  avatar?: string;
  connectionTime?: Date;
}

export interface IReceiveMessage {
  id: string
  sender: IUser;
  receiver: IUser | null;
  content: string;
  type: string;
  status: string;
}

export interface IMessage extends IReceiveMessage {
  timestamp: Date;
}

export const event = {
  onlineUsers: "onlineUsers",
  checkUsers: "checkUsers",
  userIdentify: "userIdentify",
  userMessage: "userMessage",
  sentMessage: "sentMessage",
  serverMessage: "serverMessage",
  userTyping: "userTyping",
}
