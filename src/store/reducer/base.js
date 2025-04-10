import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

const baseSlice = createSlice({
  name: 'base',
  initialState: {
    info: null
  },
  reducers: {
    queryUserInfoSuccess(state, { payload }) {
      state.info = payload;
    },
    clearUserInfo(state) {
      state.info = null;
    }
  }
});

export const { queryUserInfoSuccess, clearUserInfo } = baseSlice.actions;

export const queryUserInfoAsync = () => async (dispatch) => {
  try {
    const { code, data } = await api.queryUserInfo();
    if (+code === 0) dispatch(queryUserInfoSuccess(data));
  } catch (err) {
    // 请求用户信息失败，这里选择忽略错误，不打断流程
    console.warn('queryUserInfoAsync failed:', err);
  }
};

export default baseSlice.reducer;