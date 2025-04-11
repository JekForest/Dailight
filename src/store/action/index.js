import * as base from '../slices/baseSlice';
import * as store from '../slices/storeSlice';

// 兼容层，用于支持旧版的connect写法，实际调用的是Redux Toolkit的actions
export default {
  base: {
    queryUserInfoAsync: () => base.queryUserInfoAsync(),
    clearUserInfo: base.clearUserInfo,
    updateLogin: base.updateLogin
  },
  store: {
    queryStoreListAsync: () => store.queryStoreListAsync(),
    removeStoreListById: store.removeStoreListById,
    clearStoreList: store.clearStoreList
  }
}; 