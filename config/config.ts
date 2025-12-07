import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Test-Mission-Manager',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
  plugins: [
    '@tsintergy/plugin-tailwindcss',
    '@tsintergy/plugin-use-service',
    '@tsintergy/plugin-emotioncss',
  ],
  tailwind: {},
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '选择身份',
      path: '/SelectRole',
      component: './SelectRole',
    },
  ],
  npmClient: 'pnpm',
});
