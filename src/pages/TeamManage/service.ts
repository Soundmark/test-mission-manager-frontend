import { useService } from '@umijs/max';

export const useCreateTeam = () =>
  useService({ url: '/api/team/create', method: 'post' });

export const useUpdateMember = () =>
  useService({ url: '/api/team/updateMember', method: 'post' });

export const useDeleteTeam = () => useService({ url: '/api/team/delete' });
