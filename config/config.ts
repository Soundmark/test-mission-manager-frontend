import { defineConfig } from '@umijs/max';
import { routes } from './routes';

export default defineConfig({
  antd: {
    dark: true,
    theme: { token: { colorPrimary: '#9dc0f6' } },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
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
    '@tsintergy/plugin-dvax',
  ],
  dva: { skipModelValidate: true },
  tailwind: {},
  routes: routes,
  npmClient: 'pnpm',
  icons: {},
  mfsu: { strategy: 'normal', exclude: [/@tsintergy\/mcoss/] },
});
