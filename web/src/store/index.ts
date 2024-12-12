import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import messageReducer from './slices/messageSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 