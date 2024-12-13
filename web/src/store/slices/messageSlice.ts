import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage, IMessageState, IUser } from '@/Types';
import axiosInstance from '@/services/axios';

const initialState: IMessageState = {
  mode: 'GLOBAL',
  target: null,
  messages: [],
  loading: false,
  error: null,
};

export const getMessages = createAsyncThunk('messages/getMessages',
  async (target: IUser | null) => {
    if (!target) {
      const response = await axiosInstance.get(`/api/message`);
      return response.data;
    }
    const response = await axiosInstance.get(`/api/message/${target?.id}`);
    return response.data;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });
  },
});

export const { addMessage, updateMessageStatus, setMessages } = messageSlice.actions;
export default messageSlice.reducer; 