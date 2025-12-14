import { useService } from '@umijs/max';
import { Team } from '../TeamManage/type';
import { Member } from './type';

export const useGetTeamList = () =>
  useService<{ data: Team[] }>({
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

export const useAddMember = () =>
  useService({ url: '/api/team/addMember', method: 'post' });
