import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { jwtDecode } from "jwt-decode";
import { storageService } from '@/services/storage';
import axiosInstance from '@/services/axios';
import { socketService } from '@/services/socket';
import { IUserState, ILoginCredentials, ILoginResponse, IDecodedToken, IUser } from '@/Types';

const initialState: IUserState = {
  user: null,
  users: [],
  onlineUsers: [],
  isAuthenticated: false,
  loading: false,
  error: null,
}
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }: ILoginCredentials) => {
    const response = await axiosInstance.post<ILoginResponse>('/api/user/login', {
      username,
      password
    });
    
    const token = response.data.access_token;
    storageService.setItem('token', token);
    
    const decoded = jwtDecode<IDecodedToken>(token);
    const user = {
      id: decoded.sub,
      username: decoded.username,
      avatar: decoded.avatar,
      verified: decoded.verified,
    };

    socketService.emit(socketService.event.userIdentify, user);
    return user;
  }
);

export const getAllUsers = createAsyncThunk(
  'user/allUsers',
  async () => {
    const response = await axiosInstance.get<IUser[]>('/api/user/all');
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get all users';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  },
});

export const { logout, clearError, setUser, setOnlineUsers } = userSlice.actions;
export default userSlice.reducer; 