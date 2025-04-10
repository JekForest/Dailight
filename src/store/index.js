import { configureStore } from '@reduxjs/toolkit';
import baseReducer from './reducer/base';
import storeReducer from './reducer/store';

const store = configureStore({
  reducer: {
    base: baseReducer,
    store: storeReducer
  },
  middleware: (getDefaultMiddleware) =>
    import.meta.env.MODE === 'development'
      ? getDefaultMiddleware().concat(/* logger */)
      : getDefaultMiddleware()
});

export default store;