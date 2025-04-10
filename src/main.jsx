import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// redux
import { Provider } from 'react-redux';
import store from './store';  // 从Redux Toolkit创建的store

//ANTD-MOBLIE
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';

// 改变REM换算比例
import 'amfe-flexible';
import './index.css';

/* 处理最大宽度 超过750之后就不让其继续放大了 */
(function () {
  const handleMax = function handleMax() {
    let html = document.documentElement,
      root = document.getElementById('root'),
      deviceW = html.clientWidth;
    root.style.maxWidth = "750px";
    if (deviceW >= 750) {
      html.style.fontSize = '75px';
    }
  };
  handleMax();
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
