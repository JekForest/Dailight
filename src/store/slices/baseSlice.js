import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// 获取用户信息的异步thunk
export const queryUserInfoAsync = createAsyncThunk(
  'base/queryUserInfoAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.queryUserInfo();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 创建基础slice
const baseSlice = createSlice({
  name: 'base',
  initialState: {
    info: null,
    today: new Date().toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, ''),
    isLogin: false,
    loading: false,
    error: null
  },
  reducers: {
    clearUserInfo: (state) => {
      state.info = null;
      state.isLogin = false;
    },
    updateLogin: (state, action) => {
      state.isLogin = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(queryUserInfoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(queryUserInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.code === 0) {
          state.info = action.payload.data;
          state.isLogin = true;
        }
      })
      .addCase(queryUserInfoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '获取用户信息失败';
      });
  }
});

// 导出actions
export const { clearUserInfo, updateLogin } = baseSlice.actions;

// 导出reducer
export default baseSlice.reducer; 