import { AxisScale } from "@visx/axis";

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

export interface ICoinInfo {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  amount: number;
  ROI: number;
  cost: number;
}

export interface ICoinState {
  coinInfos: ICoinInfo[];
  historicalData: [number, number][];
  timePeriod: '1 Year' | '1 Month' | '1 Week' | '1 Day';
  loading: boolean;
  error: string | null;
}

export interface DataProps {
  date: string;
  price: number;
}

export interface AreaChartProps {
  data: DataProps[];
  xScale: AxisScale<number>;
  yScale: AxisScale<number>;
  width: number;
  yMax: number;
  margin: { top: number; right: number; bottom: number; left: number };
  gradientColor: string;
  stroke?: string;
  hideBottomAxis?: boolean;
  hideLeftAxis?: boolean;
  top?: number;
  left?: number;
  children?: React.ReactNode;
}

export interface PrimaryChartProps {
  data: DataProps[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export type TooltipData = DataProps;
