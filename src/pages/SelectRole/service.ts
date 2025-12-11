import { useService } from '@umijs/max';
import { Member } from './type';

export const useGetTeamList = () =>
  useService<{ data: { name: string; id: string }[] }>({
    url: '/api/team/getTeamList',
  });

export const useGetMemberList = () =>
  useService<{
    data: Member[];
  }>({ url: '/api/team/getMemberList' });

export const useCertificate = () =>
  useService<{ data: boolean }>({
    url: '/api/team/certificate',
    method: 'post',
  });
