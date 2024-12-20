import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/services/axios';
import { ICoinInfo, ICoinState } from '@/Types';

export const getCoinInfo = createAsyncThunk('coin/getCoinInfo',
  async () => {
    const response = await axiosInstance.get('/api/coin/info');
    return response.data;
  }
);
export const getGraphData = createAsyncThunk('coin/getGraphData',
  async ({ days, coinInfos }: { days: number, coinInfos: ICoinInfo[] }) => {
    try {
      const response = await axiosInstance.post('/api/coin/graph', {
        "days": days,
        "coinInfos": coinInfos,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const initialState: ICoinState = {
  coinInfos: [],
  historicalData:[],
  timePeriod: '1 Year',
  loading: false,
  error: null,
};

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    setCoinInfo: (state, action: PayloadAction<ICoinInfo[]>) => {
      state.coinInfos = action.payload;
    },
    setTimePeriod: (state, action: PayloadAction<'1 Year' | '1 Month' | '1 Week' | '1 Day'>) => {
      state.timePeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoinInfo.fulfilled, (state, action) => {
      state.coinInfos = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCoinInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCoinInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
    builder.addCase(getGraphData.fulfilled, (state, action) => {
      state.historicalData = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getGraphData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGraphData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { setCoinInfo, setTimePeriod } = coinSlice.actions;
export default coinSlice.reducer;

