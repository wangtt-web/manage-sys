import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '管理系统',
  },
  routes: [
    {
      path: '/',
      redirect: '/login',
      layout: false
    },
    {
      path: '/login',
      component: './Login',
      layout: false
    },
    {
      name:'产品管理',
      path:'/product',
      component:'./Product',
      
    },
    {
      name:'订单管理',
      path:'/order',
      component:'./Order',
    },
    {
      name:'用户管理',
      path:'/user',
      component:'./User',
    },
    {
      name:'库存管理',
      path:'/store',
      component:'./Store',
    }
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:8888',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  },
  npmClient: 'npm',
});

