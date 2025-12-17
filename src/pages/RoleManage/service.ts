import { useService } from '@umijs/max';
import { Team } from '../TeamManage/type';

export const useGetTeamList = () =>
  useService<{ data: Team[] }>({
    url: '/api/team/getTeamList',
  });

export const useCertificate = () =>
  useService<{ data: boolean }>({
    url: '/api/team/certificate',
    method: 'post',
  });

export const useAddMember = () =>
  useService({ url: '/api/team/addMember', method: 'post' });
