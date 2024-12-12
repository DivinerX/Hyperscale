import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage, IMessageState } from '@/Types';

const initialState: IMessageState = {
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages = [...state.messages, action.payload];
    },
    updateMessageStatus: (state, action: PayloadAction<{ id: string; status: IMessage['status'] }>) => {
      const message = state.messages.find(msg => msg.id === action.payload.id);
      if (message) {
        message.status = action.payload.status;
      }
    },
    setMessages: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, updateMessageStatus, setMessages } = messageSlice.actions;
export default messageSlice.reducer; 