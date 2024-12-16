import { Dispatch } from '@reduxjs/toolkit'
import { SocketService } from '@/services/socket'
import { IMessage, socketEvent } from '@/Types';
import { RootState } from '.';
import { setOnlineUsers } from './slices/userSlice';
import { updateMessageStatus, receiveMessage, addMessage, updateTypingStatus } from './slices/messageSlice';

interface SocketMiddlewareParams {
  dispatch: Dispatch
  getState: () => RootState
}

export const socketMiddleware = (socket: SocketService) => {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params
    const { type, payload } = action

    switch (type) {
      // Connect to the socket when a user logs in
      case 'user/login/fulfilled':
      case 'user/setUser': {
        console.log("socket connect")
        socket.connect()

        socket.on(socketEvent.onlineUsers, (onlineUsers: string[]) => {
          dispatch(setOnlineUsers(onlineUsers))
        })

        socket.on(socketEvent.sentMessage, (message: IMessage) => {
          dispatch(updateMessageStatus({ id: message.id, status: "sent" }));
        });

        socket.on(socketEvent.serverMessage, (message: IMessage) => {
          dispatch(receiveMessage(message));
        });

        socket.on(socketEvent.userTyping, (data: { username: string; isTyping: boolean }) => {
          dispatch(updateTypingStatus(data));
        });

        socket.emit(socketEvent.userIdentify, payload)
        break
      }

      case 'messages/typing': {
        socket.emit(socketEvent.userTyping, payload)
        break
      }

      // Disconnect from the socket when a user logs out
      case 'users/logout': {
        socket.disconnect()

        break
      }

      case 'user/allUsers': {
        socket.emit(socketEvent.checkUsers, payload)
        break
      }

      // Let the server be the source of truth for all messages; don't dispatch anything
      case 'messages/sendMessage': {
        socket.emit(socketEvent.userMessage, payload)
        dispatch(addMessage(payload))
        return
      }
    }

    return next(action)
  }
}