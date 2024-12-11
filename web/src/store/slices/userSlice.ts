import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { jwtDecode } from "jwt-decode";
import { storageService } from '@/services/storage';
import axiosInstance from '@/services/axios';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export interface DecodedToken {
  sub: string;
  username: string;
  iat: number;
  exp: number;
}

interface User {
  id: string;
  username: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }: LoginCredentials) => {
    const response = await axiosInstance.post<LoginResponse>('/api/auth/login', {
      username,
      password
    });
    
    const token = response.data.access_token;
    storageService.setItem('token', token);
    
    const decoded = jwtDecode<DecodedToken>(token);
    return {
      id: decoded.sub,
      username: decoded.username
    };
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
      });
  },
});

export const { logout, clearError, setUser } = userSlice.actions;
export default userSlice.reducer; 