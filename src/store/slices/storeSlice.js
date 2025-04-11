import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// 获取收藏列表的异步thunk
export const queryStoreListAsync = createAsyncThunk(
  'store/queryStoreListAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.storeList();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 创建收藏slice
const storeSlice = createSlice({
  name: 'store',
  initialState: {
    list: null,
    loading: false,
    error: null
  },
  reducers: {
    removeStoreListById: (state, action) => {
      if (state.list) {
        state.list = state.list.filter(item => item.id !== action.payload);
      }
    },
    clearStoreList: (state) => {
      state.list = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(queryStoreListAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(queryStoreListAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.code === 0) {
          state.list = action.payload.data;
        }
      })
      .addCase(queryStoreListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '获取收藏列表失败';
      });
  }
});

// 导出actions
export const { removeStoreListById, clearStoreList } = storeSlice.actions;

// 导出reducer
export default storeSlice.reducer; 