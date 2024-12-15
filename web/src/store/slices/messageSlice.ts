import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage, IMessageState, IUser } from '@/Types';
import axiosInstance from '@/services/axios';
import { toast } from 'react-toastify';

const initialState: IMessageState = {
  mode: 'GLOBAL',
  target: null,
  messages: [],
  loading: false,
  error: null,
};

export const getMessages = createAsyncThunk('messages/getMessages',
  async ({ target, page }: { target: IUser | null, page: number }) => {
    if (!target) {
      const response = await axiosInstance.get(`/api/message/public?page=${page}`);
      return response.data;
    }
    const response = await axiosInstance.get(`/api/message/private/${target?.id}?page=${page}`);
    return response.data;
  }
);

export const setWhisper = createAsyncThunk('messages/setWhisper',
  async (username: string) => {
    if (username) {
      const response = await axiosInstance.get(`/api/user/username/${username}`);
      return response.data;
    }
  }
)

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
    setMode: (state, action: PayloadAction<"GLOBAL" | "WHISPER">) => {
      console.log(`Setting mode to ${action.payload}`);
      state.mode = action.payload;
      if (action.payload === 'GLOBAL') state.target = null;
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
      toast.error('Failed to load messages');
    });
    builder.addCase(setWhisper.fulfilled, (state, action) => {
      state.mode = 'WHISPER';
      state.target = action.payload;
      toast.success(`Whispering to ${action.payload.username}`);
    });
    builder.addCase(setWhisper.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.target = null;
      state.mode = 'GLOBAL';
      state.loading = false;
      toast.error('Failed to set whisper');
    });
    builder.addCase(setWhisper.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { addMessage, updateMessageStatus, setMessages, setMode } = messageSlice.actions;
export default messageSlice.reducer; 