// 运行时配置

import { request } from '@umijs/max';
import { Member } from './pages/RoleManage/type';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  // 检查是否有role信息，有的话请求更新信息
  const localRole: Member | null = JSON.parse(
    localStorage.getItem('tmm-role') ?? 'null',
  );
  if (localRole) {
    const res = await request<{ data: Member }>(
      `/api/team/getMember?memberId=${localRole.id}`,
    );
    localStorage.setItem('tmm-role', JSON.stringify(res.data));
  }
  return { name: '@umijs/max' };
}
