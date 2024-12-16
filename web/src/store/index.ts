import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import messageReducer from './slices/messageSlice'
import { socketMiddleware } from './socketMiddleware'
import { SocketService } from '@/services/socket'

const socket = new SocketService()

export const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(socket)),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 