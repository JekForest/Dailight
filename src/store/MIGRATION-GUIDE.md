# Redux到Redux Toolkit组件迁移指南

本文档提供了将使用传统Redux的React组件迁移到Redux Toolkit的详细步骤和示例。

## 基本迁移步骤

1. 更改导入语句，从使用connect到使用hooks
2. 获取dispatch和state
3. 更新action的调用方式
4. 移除connect包装器

## 示例1: 简单组件迁移

### 迁移前 (使用connect)

```jsx
import { connect } from 'react-redux';
import action from '../store/action';

const MyComponent = function(props) {
  let { myData, myAction } = props;
  
  const handleClick = () => {
    myAction(data);
  };
  
  return <div onClick={handleClick}>{myData}</div>;
};

export default connect(
  state => state.myModule,
  action.myModule
)(MyComponent);
```

### 迁移后 (使用hooks)

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { myAction } from '../store/slices/mySlice';

const MyComponent = function() {
  const dispatch = useDispatch();
  const myData = useSelector(state => state.myModule.myData);
  
  const handleClick = () => {
    dispatch(myAction(data));
  };
  
  return <div onClick={handleClick}>{myData}</div>;
};

export default MyComponent;
```

## 示例2: 异步操作迁移

### 迁移前 (使用connect)

```jsx
import { connect } from 'react-redux';
import action from '../store/action';

const MyComponent = function(props) {
  let { loading, fetchDataAsync } = props;
  
  useEffect(() => {
    fetchDataAsync();
  }, []);
  
  return <div>{loading ? 'Loading...' : 'Data loaded'}</div>;
};

export default connect(
  state => ({
    loading: state.myModule.loading
  }),
  {
    fetchDataAsync: action.myModule.fetchDataAsync
  }
)(MyComponent);
```

### 迁移后 (使用hooks + createAsyncThunk)

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataAsync } from '../store/slices/mySlice';

const MyComponent = function() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.myModule.loading);
  
  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);
  
  return <div>{loading ? 'Loading...' : 'Data loaded'}</div>;
};

export default MyComponent;
```

## 实际案例: Login组件迁移

### 迁移前

```jsx
import { connect } from 'react-redux';
import action from '../store/action';

const Login = function Login(props) {
  let { queryUserInfoAsync, navigate } = props;
  
  const submit = async () => {
    // ...验证逻辑
    _.storage.set('tk', token);
    await queryUserInfoAsync();
    // ...跳转逻辑
  };
  
  return <div>/* 组件JSX */</div>;
};

export default connect(
  null,
  action.base
)(Login);
```

### 迁移后

```jsx
import { useDispatch } from 'react-redux';
import { queryUserInfoAsync } from '../store/slices/baseSlice';

const Login = function Login(props) {
  let { navigate } = props;
  const dispatch = useDispatch();
  
  const submit = async () => {
    // ...验证逻辑
    _.storage.set('tk', token);
    await dispatch(queryUserInfoAsync());
    // ...跳转逻辑
  };
  
  return <div>/* 组件JSX */</div>;
};

export default Login;
```

## 重要注意事项

1. **依赖关系处理**：当在useEffect中使用dispatch时，应将dispatch添加到依赖数组中
   ```jsx
   useEffect(() => {
     dispatch(someAction());
   }, [dispatch]); // 正确做法
   ```

2. **状态选择优化**：使用记忆化选择器避免不必要的重新渲染
   ```jsx
   // 不推荐：每次都创建新对象
   const { a, b } = useSelector(state => ({ 
     a: state.a, 
     b: state.b 
   }));
   
   // 推荐：分别选择各个状态
   const a = useSelector(state => state.a);
   const b = useSelector(state => state.b);
   ```

3. **异步操作处理**：使用createAsyncThunk中的状态来处理loading和error状态
   ```jsx
   const { loading, error } = useSelector(state => state.myModule);
   
   if (loading) return <Spinner />;
   if (error) return <ErrorMessage error={error} />;
   ```

通过遵循这些步骤和最佳实践，您可以顺利地将Redux组件迁移到Redux Toolkit，获得更简洁的代码和更好的开发体验。 