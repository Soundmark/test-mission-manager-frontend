import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    dark: true,
    theme: { token: { colorPrimary: '#9dc0f6' } },
  },
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
    '@tsintergy/rsn/bin/plugin',
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
      name: '团队管理',
      path: '/TeamManage',
      component: './TeamManage',
    },
    {
      name: '选择身份',
      path: '/SelectRole',
      component: './SelectRole',
    },
  ],
  npmClient: 'pnpm',
  mfsu: { strategy: 'normal', exclude: [/@tsintergy\/mcoss/] },
});
