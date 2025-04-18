import { lazy } from 'react';
import Home from '../views/Home';

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    title: 'Dailight'
  }
}, {
  path: '/detail/:id',
  name: 'detail',
  component: lazy(() => import('../views/Detail')),
  meta: {
    title: '新闻详情-Dailight'
  }
}, {
  path: '/personal',
  name: 'personal',
  component: lazy(() => import('../views/Personal')),
  meta: {
    title: '个人中心-Dailight'
  }
}, {
  path: '/store',
  name: 'store',
  component: lazy(() => import('../views/Store')),
  meta: {
    title: '我的收藏-Dailight'
  }
}, {
  path: '/update',
  name: 'update',
  component: lazy(() => import('../views/Update')),
  meta: {
    title: '修改个人信息-Dailight'
  }
}, {
  path: '/login',
  name: 'login',
  component: lazy(() => import('../views/Login')),
  meta: {
    title: '登录/注册-Dailight'
  }
}, {
  path: '*',
  name: '404',
  component: lazy(() => import('../views/Page404')),
  meta: {
    title: '404页面-Dailight'
  }
}];

export default routes;