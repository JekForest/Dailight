import { createSlice } from '@reduxjs/toolkit';
import api from '../../api';

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    list: null
  },
  reducers: {
    queryStoreListSuccess(state, { payload }) {
      state.list = payload;
    },
    clearStoreList(state) {
      state.list = null;
    },
    removeStoreItem(state, { payload }) {
      if (Array.isArray(state.list)) {
        state.list = state.list.filter(item => +item.id !== +payload);
      }
    }
  }
});

export const {
  queryStoreListSuccess,
  clearStoreList,
  removeStoreItem
} = storeSlice.actions;

export const queryStoreListAsync = () => async (dispatch) => {
  try {
    const { code, data } = await api.storeList();
    if (+code === 0) dispatch(queryStoreListSuccess(data));
  } catch (err) {
    // 请求用户信息失败，这里选择忽略错误，不打断流程
    console.warn('queryUserInfoAsync failed:', err);
  }
};

export default storeSlice.reducer;