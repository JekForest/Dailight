# Redux迁移到Redux Toolkit指南

## 迁移概览

本项目已从传统的Redux迁移到了Redux Toolkit (RTK)。RTK是Redux官方推荐的工具包，它简化了Redux应用的开发，减少了样板代码，并提供了一些常用功能的优化实现。

## 目录结构变化

```
src/store/
├── index.js            # Redux Toolkit配置的store
├── slices/             # 存放RTK的slice文件
│   ├── baseSlice.js    # 基础状态的slice
│   └── storeSlice.js   # 收藏功能的slice
└── action/             # 兼容层，用于支持旧版connect写法
    └── index.js        # 统一导出所有action
```

## 主要变化

1. **使用createSlice替代reducer和action**：
   - 不再需要单独定义action types、action creators和reducers
   - 使用createSlice自动生成这些内容

2. **使用createAsyncThunk处理异步逻辑**：
   - 替代了手动处理的异步action
   - 自动处理加载状态、错误处理等

3. **状态更新方式变化**：
   - RTK内部使用Immer库，允许"直接修改"状态（实际上是不可变更新）
   - 不再需要手动返回新状态对象

4. **组件连接方式**：
   - 推荐使用React-Redux的hooks API (useSelector, useDispatch)
   - 替代connect高阶组件
   - 保留了兼容层以支持现有的connect用法

## 如何使用新的Redux组件

### Hooks方式（推荐）

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { someAction } from '../store/slices/someSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const someData = useSelector(state => state.some.data);
  
  const handleClick = () => {
    dispatch(someAction(payload));
  };
  
  // ...
}
```

### 兼容旧版connect方式

```jsx
import { connect } from 'react-redux';
import action from '../store/action';

function MyComponent(props) {
  // props中包含了mapState和mapDispatch的内容
  // ...
}

export default connect(
  state => state.some,
  action.some
)(MyComponent);
```

## 迁移完成后的优势

1. 代码更简洁，减少样板代码
2. 类型安全性提高
3. 开发体验更好，DevTools支持
4. 性能优化
5. 更好的错误处理 