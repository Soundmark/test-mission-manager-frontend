import { defineConfig } from '@umijs/max';

type Routes = Exclude<
  Parameters<typeof defineConfig>[0]['routes'],
  false | undefined
>[number] & { routes?: Routes[]; name?: string };

export const routes: Routes[] = [
  {
    path: '/',
    redirect: '/MissionManage',
  },
  {
    path: '/',
    component: '@/layout/index',
    routes: [
      {
        name: '任务管理',
        path: '/MissionManage',
        component: './MissionManage',
      },
      {
        name: '团队管理',
        path: '/TeamManage',
        component: './TeamManage',
      },
      {
        name: '身份管理',
        path: '/RoleManage',
        component: './RoleManage',
      },
    ],
  },
];
