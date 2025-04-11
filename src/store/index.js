import { configureStore } from '@reduxjs/toolkit';
import baseReducer from './slices/baseSlice';
import storeReducer from './slices/storeSlice';

// 配置Redux store
const store = configureStore({
  reducer: {
    base: baseReducer,
    store: storeReducer,
  },
  // 开启Redux DevTools
  devTools: import.meta.env.MODE !== 'production',
});

export default store; 