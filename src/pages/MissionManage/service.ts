import { useService } from '@umijs/max';

export const useGetMissionList = () =>
  useService({ url: '/api/webhook/getMissionList' });
