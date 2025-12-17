import { useService } from '@umijs/max';
import { Mission } from './type';

export const useGetMissionList = () =>
  useService<{ data: Mission[] }>({ url: '/api/webhook/getMissionList' });

export const useUpdateMission = () =>
  useService({ url: '/api/webhook/updateMission', method: 'post' });
