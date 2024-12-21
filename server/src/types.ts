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
  id: string;
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
  onlineUsers: 'onlineUsers',
  checkUsers: 'checkUsers',
  userIdentify: 'userIdentify',
  userMessage: 'userMessage',
  sentMessage: 'sentMessage',
  serverMessage: 'serverMessage',
  userTyping: 'userTyping',
};

export interface ICoinInfo {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface ICoinGraphInput {
  id: string;
  name: string;
  symbol: string;
  amount: number;
}

export interface ICoinGraph {
  id: string;
  historical: number[][];
}
