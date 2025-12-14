import { defineConfig } from '@umijs/max';

type Routes = Exclude<
  Parameters<typeof defineConfig>[0]['routes'],
  false | undefined
>[number] & { routes?: Routes[]; name?: string };

export const routes: Routes[] = [
  {
    path: '/',
    component: '@/layout/index',
    routes: [
      {
        name: '首页',
        path: '/Home',
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
  },
];
